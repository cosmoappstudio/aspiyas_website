-- Hero başlığını prompt/yanıt formatına güncelle
-- Satır 1: "Aspiyas?" (prompt/soru)
-- Satır 2: "Teknoloji Odaklı Yaratıcı Çözümler" (AI yanıtı)
UPDATE public.site_sections
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(content, '{tr,titleLine1}', '"Aspiyas?"'),
      '{tr,titleLine2}', '"Teknoloji Odaklı Yaratıcı Çözümler"'
    ),
    '{en,titleLine1}', '"Aspiyas?"'
  ),
  '{en,titleLine2}', '"Technology-Driven Creative Solutions"'
)
WHERE key = 'home';
