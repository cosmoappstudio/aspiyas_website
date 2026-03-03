import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, FileText, Settings, LogOut, Plus, Trash2, Edit, Save, X } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('pages');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-display font-bold tracking-tight">Aspiyas Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Sayfalar" 
            active={activeTab === 'pages'} 
            onClick={() => setActiveTab('pages')} 
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Blog Yazıları" 
            active={activeTab === 'blogs'} 
            onClick={() => setActiveTab('blogs')} 
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Ayarlar" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
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
      <main className="flex-1 overflow-y-auto bg-[#050505] p-10">
        {activeTab === 'pages' && <PagesManager />}
        {activeTab === 'blogs' && <BlogsManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
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

function PagesManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>({ title: '', slug: '', content: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await axios.get('/api/pages');
    setPages(res.data);
  };

  const handleSave = async () => {
    if (currentPage.id) {
      await axios.put(`/api/pages/${currentPage.id}`, currentPage);
    } else {
      await axios.post('/api/pages', currentPage);
    }
    setIsEditing(false);
    fetchPages();
    setCurrentPage({ title: '', slug: '', content: '' });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Emin misiniz?')) {
      await axios.delete(`/api/pages/${id}`);
      fetchPages();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Sayfa Yönetimi</h2>
        <button 
          onClick={() => { setIsEditing(true); setCurrentPage({ title: '', slug: '', content: '' }); }}
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-200"
        >
          <Plus size={18} /> Yeni Sayfa
        </button>
      </div>

      {isEditing ? (
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 max-w-2xl">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-bold">{currentPage.id ? 'Sayfayı Düzenle' : 'Yeni Sayfa'}</h3>
            <button onClick={() => setIsEditing(false)}><X size={20} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Başlık</label>
              <input 
                className="w-full bg-black border border-white/10 rounded p-2 text-white"
                value={currentPage.title}
                onChange={e => setCurrentPage({...currentPage, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Slug (URL)</label>
              <input 
                className="w-full bg-black border border-white/10 rounded p-2 text-white"
                value={currentPage.slug}
                onChange={e => setCurrentPage({...currentPage, slug: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">İçerik (HTML)</label>
              <textarea 
                className="w-full bg-black border border-white/10 rounded p-2 text-white h-48 font-mono text-sm"
                value={currentPage.content}
                onChange={e => setCurrentPage({...currentPage, content: e.target.value})}
              />
            </div>
            <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium">
              Kaydet
            </button>
          </div>
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

function BlogsManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>({ title: '', slug: '', content: '', excerpt: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get('/api/blogs');
    setBlogs(res.data);
  };

  const handleSave = async () => {
    if (currentBlog.id) {
      await axios.put(`/api/blogs/${currentBlog.id}`, currentBlog);
    } else {
      await axios.post('/api/blogs', currentBlog);
    }
    setIsEditing(false);
    fetchBlogs();
    setCurrentBlog({ title: '', slug: '', content: '', excerpt: '' });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Emin misiniz?')) {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Blog Yönetimi</h2>
        <button 
          onClick={() => { setIsEditing(true); setCurrentBlog({ title: '', slug: '', content: '', excerpt: '' }); }}
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-200"
        >
          <Plus size={18} /> Yeni Yazı
        </button>
      </div>

      {isEditing ? (
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 max-w-2xl">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-bold">{currentBlog.id ? 'Yazıyı Düzenle' : 'Yeni Yazı'}</h3>
            <button onClick={() => setIsEditing(false)}><X size={20} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Başlık</label>
              <input 
                className="w-full bg-black border border-white/10 rounded p-2 text-white"
                value={currentBlog.title}
                onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Slug (URL)</label>
              <input 
                className="w-full bg-black border border-white/10 rounded p-2 text-white"
                value={currentBlog.slug}
                onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Özet</label>
              <textarea 
                className="w-full bg-black border border-white/10 rounded p-2 text-white h-20"
                value={currentBlog.excerpt}
                onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">İçerik</label>
              <textarea 
                className="w-full bg-black border border-white/10 rounded p-2 text-white h-48 font-mono text-sm"
                value={currentBlog.content}
                onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})}
              />
            </div>
            <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium">
              Kaydet
            </button>
          </div>
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

function SettingsManager() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await axios.get('/api/settings');
    setSettings(res.data);
  };

  const handleSave = async (key: string, value: string) => {
    setLoading(true);
    await axios.post('/api/settings', { key, value });
    setLoading(false);
    fetchSettings();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-8">Ayarlar</h2>
      
      <div className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-white/10">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Google Analytics ID</label>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-black border border-white/10 rounded p-2 text-white"
              placeholder="G-XXXXXXXXXX"
              value={settings.analytics_id || ''}
              onChange={e => setSettings({...settings, analytics_id: e.target.value})}
            />
            <button 
              onClick={() => handleSave('analytics_id', settings.analytics_id)}
              className="bg-white text-black px-4 rounded font-medium hover:bg-gray-200"
            >
              Kaydet
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Site Başlığı</label>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-black border border-white/10 rounded p-2 text-white"
              value={settings.site_title || ''}
              onChange={e => setSettings({...settings, site_title: e.target.value})}
            />
            <button 
              onClick={() => handleSave('site_title', settings.site_title)}
              className="bg-white text-black px-4 rounded font-medium hover:bg-gray-200"
            >
              Kaydet
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">İletişim Email</label>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-black border border-white/10 rounded p-2 text-white"
              value={settings.contact_email || ''}
              onChange={e => setSettings({...settings, contact_email: e.target.value})}
            />
            <button 
              onClick={() => handleSave('contact_email', settings.contact_email)}
              className="bg-white text-black px-4 rounded font-medium hover:bg-gray-200"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
