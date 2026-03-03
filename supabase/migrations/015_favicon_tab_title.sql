-- Favicon (sekme ikonu) için
INSERT INTO public.settings (key, value) VALUES
  ('favicon_url', '')
ON CONFLICT (key) DO NOTHING;
