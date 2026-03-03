-- Ana sayfa Ekosistem (Ventures) bölümü
INSERT INTO public.site_sections (key, content) VALUES ('ventures', '{
  "tr": {
    "header": {
      "tag": "Aspiyas Ekosistemi",
      "title": "Tek Holding, Birden Fazla",
      "titleSubline": "Dijital Girişim",
      "intro": "Her bir oluşum, aynı vizyonun farklı bir yansıması. Tutarlı bir marka mimarisi altında, farklı iş modelleri üretiyoruz."
    },
    "ventures": [
      {"name": "Shoovo", "tag": "Social Commerce", "description": "Markalar, içerik üreticileri ve tüketicileri tek platformda buluşturan yeni nesil sosyal alışveriş deneyimi.", "accent": "from-[#FF4D00] to-[#FF0000]", "href": "/shoovo", "ctaText": "Detaylı incele"},
      {"name": "ASP Agency", "tag": "Creative & Strategy", "description": "Markalar için uçtan uca kreatif strateji, kampanya kurgusu ve performans odaklı pazarlama çözümleri.", "accent": "from-[#5B21FF] to-[#22D3EE]", "href": "/asp-agency", "ctaText": "Detaylı incele"},
      {"name": "ASP Production", "tag": "Media Production", "description": "4K prodüksiyon, motion design ve post prodüksiyon süreçlerini tek çatı altında toplayan prodüksiyon stüdyosu.", "accent": "from-[#F97316] to-[#FACC15]", "href": "/asp-production", "ctaText": "Detaylı incele"},
      {"name": "ASP App Studio", "tag": "Product Studio", "description": "Yapay zeka destekli mobil ve web ürünleri geliştiren, deney odaklı dijital ürün stüdyosu.", "accent": "from-[#22C55E] to-[#0EA5E9]", "href": "/asp-app-studio", "ctaText": "Detaylı incele"}
    ]
  },
  "en": {
    "header": {
      "tag": "Aspiyas Ecosystem",
      "title": "Single Holding, Multiple",
      "titleSubline": "Digital Ventures",
      "intro": "Each entity is a different reflection of the same vision. Under a consistent brand architecture, we produce different business models."
    },
    "ventures": [
      {"name": "Shoovo", "tag": "Social Commerce", "description": "A new generation social shopping experience that brings brands, content creators, and consumers together on a single platform.", "accent": "from-[#FF4D00] to-[#FF0000]", "href": "/shoovo", "ctaText": "Learn more"},
      {"name": "ASP Agency", "tag": "Creative & Strategy", "description": "End-to-end creative strategy, campaign setup, and performance-oriented marketing solutions for brands.", "accent": "from-[#5B21FF] to-[#22D3EE]", "href": "/asp-agency", "ctaText": "Learn more"},
      {"name": "ASP Production", "tag": "Media Production", "description": "A production studio that brings 4K production, motion design, and post-production processes under one roof.", "accent": "from-[#F97316] to-[#FACC15]", "href": "/asp-production", "ctaText": "Learn more"},
      {"name": "ASP App Studio", "tag": "Product Studio", "description": "An experience-oriented digital product studio developing AI-powered mobile and web products.", "accent": "from-[#22C55E] to-[#0EA5E9]", "href": "/asp-app-studio", "ctaText": "Learn more"}
    ]
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
