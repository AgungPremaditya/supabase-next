ALTER TABLE public.products
ADD COLUMN slug text NOT NULL UNIQUE;