-- Site görselleri için public bucket (Supabase Dashboard'dan da oluşturulabilir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Authenticated kullanıcılar yükleyebilir
DROP POLICY IF EXISTS "Auth upload images" ON storage.objects;
CREATE POLICY "Auth upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Herkes okuyabilir
DROP POLICY IF EXISTS "Public read images" ON storage.objects;
CREATE POLICY "Public read images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'images');
