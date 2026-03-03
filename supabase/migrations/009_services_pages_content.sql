-- Hizmetler ana sayfası (/services)
INSERT INTO public.site_sections (key, content) VALUES ('services_page', '{
  "header": {
    "tag": "Hizmetlerimiz",
    "title": "Aspiyas''ın hizmet portföyü",
    "intro": "Yazılım, medya, mobil ve pazarlama hizmetlerimizi; aynı marka stratejisi ve teknoloji yaklaşımı ile konumlandırıyoruz."
  },
  "services": [
    {"slug": "/saas-yazilim", "label": "SaaS Yazılım Projeleri", "description": "B2B odaklı, ölçeklenebilir SaaS platformları ile iş süreçlerini dijitalleştiriyoruz.", "tags": ["B2B", "Multi-tenant", "RBAC"]},
    {"slug": "/medya-produksiyon", "label": "Medya ve Prodüksiyon", "description": "İstanbul merkezli prodüksiyon ekibimizle sosyal medya ve reklam filmleri üretiyoruz.", "tags": ["4K Prodüksiyon", "Motion", "Ses Tasarımı"]},
    {"slug": "/ai-mobil-uygulamalar", "label": "AI Destekli Mobil Uygulamalar", "description": "App Store ve Google Play için yapay zeka destekli üretkenlik ve içerik uygulamaları.", "tags": ["iOS & Android", "LLM", "Subscription"]},
    {"slug": "/dijital-pazarlama", "label": "Dijital Pazarlama", "description": "SEO, performans pazarlama ve içerik stratejisini aynı çatı altında yönetiyoruz.", "tags": ["SEO", "Paid Media", "Analytics"]}
  ],
  "productsTag": "Ürünlerimiz",
  "products": [
    {"slug": "/shoovo", "label": "Shoovo", "description": "Markalar, içerik üreticileri ve tüketicileri tek ekosistemde buluşturan sosyal alışveriş platformu.", "tags": ["Social Commerce", "Marketplace", "Türkiye Çıkışlı"]}
  ]
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- SaaS Yazılım sayfası
INSERT INTO public.site_sections (key, content) VALUES ('saas-yazilim', '{
  "header": {"tag": "B2B SaaS Yazılım Projeleri", "title": "Ölçeklenebilir SaaS çözümleri ile", "titleSubline": "iş süreçlerinizi dijitalleştiriyoruz", "intro": "Aspiyas, Türkiye ve Avrupa pazarına yönelik mikro ve makro ölçekte SaaS ürünleri geliştirir. Mimariden kullanıcı deneyimine kadar tüm süreci tek çatı altında yönetiyoruz."},
  "section": {"title": "İş hedeflerine göre tasarlanan SaaS projeleri", "desc": "İstanbul merkezli ürün ekibimiz; finans, medya, perakende ve üretim gibi farklı dikeylerde SaaS projeleri geliştiriyor. Her ürün için uzun vadeli bakım, loglama ve gözlemlenebilirlik standarttır.", "bullets": ["Multi-tenant mimari ile Türkiye ve global müşterileri aynı platformda yönetebilme", "Role-based access control (RBAC) ile güvenli kullanıcı yönetimi", "CI/CD ve otomatik test süreçleriyle sürdürülebilir bakım"]},
  "stats": [{"label": "Uptime hedefi", "value": "99.5%"}, {"label": "Veri lokasyonu", "value": "EU / TR"}, {"label": "3rd party entegrasyon", "value": "API-first"}],
  "visualPanel": {"title": "Uygulama mimarisi görünümü", "subtitle": "SaaS platformlarımız için kullandığımız modern, bulut tabanlı mimari yaklaşımından bir kesit.", "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop", "alt": "Bulut tabanlı SaaS mimarisi gösteren diyagram"},
  "asideCard": {"title": "Hangi ülkeler ve bölgeler için?", "desc": "Öncelikli hedef pazarlarımız; Türkiye, Almanya, Hollanda, Birleşik Krallık ve Körfez ülkeleri. Projeleri, KVKK ve GDPR uyumlu olacak şekilde tasarlıyoruz.", "tags": ["Türkiye", "Almanya", "Hollanda", "Birleşik Krallık", "BAE", "Suudi Arabistan"]},
  "ctaCard": {"title": "Projenizi konuşalım", "desc": "Mevcut SaaS ürününüzü ölçeklemek veya sıfırdan yeni bir platform kurmak istiyorsanız, teknik olmayan ekiplerin de anlayabileceği bir roadmap çıkarıyoruz.", "buttonText": "Proje brief gönder"}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Medya Prodüksiyon sayfası
INSERT INTO public.site_sections (key, content) VALUES ('medya-produksiyon', '{
  "header": {"tag": "Medya & Prodüksiyon", "title": "İstanbul merkezli prodüksiyon", "titleSubline": "stüdyomuzla markaları sahneye taşıyoruz", "intro": "ASP Production, sosyal medya içeriklerinden reklam filmlerine kadar uçtan uca medya ve prodüksiyon hizmeti sunar. İstanbul odaklı fakat Türkiye geneli ve yakın coğrafyada prodüksiyon yönetiyoruz."},
  "section": {"title": "Üretimden post prodüksiyona tüm süreç", "desc": "Markanızın hikâyesini; kampanya filmi, ürün tanıtımı veya kısa formatlı sosyal medya içerikleri ile hedef kitleye taşıyoruz. Kreatif ekip ile prodüksiyon ekibi aynı masa etrafında çalışır.", "bullets": ["4K ve üzeri çekim kalitesi, profesyonel ekipman parkı", "Sosyal medya için dikey format optimizasyonu", "Motion graphics, animasyon ve ses tasarımı"]},
  "features": [{"label": "Reklam filmi"}, {"label": "Sosyal medya içerikleri"}, {"label": "Ses & müzik tasarımı"}],
  "visualPanel": {"title": "Set ortamından bir kare", "subtitle": "ASP Production ekibinin İstanbul''da gerçekleştirdiği prodüksiyonlardan bir sahne.", "imageUrl": "https://images.unsplash.com/photo-1516031190212-da133013de50?q=80&w=1200&auto=format&fit=crop", "alt": "Prodüksiyon setinde çekim yapan ekip"},
  "asideCard": {"title": "Çekim lokasyonlarımız", "desc": "Ana üssümüz İstanbul olmak üzere, Türkiye geneli ve yakın coğrafyada çekim gerçekleştirebiliyoruz.", "tags": ["İstanbul", "Ankara", "İzmir", "Türkiye Geneli", "Balkanlar", "Orta Doğu"]},
  "ctaCard": {"title": "Prodüksiyon brief gönderin", "desc": "Çekim yapılacak şehir, tarih ve içerik türüyle birlikte kısa bir brief paylaşırsanız, size özel bir prodüksiyon planı hazırlayabiliriz.", "buttonText": "İletişime geç"}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- AI Mobil Uygulamalar sayfası
INSERT INTO public.site_sections (key, content) VALUES ('ai-mobil-uygulamalar', '{
  "header": {"tag": "AI Destekli Mobil Uygulamalar", "title": "Mobilde yapay zeka ile", "titleSubline": "üretkenlik ve gelir odaklı deneyimler", "intro": "ASP App Studio ekibi; App Store ve Google Play için AI destekli üretkenlik, içerik ve iş yönetimi uygulamaları geliştirir. Türkiye''de başlayıp global pazarda büyüyen ürünler hedefliyoruz."},
  "section": {"title": "Türkiye çıkışlı global uygulamalar", "desc": "Ürünlerimizi; kullanıcı araştırmaları, pazar validasyonu ve gelir modeli analizleri ile birlikte kurguluyoruz. Freemium, subscription veya usage-based modellerle çalışabiliyoruz.", "bullets": ["App Store ve Google Play için native deneyim odaklı tasarım", "AI / LLM entegrasyonlarıyla kişiselleştirilmiş kullanıcı akışları", "Analitik ve A/B testleri ile sürekli optimizasyon"]},
  "features": [{"label": "iOS & Android"}, {"label": "LLM & ML entegrasyonu"}, {"label": "Gelir modeli kurgusu"}],
  "visualPanel": {"title": "Mobil ürün önizlemesi", "subtitle": "ASP App Studio tarafından geliştirilen AI destekli mobil deneyimlerden bir ekran görüntüsü.", "imageUrl": "https://images.unsplash.com/photo-1551817958-20204d6ab8f6?q=80&w=1200&auto=format&fit=crop", "alt": "Yapay zeka destekli mobil uygulama arayüzü"},
  "asideCard": {"title": "Hangi pazarlara odaklanıyoruz?", "desc": "Ürünlerimizi; Türkiye, Avrupa ve Kuzey Amerika ağırlıklı pazarlar için lokal ihtiyaçlara göre konumlandırıyoruz.", "tags": ["Türkiye", "Avrupa", "Kuzey Amerika", "Orta Doğu", "İngilizce konuşulan pazarlar"]},
  "ctaCard": {"title": "Beraber ürün geliştirmek ister misiniz?", "desc": "Şirket içi ihtiyaçlarınız için white-label bir uygulama geliştirebilir veya birlikte yeni bir ürün şirketi kurabiliriz.", "buttonText": "Ürün fikrini paylaş"}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Dijital Pazarlama sayfası
INSERT INTO public.site_sections (key, content) VALUES ('dijital-pazarlama', '{
  "header": {"tag": "Dijital Pazarlama & Performans", "title": "Veri odaklı kampanyalar ile", "titleSubline": "dijital kanallarda büyüme sağlıyoruz", "intro": "ASP Agency, markalar için performans pazarlama, içerik stratejisi ve marka iletişimini tek merkezden yönetir. SEO, medya satın alma ve içerik üretimini aynı çatı altında topluyoruz."},
  "section": {"title": "SEO, medya ve içerik stratejisi aynı planda", "desc": "İstanbul merkezli ekibimiz; Türkiye ve global pazarlarda markaların organik ve performans kanallarını dengeli şekilde büyütmesini hedefler. Teknik SEO ve kreatif içerik birlikte çalışır.", "bullets": ["Anahtar kelime analizi, içerik planlama ve teknik SEO", "Meta, Google ve programatik reklam kampanyaları", "Şehir, ülke ve hedef kitle bazlı kampanya segmentasyonu"]},
  "features": [{"label": "Performans raporları"}, {"label": "Hedef kitle kurgusu"}, {"label": "Çoklu ülke stratejisi"}],
  "asideCard": {"title": "Hangi sektörlerle çalışıyoruz?", "desc": "Teknoloji, e-ticaret, SaaS, finans ve hızlı tüketim başta olmak üzere farklı dikeylerde deneyim sahibiyiz.", "tags": ["Teknoloji", "E-ticaret", "SaaS", "Finans", "FMCG", "Start-up markaları"]},
  "ctaCard": {"title": "Dijital pazarlama denetimi isteyin", "desc": "Mevcut kampanyalarınızı ve web sitenizi inceleyip kısa bir analiz raporu hazırlayabilir, gelişim alanlarınızı beraber belirleyebiliriz.", "buttonText": "Ücretsiz ön analiz talep et"}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
