import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Plus, Trash2, Edit, X, Globe, MessageSquare, ExternalLink, Briefcase, Home, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ValuesEditor } from '../components/admin/ValuesEditor';
import { ServicesEditor } from '../components/admin/ServicesEditor';
import { VenturesEditor } from '../components/admin/VenturesEditor';
import { HtmlEditor } from '../components/admin/HtmlEditor';
import { AboutEditor } from '../components/admin/AboutEditor';
import { ImageField } from '../components/admin/ImageField';
import { CollapsibleSection } from '../components/admin/CollapsibleSection';
import { ServicesPageEditor } from '../components/admin/ServicesPageEditor';
import { ServicePageEditor } from '../components/admin/ServicePageEditor';
import { HeroEditor } from '../components/admin/HeroEditor';
import { ContactPageEditor } from '../components/admin/ContactPageEditor';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('pages');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-display font-bold tracking-tight">Aspiyas Admin</h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
          >
            <ExternalLink size={14} /> Site'e git
          </a>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Sayfalar" active={activeTab === 'pages'} onClick={() => setActiveTab('pages')} />
          <SidebarItem icon={<FileText size={20} />} label="Blog Yazıları" active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} />
          <SidebarItem icon={<Home size={20} />} label="Ana Sayfa (Hero)" active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} />
          <SidebarItem icon={<Globe size={20} />} label="Hakkımızda" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
          <SidebarItem icon={<Briefcase size={20} />} label="Hizmetler" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          <SidebarItem icon={<Briefcase size={20} />} label="SaaS Yazılım" active={activeTab === 'saas-yazilim'} onClick={() => setActiveTab('saas-yazilim')} />
          <SidebarItem icon={<Briefcase size={20} />} label="Medya Prodüksiyon" active={activeTab === 'medya-produksiyon'} onClick={() => setActiveTab('medya-produksiyon')} />
          <SidebarItem icon={<Briefcase size={20} />} label="AI Mobil Uygulamalar" active={activeTab === 'ai-mobil-uygulamalar'} onClick={() => setActiveTab('ai-mobil-uygulamalar')} />
          <SidebarItem icon={<Briefcase size={20} />} label="Dijital Pazarlama" active={activeTab === 'dijital-pazarlama'} onClick={() => setActiveTab('dijital-pazarlama')} />
          <SidebarItem icon={<Globe size={20} />} label="Genel Ayarlar" active={activeTab === 'site'} onClick={() => setActiveTab('site')} />
          <SidebarItem icon={<Mail size={20} />} label="İletişim Sayfası" active={activeTab === 'contact-page'} onClick={() => setActiveTab('contact-page')} />
          <SidebarItem icon={<MessageSquare size={20} />} label="İletişim Talepleri" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
          <SidebarItem icon={<Settings size={20} />} label="Ayarlar" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main id="admin-main" className="flex-1 overflow-y-auto bg-[#050505] p-10">
        {activeTab === 'pages' && <PagesManager />}
        {activeTab === 'blogs' && <BlogsManager />}
        {activeTab === 'hero' && <HeroEditor />}
        {activeTab === 'about' && <AboutEditor />}
        {activeTab === 'services' && <ServicesPageEditor />}
        {activeTab === 'saas-yazilim' && <ServicePageEditor slug="saas-yazilim" title="SaaS Yazılım" />}
        {activeTab === 'medya-produksiyon' && <ServicePageEditor slug="medya-produksiyon" title="Medya Prodüksiyon" />}
        {activeTab === 'ai-mobil-uygulamalar' && <ServicePageEditor slug="ai-mobil-uygulamalar" title="AI Mobil Uygulamalar" />}
        {activeTab === 'dijital-pazarlama' && <ServicePageEditor slug="dijital-pazarlama" title="Dijital Pazarlama" />}
        {activeTab === 'site' && <SiteSettingsManager />}
        {activeTab === 'contact-page' && <ContactPageEditor />}
        {activeTab === 'contact' && <ContactSubmissionsManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
        active 
          ? 'bg-white text-black shadow-lg shadow-white/5' 
          : 'text-white/50 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- Sub-Components for Managers ---

interface PageRow {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  meta_description: string | null;
  gjs_data: object | null;
}

function PagesManager() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<Partial<PageRow> & { title: string; slug: string; content: string; meta_description: string }>({ title: '', slug: '', content: '', meta_description: '' });
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      document.getElementById('admin-main')?.scrollTo({ top: 0, behavior: 'smooth' });
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isEditing]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data } = await supabase.from('pages').select('id, slug, title, content, meta_description, gjs_data').order('created_at', { ascending: false });
    setPages(data ?? []);
  };

  const handleSave = async (payload?: { content?: string }) => {
    setSaving(true);
    try {
      const toSave = payload ? { ...currentPage, ...payload } : currentPage;
      const { id, ...data } = toSave;
      if (id) {
        await supabase.from('pages').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
      } else {
        await supabase.from('pages').insert(data);
      }
      setIsEditing(false);
      setCurrentPage({ title: '', slug: '', content: '', meta_description: '' });
      fetchPages();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    await supabase.from('pages').delete().eq('id', id);
    fetchPages();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Sayfa Yönetimi</h2>
        <button 
          type="button"
          onClick={() => { setIsEditing(true); setCurrentPage({ title: '', slug: '', content: '', meta_description: '' }); }}
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-200"
        >
          <Plus size={18} /> Yeni Sayfa
        </button>
      </div>

      {isEditing ? (
        <div ref={formRef} className="max-w-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{currentPage.id ? 'Sayfayı Düzenle' : 'Yeni Sayfa'}</h3>
            <button onClick={() => setIsEditing(false)}><X size={20} /></button>
          </div>
          <CollapsibleSection title="Temel Bilgiler" defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Başlık</label>
                <input className="w-full bg-black border border-white/10 rounded p-2 text-white" value={currentPage.title} onChange={e => setCurrentPage({...currentPage, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Slug (URL)</label>
                <input className="w-full bg-black border border-white/10 rounded p-2 text-white" value={currentPage.slug} onChange={e => setCurrentPage({...currentPage, slug: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Meta Açıklama (SEO)</label>
                <input className="w-full bg-black border border-white/10 rounded p-2 text-white" placeholder="Arama sonuçlarında görünecek kısa açıklama" value={currentPage.meta_description ?? ''} onChange={e => setCurrentPage({...currentPage, meta_description: e.target.value})} />
              </div>
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="İçerik" defaultOpen={true}>
            <p className="text-xs text-white/40 mb-2">HTML ile yazın. Önizleme sekmesinde sitede nasıl görüneceğini görebilirsiniz.</p>
            <HtmlEditor value={currentPage.content ?? ''} onChange={v => setCurrentPage({...currentPage, content: v})} placeholder="<p>Sayfa içeriği...</p>" minHeight={280} />
          </CollapsibleSection>
          <button onClick={() => handleSave()} disabled={saving} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {pages.map(page => (
            <div key={page.id} className="bg-zinc-900 p-4 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{page.title}</h3>
                <p className="text-sm text-white/40">/{page.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentPage(page); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded text-blue-400"><Edit size={18} /></button>
                <button onClick={() => handleDelete(page.id)} className="p-2 hover:bg-white/10 rounded text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface BlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
}

function BlogsManager() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogRow> & { title: string; slug: string; content: string; excerpt: string; image_url: string }>({ title: '', slug: '', content: '', excerpt: '', image_url: '' });
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (isEditing) {
      document.getElementById('admin-main')?.scrollTo({ top: 0, behavior: 'smooth' });
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isEditing]);

  const fetchBlogs = async () => {
    const { data } = await supabase.from('blogs').select('id, slug, title, excerpt, content, image_url').order('created_at', { ascending: false });
    setBlogs(data ?? []);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, ...payload } = currentBlog;
      if (id) {
        await supabase.from('blogs').update(payload).eq('id', id);
      } else {
        await supabase.from('blogs').insert(payload);
      }
      setIsEditing(false);
      setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', image_url: '' });
      fetchBlogs();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    await supabase.from('blogs').delete().eq('id', id);
    fetchBlogs();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Blog Yönetimi</h2>
        <button 
          type="button"
          onClick={() => { setIsEditing(true); setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', image_url: '' }); }}
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-200"
        >
          <Plus size={18} /> Yeni Yazı
        </button>
      </div>

      {isEditing ? (
        <div ref={formRef} className="max-w-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{currentBlog.id ? 'Yazıyı Düzenle' : 'Yeni Yazı'}</h3>
            <button onClick={() => setIsEditing(false)}><X size={20} /></button>
          </div>
          <CollapsibleSection title="Temel Bilgiler" defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Başlık</label>
                <input className="w-full bg-black border border-white/10 rounded p-2 text-white" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Slug (URL)</label>
                <input className="w-full bg-black border border-white/10 rounded p-2 text-white" value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Özet</label>
                <textarea className="w-full bg-black border border-white/10 rounded p-2 text-white h-20" value={currentBlog.excerpt} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} />
              </div>
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Kapak Görseli" defaultOpen={true}>
            <ImageField label="Kapak görseli" value={currentBlog.image_url ?? ''} onChange={v => setCurrentBlog({...currentBlog, image_url: v})} recommendedSize="1200×630" />
          </CollapsibleSection>
          <CollapsibleSection title="İçerik" defaultOpen={true}>
            <HtmlEditor value={currentBlog.content ?? ''} onChange={v => setCurrentBlog({...currentBlog, content: v})} placeholder="<p>Blog yazısı...</p>" minHeight={280} />
          </CollapsibleSection>
          <button onClick={handleSave} disabled={saving} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-zinc-900 p-4 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{blog.title}</h3>
                <p className="text-sm text-white/40">{blog.excerpt?.substring(0, 50)}...</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentBlog(blog); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded text-blue-400"><Edit size={18} /></button>
                <button onClick={() => handleDelete(blog.id)} className="p-2 hover:bg-white/10 rounded text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function parseFooterDescription(raw: string): { tr: string; en: string } {
  try {
    const parsed = JSON.parse(raw) as { tr?: string; en?: string };
    if (parsed && (parsed.tr != null || parsed.en != null)) {
      return { tr: parsed.tr ?? '', en: parsed.en ?? '' };
    }
  } catch { /* ignore */ }
  return { tr: raw || '', en: '' };
}

function SiteSettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [footerContent, setFooterContent] = useState<{ tr: string; en: string }>({ tr: '', en: '' });
  const [footerLang, setFooterLang] = useState<'tr' | 'en'>('tr');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('key, value');
    const obj: Record<string, string> = {};
    (data ?? []).forEach((r: { key: string; value: string }) => { obj[r.key] = r.value; });
    setSettings(obj);
    setFooterContent(parseFooterDescription(obj.footer_description ?? ''));
  };

  const handleSave = async () => {
    setSaving(true);
    const keys = ['logo_url', 'site_title', 'favicon_url', 'contact_email', 'contact_phone', 'contact_address', 'social_instagram', 'social_linkedin', 'social_twitter', 'default_language'];
    for (const key of keys) {
      const value = settings[key] ?? '';
      await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
    await supabase.from('settings').upsert({ key: 'footer_description', value: JSON.stringify(footerContent), updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(false);
    fetchSettings();
  };

  const inputCls = 'w-full bg-black border border-white/10 rounded p-2 text-white';

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold mb-8">Genel Ayarlar</h2>

      <CollapsibleSection title="Sekme (Favicon & Başlık)" defaultOpen={true}>
        <ImageField label="Favicon (sekme ikonu)" value={settings.favicon_url || ''} onChange={v => setSettings({...settings, favicon_url: v})} recommendedSize="32×32" />
        <p className="text-xs text-white/50 mt-2 mb-4">Tarayıcı sekmesinde görünen ikon. Önerilen: 32×32 veya 64×64 PNG.</p>
        <label className="block text-sm font-medium text-white/70 mb-2">Sekme Başlığı</label>
        <input className={inputCls} value={settings.site_title || ''} onChange={e => setSettings({...settings, site_title: e.target.value})} placeholder="Aspiyas Teknoloji ve Ticaret A.Ş." />
        <p className="text-xs text-white/50 mt-2">Tarayıcı sekmesinde görünen metin (sayfa başlıkları bunu genişletebilir).</p>
      </CollapsibleSection>

      <CollapsibleSection title="Logo" defaultOpen={true}>
        <ImageField label="Logo görseli" value={settings.logo_url || ''} onChange={v => setSettings({...settings, logo_url: v})} recommendedSize="200×60" />
        <p className="text-xs text-white/50 mt-2">Boş bırakırsanız metin logosu kullanılır.</p>
      </CollapsibleSection>

      <CollapsibleSection title="İletişim" defaultOpen={true}>
        <label className="block text-sm font-medium text-white/70 mb-2">İletişim</label>
        <div className="grid grid-cols-1 gap-4">
          <input className={inputCls} placeholder="Email" value={settings.contact_email || ''} onChange={e => setSettings({...settings, contact_email: e.target.value})} />
          <input className={inputCls} placeholder="Telefon" value={settings.contact_phone || ''} onChange={e => setSettings({...settings, contact_phone: e.target.value})} />
          <input className={inputCls} placeholder="Adres" value={settings.contact_address || ''} onChange={e => setSettings({...settings, contact_address: e.target.value})} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Sosyal Medya" defaultOpen={false}>
        <label className="block text-sm font-medium text-white/70 mb-2">Sosyal Medya</label>
        <div className="grid grid-cols-1 gap-4">
          <input className={inputCls} placeholder="Instagram URL" value={settings.social_instagram || ''} onChange={e => setSettings({...settings, social_instagram: e.target.value})} />
          <input className={inputCls} placeholder="LinkedIn URL" value={settings.social_linkedin || ''} onChange={e => setSettings({...settings, social_linkedin: e.target.value})} />
          <input className={inputCls} placeholder="Twitter/X URL" value={settings.social_twitter || ''} onChange={e => setSettings({...settings, social_twitter: e.target.value})} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Footer" defaultOpen={false}>
        <div className="flex gap-2 mb-3">
          {(['tr', 'en'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setFooterLang(l)} className={`px-3 py-1.5 text-sm font-medium rounded ${footerLang === l ? 'bg-white text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              {l === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
        <label className="block text-sm font-medium text-white/70 mb-2">Footer Açıklama ({footerLang === 'tr' ? 'Türkçe' : 'English'})</label>
        <textarea className={`${inputCls} h-20`} value={footerContent[footerLang] || ''} onChange={e => setFooterContent(prev => ({ ...prev, [footerLang]: e.target.value }))} />
      </CollapsibleSection>

      <CollapsibleSection title="Dil" defaultOpen={false}>
        <label className="block text-sm font-medium text-white/70 mb-2">Varsayılan Dil</label>
        <input className={inputCls} placeholder="tr" value={settings.default_language || 'tr'} onChange={e => setSettings({...settings, default_language: e.target.value})} />
      </CollapsibleSection>

      <button onClick={handleSave} disabled={saving} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium disabled:opacity-50">
        {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
      </button>

      <h3 className="text-xl font-bold mt-12 mb-4">Ana Sayfa Bölümleri</h3>
      <ValuesEditor />
      <div className="mt-6">
        <ServicesEditor />
      </div>
      <div className="mt-6">
        <VenturesEditor />
      </div>
    </div>
  );
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

function ContactSubmissionsManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    setSubmissions(data ?? []);
  };

  const markRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    fetchSubmissions();
    if (selected?.id === id) setSelected({ ...selected, read: true });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">İletişim Talepleri</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {submissions.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelected(s)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${selected?.id === s.id ? 'bg-white/10 border-purple-500/50' : 'bg-zinc-900 border-white/10 hover:border-white/20'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{s.name}</p>
                  <p className="text-sm text-white/60">{s.email}</p>
                  <p className="text-xs text-white/40 mt-1 line-clamp-1">{s.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!s.read && <span className="w-2 h-2 rounded-full bg-purple-500" />}
                  <span className="text-xs text-white/40">{new Date(s.created_at).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          ))}
          {submissions.length === 0 && <p className="text-white/50">Henüz talep yok.</p>}
        </div>
        {selected && (
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">{selected.name}</h3>
              {!selected.read && (
                <button onClick={() => markRead(selected.id)} className="text-xs bg-purple-600 px-2 py-1 rounded">Okundu işaretle</button>
              )}
            </div>
            <p className="text-sm text-white/60">{selected.email}</p>
            {selected.phone && <p className="text-sm text-white/60">{selected.phone}</p>}
            {selected.subject && <p className="text-sm font-medium mt-2">Konu: {selected.subject}</p>}
            <p className="mt-4 text-white/80 whitespace-pre-wrap">{selected.message}</p>
            <p className="text-xs text-white/40 mt-4">{new Date(selected.created_at).toLocaleString('tr-TR')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('key, value');
    const obj: Record<string, string> = {};
    (data ?? []).forEach((r: { key: string; value: string }) => { obj[r.key] = r.value; });
    setSettings(obj);
  };

  const handleSave = async (key: string, value: string) => {
    setLoading(true);
    await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setLoading(false);
    fetchSettings();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-8">Teknik Ayarlar</h2>
      <CollapsibleSection title="Google Tag Manager" defaultOpen={true}>
        <label className="block text-sm font-medium text-white/70 mb-2">Container ID</label>
        <p className="text-xs text-white/50 mb-2">
          GTM-XXXXXX formatında. Boş bırakırsanız GTM yüklenmez.
        </p>
        <div className="flex gap-2">
          <input className="flex-1 bg-black border border-white/10 rounded p-2 text-white" placeholder="GTM-XXXXXX" value={settings.gtm_container_id || ''} onChange={e => setSettings({...settings, gtm_container_id: e.target.value})} />
          <button onClick={() => handleSave('gtm_container_id', settings.gtm_container_id ?? '')} className="bg-white text-black px-4 rounded font-medium hover:bg-gray-200">
            Kaydet
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
}
