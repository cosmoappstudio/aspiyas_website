-- Ana sayfa Hero bölümü
INSERT INTO public.site_sections (key, content) VALUES ('home', '{
  "tr": {
    "badge": "Geleceği Şekillendiriyoruz",
    "titleLine1": "Teknoloji Odaklı",
    "titleLine2": "Yaratıcı Çözümler",
    "description": "Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz. Markalarınızı güçlendirerek dijital dönüşümde öncü rol oynuyoruz.",
    "ctaPrimary": "Bize Ulaşın",
    "ctaSecondary": "Tanıtım Filmi",
    "scrollHint": "Kaydır"
  },
  "en": {
    "badge": "Shaping the Future",
    "titleLine1": "Technology-Driven",
    "titleLine2": "Creative Solutions",
    "description": "We create innovative products in AI-focused media and technology. We strengthen your brands and play a leading role in digital transformation.",
    "ctaPrimary": "Contact Us",
    "ctaSecondary": "Intro Video",
    "scrollHint": "Scroll"
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- İletişim sayfası
INSERT INTO public.site_sections (key, content) VALUES ('contact', '{
  "tr": {
    "badge": "İletişim",
    "title": "Projenizi konuşalım",
    "description": "İstanbul merkezli ekibimizle Türkiye ve global pazarlarda ürün, içerik ve büyüme süreçleri tasarlıyoruz. En hızlı şekilde dönüş yapabilmemiz için kısaca hedefinizi ve kapsamınızı paylaşın.",
    "formTitle": "Bize yazın",
    "formLabelName": "Adınız Soyadınız",
    "formLabelEmail": "E-posta",
    "formLabelPhone": "Telefon (opsiyonel)",
    "formLabelSubject": "Konu (opsiyonel)",
    "formLabelMessage": "Mesajınız",
    "formSubmit": "Gönder",
    "formSending": "Gönderiliyor...",
    "formSuccess": "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
    "formError": "Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.",
    "contactInfoTitle": "İletişim bilgileri",
    "discoveryCardTitle": "Hızlı keşif çağrısı",
    "discoveryCardDesc": "20 dakikalık bir görüşmede; hedeflerinizi, zaman planınızı ve bütçe yaklaşımınızı netleştirip size uygun bir yol haritası çıkarabiliriz.",
    "discoveryCardButton": "Mail at",
    "visualPanelTitle": "İstanbul ofis",
    "visualPanelSubtitle": "Maslak merkezli operasyon; Türkiye ve EMEA pazarlarına hızlı erişim."
  },
  "en": {
    "badge": "Contact",
    "title": "Let''s talk about your project",
    "description": "With our Istanbul-based team, we design product, content and growth processes in Turkey and global markets. Share your goals and scope briefly so we can respond as quickly as possible.",
    "formTitle": "Write to us",
    "formLabelName": "Full Name",
    "formLabelEmail": "Email",
    "formLabelPhone": "Phone (optional)",
    "formLabelSubject": "Subject (optional)",
    "formLabelMessage": "Your message",
    "formSubmit": "Send",
    "formSending": "Sending...",
    "formSuccess": "Your message has been received. We will get back to you as soon as possible.",
    "formError": "An error occurred. Please try again or send an email directly.",
    "contactInfoTitle": "Contact information",
    "discoveryCardTitle": "Quick discovery call",
    "discoveryCardDesc": "In a 20-minute meeting, we can clarify your goals, timeline and budget approach and create a roadmap that suits you.",
    "discoveryCardButton": "Send email",
    "visualPanelTitle": "Istanbul office",
    "visualPanelSubtitle": "Maslak-based operations; quick access to Turkey and EMEA markets."
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
