# Supabase Kurulum Rehberi

Admin panel ve tüm içerik artık Supabase üzerinden yönetiliyor. Aşağıdaki adımları tamamlayın.

## 1. Supabase Projesi Oluştur

1. [supabase.com](https://supabase.com) → Dashboard → New Project
2. Proje adı ve şifre belirle
3. Proje oluşturulduktan sonra **Settings → API** bölümünden:
   - **Project URL** (örn: `https://xxxx.supabase.co`)
   - **anon public** key

## 2. Ortam Değişkenleri

Proje kökünde `.env` dosyası oluştur (`.env.example` dosyasını kopyalayabilirsin):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Veritabanı Migration

Supabase Dashboard → **SQL Editor** → New query

1. `supabase/migrations/001_initial.sql` içeriğini kopyala ve çalıştır
2. (İsteğe bağlı) `supabase/migrations/002_seed_blogs.sql` ile örnek blog yazılarını ekle

## 4. Admin Kullanıcısı

Supabase Dashboard → **Authentication → Users → Add user**

- Email: `admin@aspiyas.com` (veya istediğin email)
- Password: güçlü bir şifre belirle

Bu email ve şifre ile `/login` sayfasından admin panele giriş yapabilirsin.

## 5. Çalıştırma

```bash
PORT=5173 npm run dev
```

- Public site: `http://localhost:5173`
- Admin: `http://localhost:5173/login` → giriş yap → `/yonetimofisi`

## Tablolar

| Tablo    | Açıklama                          |
|----------|-----------------------------------|
| `pages`  | Dinamik CMS sayfaları (slug, title, content) |
| `blogs`  | Blog yazıları (slug, title, excerpt, content, image_url) |
| `settings` | Site ayarları (gtm_container_id, site_title, contact_email) |
| `profiles` | Kullanıcı profilleri (gelecekte RBAC için) |

## Google Tag Manager

Admin panel → Ayarlar → **Google Tag Manager Container ID** alanına `GTM-XXXXXX` yazıp kaydedin. Site yüklendiğinde GTM otomatik enjekte edilir. Boş bırakırsanız GTM yüklenmez.

## RLS (Row Level Security)

- **Public read**: Herkes `pages`, `blogs`, `settings` tablolarını okuyabilir (site için)
- **Auth write**: Sadece giriş yapmış kullanıcılar yazabilir (admin panel)
