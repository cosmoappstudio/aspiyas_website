-- Varsayılan sayfalar (footer linkleri için)
INSERT INTO public.pages (slug, title, content, meta_description) VALUES
  ('privacy', 'Gizlilik Politikası', '<p>Bu sayfa gizlilik politikamızı içermektedir. Kişisel verileriniz güvenle saklanır ve üçüncü taraflarla paylaşılmaz.</p><p>İletişim formu üzerinden gönderdiğiniz bilgiler yalnızca size dönüş yapmak amacıyla kullanılır.</p>', 'Aspiyas gizlilik politikası'),
  ('terms', 'Kullanım Şartları', '<p>Bu web sitesini kullanarak kullanım şartlarımızı kabul etmiş sayılırsınız.</p><p>İçerikler telif hakkı ile korunmaktadır. İzinsiz kopyalama yasaktır.</p>', 'Aspiyas kullanım şartları')
ON CONFLICT (slug) DO NOTHING;
