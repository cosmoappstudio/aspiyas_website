-- Contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (form submit), only auth can read
CREATE POLICY "Public insert contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read contact" ON public.contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth update contact" ON public.contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- Site sections (values, services) - JSON content for admin editing
CREATE TABLE IF NOT EXISTS public.site_sections (
  key TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sections" ON public.site_sections FOR SELECT USING (true);
CREATE POLICY "Auth write sections" ON public.site_sections FOR ALL USING (auth.role() = 'authenticated');

-- Default values section
INSERT INTO public.site_sections (key, content) VALUES ('values', '[
  {"icon":"Zap","title":"Hız","desc":"En hızlı çözümlerle rakiplerinizin önüne geçin."},
  {"icon":"Users","title":"Güçlü Ortaklıklar","desc":"Sektör liderleriyle stratejik işbirlikleri."},
  {"icon":"TrendingUp","title":"Ölçeklenebilirlik","desc":"Büyüyen işinizle birlikte genişleyen altyapı."},
  {"icon":"DollarSign","title":"Karlılık","desc":"Yatırım getirisini maksimize eden stratejiler."},
  {"icon":"Heart","title":"Sosyal Fayda","desc":"Topluma değer katan projeler."},
  {"icon":"Leaf","title":"Sürdürülebilirlik","desc":"Gelecek nesiller için çevre dostu teknolojiler."}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Default services section
INSERT INTO public.site_sections (key, content) VALUES ('services', '[
  {"tag":"SaaS","title":"SaaS Yazılım Projeleri","desc":"B2B odaklı, faydalı micro-macro SaaS yazılım projeleri üretiyoruz.","features":["Bulut Tabanlı","Yüksek Güvenlik","API Entegrasyonu"],"path":"/saas-yazilim"},
  {"tag":"Medya & Prodüksiyon","title":"Medya ve Prodüksiyon","desc":"Dinamik içerik optimizasyonu, tasarım ve prodüksiyon odaklı projeler.","features":["4K Video","Motion Graphics","Ses Tasarımı"],"path":"/medya-produksiyon"},
  {"tag":"Mobil Uygulama","title":"AI Destekli Mobil Apps","desc":"Farklı gelir modelleri içeren yapay zeka destekli üretkenlik uygulamaları.","features":["iOS & Android","Machine Learning","User Experience"],"path":"/ai-mobil-uygulamalar"},
  {"tag":"Reklam & Pazarlama","title":"Dijital Pazarlama","desc":"Veri bilimi odaklı performans pazarlama ve programatik reklam.","features":["SEO/SEM","Veri Analizi","Dönüşüm Odaklı"],"path":"/dijital-pazarlama"}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Extended site settings
INSERT INTO public.settings (key, value) VALUES
  ('logo_url', ''),
  ('contact_phone', '+90 212 000 00 00'),
  ('contact_address', 'Maslak, İstanbul'),
  ('social_instagram', ''),
  ('social_linkedin', ''),
  ('social_twitter', ''),
  ('default_language', 'tr'),
  ('footer_description', 'Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz. Geleceği bugünden şekillendiriyoruz.')
ON CONFLICT (key) DO NOTHING;
