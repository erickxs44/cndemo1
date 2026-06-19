import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    // ── 1. Ler variáveis de ambiente (configuradas no Supabase Dashboard) ──
    const CLIENT_ID = Deno.env.get("NUVEMSHOP_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("NUVEMSHOP_CLIENT_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Variáveis de ambiente NUVEMSHOP_CLIENT_ID e NUVEMSHOP_CLIENT_SECRET não configuradas.");
    }

    // ── 2. Ler o authorization_code do body da requisição ──
    const body = await req.json();
    const { code } = body as { code: string };

    if (!code || typeof code !== "string") {
      return new Response(
        JSON.stringify({ error: "authorization_code ausente ou inválido." }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // ── 3. Trocar o code pelo access_token na API da Nuvemshop ──
    const tokenRes = await fetch(
      `https://www.tiendanube.com/apps/${CLIENT_ID}/authorize`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
        }),
      }
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("[nuvemshop-auth] Erro ao trocar code:", err);
      return new Response(
        JSON.stringify({ error: "Falha ao obter access_token da Nuvemshop.", detail: err }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const tokenData = await tokenRes.json() as {
      access_token: string;
      token_type: string;
      scope: string;
      user_id: number;
    };

    const { access_token, token_type, scope, user_id } = tokenData;

    if (!access_token || !user_id) {
      throw new Error("Resposta da Nuvemshop não contém access_token ou user_id.");
    }

    // ── 4. Salvar no Supabase (service role para bypass de RLS) ──
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error: dbError } = await supabase
      .from("nuvemshop_tokens")
      .upsert(
        {
          user_id: String(user_id),
          access_token,
          token_type,
          scope,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (dbError) {
      console.error("[nuvemshop-auth] Erro ao salvar no banco:", dbError);
      throw new Error(dbError.message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Token da Nuvemshop salvo com sucesso.",
        user_id,
      }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno desconhecido.";
    console.error("[nuvemshop-auth] Erro:", message);

    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
