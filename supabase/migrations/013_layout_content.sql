-- Layout (nav, footer) metinleri TR/EN
INSERT INTO public.site_sections (key, content) VALUES ('layout', '{
  "tr": {
    "navHome": "Ana Sayfa",
    "navAbout": "Hakkımızda",
    "navServices": "Hizmetlerimiz",
    "navBlog": "Blog",
    "navContact": "İletişim",
    "ctaContact": "Bize Ulaşın",
    "footerDiscover": "Keşfet",
    "footerContact": "İletişim",
    "footerPrivacy": "Gizlilik",
    "footerTerms": "Kullanım Şartları"
  },
  "en": {
    "navHome": "Home",
    "navAbout": "About",
    "navServices": "Services",
    "navBlog": "Blog",
    "navContact": "Contact",
    "ctaContact": "Contact Us",
    "footerDiscover": "Discover",
    "footerContact": "Contact",
    "footerPrivacy": "Privacy",
    "footerTerms": "Terms of Use"
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
