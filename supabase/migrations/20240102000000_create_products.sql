-- Migration: Create Products Table
-- Synchronizes data from Nuvemshop

CREATE TABLE IF NOT EXISTS public.products (
  id                  BIGINT PRIMARY KEY, -- Using Nuvemshop's ID
  name                TEXT NOT NULL,
  price               DECIMAL(10, 2),
  promotional_price   DECIMAL(10, 2),
  images              JSONB DEFAULT '[]'::jsonb,
  variations          JSONB DEFAULT '[]'::jsonb,
  stock               INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Configuration
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.products FOR SELECT
  USING (true);

-- Only service role can insert/update/delete (via our sync function)
-- Service role bypasses RLS by default, but we explicitly do NOT create
-- public INSERT/UPDATE/DELETE policies to prevent unauthorized modification.

COMMENT ON TABLE public.products IS 'Produtos sincronizados da Nuvemshop';
