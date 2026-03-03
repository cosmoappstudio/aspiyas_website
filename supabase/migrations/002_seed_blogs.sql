-- Optional: Seed example blog posts (run after 001_initial.sql)
INSERT INTO public.blogs (slug, title, excerpt, content, image_url, language) VALUES
(
  'yapay-zeka-ve-dijital-donusum-2025',
  '2025''te Yapay Zeka ve Dijital Dönüşüm: Türkiye Perspektifi',
  'Türkiye''deki işletmeler için yapay zeka entegrasyonu ve dijital dönüşüm yol haritası.',
  '<p>Yapay zeka, 2025 itibarıyla sadece teknoloji şirketlerinin değil; perakende, finans, medya ve üretim sektörlerinin de gündeminde. Türkiye''deki işletmeler için bu dönüşüm hem fırsat hem de risk taşıyor.</p><h2>Neden şimdi?</h2><p>LLM ve genel amaçlı AI modelleri artık erişilebilir ve özelleştirilebilir. Müşteri hizmetleri, içerik üretimi ve veri analizi gibi alanlarda hızlı ROI sağlayan uygulamalar mümkün.</p><h2>Nereden başlamalı?</h2><p>Önce küçük, ölçülebilir pilot projelerle başlamak kritik. Hangi süreçte en çok zaman kaybediyorsunuz? Hangi veri zaten elinizde? Bu sorular cevap bulduğunda, AI entegrasyonu için adım adım bir yol haritası çıkarılabilir.</p><p>Aspiyas olarak; SaaS, mobil ve medya projelerinde AI destekli çözümler geliştiriyoruz. Hedefimiz, Türkiye''den başlayıp EMEA pazarlarına açılan ürünler için sürdürülebilir bir mimari kurmak.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
  'tr'
),
(
  'sosyal-alisveris-ve-icerik-ekonomisi',
  'Sosyal Alışveriş ve İçerik Ekonomisi: İçerik Üreticileri İçin Yeni Gelir Modelleri',
  'TikTok Shop, Instagram Shopping ve yeni nesil platformlarla değişen tüketici davranışı.',
  '<p>İçerik üreticileri artık sadece reklam geliriyle değil; doğrudan ürün satışı ve affiliate linkleriyle de gelir elde ediyor. Bu trend, markalar ve platformlar için yeni fırsatlar yaratıyor.</p><h2>Platformlar nasıl değişiyor?</h2><p>TikTok Shop, Instagram Shopping ve yeni nesil sosyal alışveriş platformları; keşif, etkileşim ve satın alma aksiyonunu tek funnel''da birleştiriyor. Kullanıcı deneyimi bozulmadan alışveriş yapılabiliyor.</p><h2>Türkiye pazarı</h2><p>Türkiye''de e-ticaret ve sosyal medya kullanımı yüksek. İçerik üreticileri ile markalar arasındaki köprüyü güçlendiren platformlar, bu pazarda hızlı büyüme potansiyeline sahip.</p><p>Shoovo, markaları, içerik üreticilerini ve tüketicileri tek ekosistemde buluşturan bir sosyal alışveriş platformu olarak bu alanda konumlanıyor. Pilot aşamada İstanbul merkezli markalarla çalışıyoruz.</p>',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
  'tr'
)
ON CONFLICT (slug) DO NOTHING;
