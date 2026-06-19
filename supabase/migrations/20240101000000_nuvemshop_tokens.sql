-- Tabela para armazenar tokens de acesso da Nuvemshop
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.nuvemshop_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL UNIQUE,   -- ID da loja na Nuvemshop
  access_token TEXT NOT NULL,
  token_type  TEXT DEFAULT 'bearer',
  scope       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: apenas o service_role pode acessar (a Edge Function usa service_role)
ALTER TABLE public.nuvemshop_tokens ENABLE ROW LEVEL SECURITY;

-- Nenhuma política pública — só o service_role (usado pela Edge Function) tem acesso
-- Se precisar que usuários autenticados leiam seu próprio token, adicione a policy abaixo:
-- CREATE POLICY "Owner can read own token"
--   ON public.nuvemshop_tokens FOR SELECT
--   USING (auth.uid()::text = user_id);

COMMENT ON TABLE public.nuvemshop_tokens IS 'Tokens de acesso OAuth da Nuvemshop por loja (user_id)';
