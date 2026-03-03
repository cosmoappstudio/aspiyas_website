-- GrapesJS proje verisi için (görsel editör)
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS gjs_data JSONB;
