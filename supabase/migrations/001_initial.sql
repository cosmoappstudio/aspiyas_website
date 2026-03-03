-- Aspiyas: Initial schema for pages, blogs, settings
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Pages (dynamic CMS pages)
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  language TEXT DEFAULT 'tr',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blogs
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  language TEXT DEFAULT 'tr',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Settings (key-value)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (extends Supabase auth.users - for future RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Public read for pages, blogs, settings
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read pages, blogs, settings (public site)
CREATE POLICY "Public read pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Public read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

-- Only authenticated users can write (admin panel)
CREATE POLICY "Auth write pages" ON public.pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Profiles: users can read own profile
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed default settings
INSERT INTO public.settings (key, value) VALUES
  ('gtm_container_id', ''),
  ('site_title', 'Aspiyas Teknoloji ve Ticaret A.Ş.'),
  ('contact_email', 'info@aspiyas.com')
ON CONFLICT (key) DO NOTHING;
