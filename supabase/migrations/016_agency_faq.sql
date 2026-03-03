-- SSS / Agency FAQ section (replaces ContactCta)
INSERT INTO public.site_sections (key, content) VALUES ('agency_faq', '{
  "tr": {
    "title": "Sıkça Sorulan Sorular",
    "subtitle": "Ajans süreçlerimiz ve çalışma şeklimiz hakkında merak ettikleriniz.",
    "ctaText": "Projenizi konuşalım",
    "items": [
      {"question": "Keşif süreci nasıl işler?", "answer": "İlk görüşmede hedeflerinizi, mevcut durumunuzu ve beklentilerinizi dinliyoruz. Kısa bir keşif çağrısıyla projenin kapsamını netleştirip, size özel bir yol haritası sunuyoruz."},
      {"question": "Proje yönetimi nasıl yapılıyor?", "answer": "Her projede atanmış bir proje yöneticisi ile haftalık senkron toplantıları yapıyoruz. Trello, Notion veya sizin tercih ettiğiniz araçlarla ilerleme takibi sağlıyoruz."},
      {"question": "Teslimat süreleri ne kadar?", "answer": "Proje türüne göre değişir. MVP ve prototipler 4–8 hafta, tam kapsamlı ürünler 3–6 ay sürebilir. Keşif sonrası net bir zaman çizelgesi sunuyoruz."},
      {"question": "Fiyatlandırma nasıl çalışır?", "answer": "Proje bazlı sabit fiyat veya sprint bazlı retainer modeli sunuyoruz. Keşif görüşmesinde ihtiyacınıza uygun modeli birlikte belirliyoruz."}
    ]
  },
  "en": {
    "title": "Frequently Asked Questions",
    "subtitle": "Questions about our agency processes and how we work.",
    "ctaText": "Let''s talk about your project",
    "items": [
      {"question": "How does the discovery process work?", "answer": "In the first meeting, we listen to your goals, current situation and expectations. We clarify the project scope in a short discovery call and present a custom roadmap."},
      {"question": "How is project management handled?", "answer": "Each project has an assigned project manager with weekly sync meetings. We track progress via Trello, Notion or your preferred tools."},
      {"question": "What are the delivery timelines?", "answer": "Varies by project type. MVP and prototypes: 4–8 weeks, full-scale products: 3–6 months. We provide a clear timeline after discovery."},
      {"question": "How does pricing work?", "answer": "We offer fixed project-based pricing or sprint-based retainer models. We determine the right model for your needs in the discovery meeting."}
    ]
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
