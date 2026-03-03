import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const db = new Database('aspiyas.db');

// Initialize Database
export function initDb() {
  // Users (Admin)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Settings (Global config like analytics ID, contact email, etc.)
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Pages (Dynamic pages)
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT, -- JSON or HTML content
      meta_description TEXT,
      language TEXT DEFAULT 'tr',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Blogs
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      image_url TEXT,
      language TEXT DEFAULT 'tr',
      published BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create default admin if not exists
  const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (!admin) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('Default admin user created: admin / admin123');
  }

  // Seed initial pages if missing
  const seedPages = [
    {
      slug: 'home',
      title: 'Ana Sayfa',
      content: '<p>Bu içerik dinamik olarak yönetilebilir. Ana sayfa tasarımı React bileşenleri ile oluşturulmaktadır.</p>',
    },
    {
      slug: 'shoovo',
      title: 'Shoovo',
      content:
        '<p>Shoovo, markalar ve içerik üreticileri için tasarlanmış yeni nesil sosyal alışveriş platformudur.</p>',
    },
    {
      slug: 'asp-agency',
      title: 'ASP Agency',
      content:
        '<p>ASP Agency, kreatif kampanyalar ve performans odaklı pazarlama çözümleri üreten ajans yapılanmamızdır.</p>',
    },
    {
      slug: 'asp-production',
      title: 'ASP Production',
      content:
        '<p>ASP Production, 4K prodüksiyon, post prodüksiyon ve motion design süreçlerini yöneten prodüksiyon stüdyosudur.</p>',
    },
    {
      slug: 'asp-app-studio',
      title: 'ASP App Studio',
      content:
        '<p>ASP App Studio, yapay zeka destekli mobil ve web uygulamaları geliştiren ürün stüdyosudur.</p>',
    },
    {
      slug: 'saas-yazilim',
      title: 'SaaS Yazılım Projeleri',
      content:
        '<p>SaaS yazılım hizmetlerimiz, B2B odaklı ölçeklenebilir çözümler sunar. İçerik admin panel üzerinden güncellenebilir.</p>',
    },
    {
      slug: 'medya-produksiyon',
      title: 'Medya ve Prodüksiyon',
      content:
        '<p>Medya ve prodüksiyon hizmetlerimiz hakkında detaylı içerik buradan yönetilebilir.</p>',
    },
    {
      slug: 'ai-mobil-uygulamalar',
      title: 'AI Destekli Mobil Uygulamalar',
      content:
        '<p>Yapay zeka destekli mobil uygulama projelerimizle ilgili detayları buradan yönetebilirsiniz.</p>',
    },
    {
      slug: 'dijital-pazarlama',
      title: 'Dijital Pazarlama',
      content:
        '<p>Dijital pazarlama hizmetlerimiz ve performans odaklı yaklaşımlarımız burada anlatılabilir.</p>',
    },
  ];

  seedPages.forEach((page) => {
    const existing = db.prepare('SELECT 1 FROM pages WHERE slug = ?').get(page.slug);
    if (!existing) {
      db.prepare(
        'INSERT INTO pages (slug, title, content, language) VALUES (?, ?, ?, ?)',
      ).run(page.slug, page.title, page.content, 'tr');
    }
  });

  // Seed example blog posts (insert only if slug doesn't exist)
  const seedBlogs = [
    {
      slug: 'yapay-zeka-ve-dijital-donusum-2025',
      title: '2025’te Yapay Zeka ve Dijital Dönüşüm: Türkiye Perspektifi',
      excerpt:
        'Türkiye’deki işletmeler için yapay zeka entegrasyonu ve dijital dönüşüm yol haritası.',
      content: `
          <p>Yapay zeka, 2025 itibarıyla sadece teknoloji şirketlerinin değil; perakende, finans, medya ve üretim sektörlerinin de gündeminde. Türkiye’deki işletmeler için bu dönüşüm hem fırsat hem de risk taşıyor.</p>
          <h2>Neden şimdi?</h2>
          <p>LLM ve genel amaçlı AI modelleri artık erişilebilir ve özelleştirilebilir. Müşteri hizmetleri, içerik üretimi ve veri analizi gibi alanlarda hızlı ROI sağlayan uygulamalar mümkün.</p>
          <h2>Nereden başlamalı?</h2>
          <p>Önce küçük, ölçülebilir pilot projelerle başlamak kritik. Hangi süreçte en çok zaman kaybediyorsunuz? Hangi veri zaten elinizde? Bu sorular cevap bulduğunda, AI entegrasyonu için adım adım bir yol haritası çıkarılabilir.</p>
          <p>Aspiyas olarak; SaaS, mobil ve medya projelerinde AI destekli çözümler geliştiriyoruz. Hedefimiz, Türkiye’den başlayıp EMEA pazarlarına açılan ürünler için sürdürülebilir bir mimari kurmak.</p>
        `,
      image_url:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    },
    {
      slug: 'sosyal-alisveris-ve-icerik-ekonomisi',
      title: 'Sosyal Alışveriş ve İçerik Ekonomisi: İçerik Üreticileri İçin Yeni Gelir Modelleri',
      excerpt:
        'TikTok Shop, Instagram Shopping ve yeni nesil platformlarla değişen tüketici davranışı.',
      content: `
          <p>İçerik üreticileri artık sadece reklam geliriyle değil; doğrudan ürün satışı ve affiliate linkleriyle de gelir elde ediyor. Bu trend, markalar ve platformlar için yeni fırsatlar yaratıyor.</p>
          <h2>Platformlar nasıl değişiyor?</h2>
          <p>TikTok Shop, Instagram Shopping ve yeni nesil sosyal alışveriş platformları; keşif, etkileşim ve satın alma aksiyonunu tek funnel’da birleştiriyor. Kullanıcı deneyimi bozulmadan alışveriş yapılabiliyor.</p>
          <h2>Türkiye pazarı</h2>
          <p>Türkiye’de e-ticaret ve sosyal medya kullanımı yüksek. İçerik üreticileri ile markalar arasındaki köprüyü güçlendiren platformlar, bu pazarda hızlı büyüme potansiyeline sahip.</p>
          <p>Shoovo, markaları, içerik üreticilerini ve tüketicileri tek ekosistemde buluşturan bir sosyal alışveriş platformu olarak bu alanda konumlanıyor. Pilot aşamada İstanbul merkezli markalarla çalışıyoruz.</p>
        `,
      image_url:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const insertBlog = db.prepare(
    'INSERT INTO blogs (slug, title, excerpt, content, image_url, language) VALUES (?, ?, ?, ?, ?, ?)',
  );
  let added = 0;
  seedBlogs.forEach((blog) => {
    const existing = db.prepare('SELECT 1 FROM blogs WHERE slug = ?').get(blog.slug);
    if (!existing) {
      insertBlog.run(
        blog.slug,
        blog.title,
        blog.excerpt,
        blog.content.trim(),
        blog.image_url,
        'tr',
      );
      added++;
    }
  });
  if (added > 0) console.log(`Seed: ${added} örnek blog yazısı eklendi.`);
}

export default db;
