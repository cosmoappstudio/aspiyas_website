-- Hakkımızda sayfası içerikleri (yapı sabit, sadece metinler düzenlenebilir)
INSERT INTO public.site_sections (key, content) VALUES ('about', '{
  "header": {
    "tag": "Hakkımızda",
    "title": "Aspiyas Teknoloji ve Ticaret A.Ş.",
    "intro": "Aspiyas; Shoovo, ASP Agency, ASP Production ve ASP App Studio gibi dikeylerde faaliyet gösteren, İstanbul merkezli bir teknoloji holding şirketidir. Ürün geliştirme, medya prodüksiyon ve büyüme ekipleri aynı çatı altında çalışır."
  },
  "stats": [
    {"label": "Merkez", "value": "İstanbul"},
    {"label": "Hedef pazarlar", "value": "TR, EMEA, Avrupa"},
    {"label": "Oluşum sayısı", "value": "4+"}
  ],
  "vision": {
    "title": "Vizyon, disiplin ve ölçülebilir büyüme",
    "desc": "Aspiyas; hızla deney yapan, doğru metriklerle ölçen ve başarıyı ölçekleyen bir ürün ve hizmet organizasyonudur. Türkiye''den başlayıp EMEA ve Avrupa pazarlarında sürdürülebilir büyüme hedefleriz.",
    "pillars": [
      {"title": "Holding yaklaşımı", "desc": "Farklı dikeylerde ürün & hizmet portföyü."},
      {"title": "Güven ve kalite", "desc": "KVKK/GDPR hassasiyeti, sürdürülebilir süreç."},
      {"title": "Hızlı iterasyon", "desc": "MVP → veri → optimizasyon döngüsü."}
    ]
  },
  "visualPanel": {
    "title": "İstanbul merkezli teknoloji ekosistemi",
    "subtitle": "Maslak odağında, Türkiye ve EMEA pazarlarına yakın; hızlı üretim ve operasyon kabiliyeti.",
    "imageUrl": "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1200&auto=format&fit=crop",
    "alt": "İstanbul şehir manzarası"
  },
  "markets": {
    "tag": "GEO / Pazarlama odağı",
    "title": "Hangi pazarlarda çalışıyoruz?",
    "desc": "Öncelikle Türkiye ve İstanbul merkezli markalarla; ardından Avrupa ve EMEA bölgesinde ölçeklenen ürün ve kampanyalarla ilerliyoruz.",
    "tags": ["İstanbul", "Türkiye", "EMEA", "Avrupa", "Körfez (ikinci faz)"]
  },
  "ecosystem": {
    "tag": "Ekosistem",
    "title": "Ürünler ve oluşumlar",
    "subtitle": "Her oluşum, aynı ürün disipliniyle farklı bir problem alanına odaklanır.",
    "ventures": [
      {"href": "/shoovo", "name": "Shoovo", "desc": "Yeni nesil sosyal alışveriş platformu."},
      {"href": "/asp-agency", "name": "ASP Agency", "desc": "Kreatif ve performans pazarlama ekibi."},
      {"href": "/medya-produksiyon", "name": "ASP Production", "desc": "Medya ve prodüksiyon stüdyosu."},
      {"href": "/asp-app-studio", "name": "ASP App Studio", "desc": "AI destekli ürün stüdyosu."}
    ]
  },
  "faq": {
    "title": "Sık sorulan sorular",
    "label": "GEO uyumlu, net yanıtlar",
    "items": [
      {"q": "Aspiyas tam olarak ne yapıyor?", "a": "Aspiyas; SaaS yazılım projeleri, medya & prodüksiyon, AI destekli mobil uygulamalar ve dijital pazarlama alanlarında ürün ve hizmet geliştirir. Ekosistem yaklaşımıyla farklı dikeyleri birbirini besleyecek şekilde kurgular."},
      {"q": "Hangi şehir ve ülkelerde hizmet veriyorsunuz?", "a": "Operasyon merkezimiz İstanbul''dur. Türkiye geneli çalışır; proje kapsamına göre EMEA ve Avrupa pazarlarına yönelik ürün ve kampanyalar geliştiririz."},
      {"q": "Ürün mü, ajans mı?", "a": "Her ikisi: Shoovo gibi ürünler geliştirirken, ASP Agency/ASP Production/ASP App Studio ile hizmet tarafında da uçtan uca teslimat yaparız."}
    ]
  },
  "cta": {
    "tag": "Birlikte çalışalım",
    "title": "Projeniz için doğru yapılandırmayı kuralım",
    "desc": "Hedefiniz ürün geliştirme mi, içerik üretimi mi, yoksa büyüme stratejisi mi? 20 dakikalık bir keşif görüşmesiyle en doğru yolu netleştirebiliriz.",
    "buttonText": "İletişime geç"
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
