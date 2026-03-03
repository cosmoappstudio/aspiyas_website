-- ValuesSection başlık alanı
INSERT INTO public.site_sections (key, content) VALUES ('values_section_header', '{
  "tr": {"tag": "Değerlerimiz", "title": "Teknoloji Odaklı Yaratıcı", "titleSubline": "Sürdürülebilir Büyüme", "intro": "Aspiyas olarak kararlarımızı; hız, ölçeklenebilirlik ve toplumsal etki ekseninde şekillendiriyoruz."},
  "en": {"tag": "Our Values", "title": "Technology-Driven Creative", "titleSubline": "Sustainable Growth", "intro": "At Aspiyas, we shape our decisions around speed, scalability and social impact."}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ContactCtaSection
INSERT INTO public.site_sections (key, content) VALUES ('contact_cta', '{
  "tr": {"title": "Projenizi konuşalım", "desc": "Hedefiniz ürün, içerik mi yoksa büyüme stratejisi mi? Kısa bir keşif görüşmesiyle en doğru yolu birlikte netleştirebiliriz.", "button": "Bize Ulaşın"},
  "en": {"title": "Let''s talk about your project", "desc": "Is your goal product, content or growth strategy? We can clarify the right path together in a short discovery meeting.", "button": "Contact Us"}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- RecentBlogsSection
INSERT INTO public.site_sections (key, content) VALUES ('recent_blogs', '{
  "tr": {"tag": "Blog & İçerik", "title": "Son yazılar", "allPosts": "Tüm yazılar", "readMore": "Devamını Oku", "empty": "Henüz blog yazısı yok. Yakında burada görünecek."},
  "en": {"tag": "Blog & Content", "title": "Recent posts", "allPosts": "All posts", "readMore": "Read more", "empty": "No blog posts yet. Coming soon."}
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
