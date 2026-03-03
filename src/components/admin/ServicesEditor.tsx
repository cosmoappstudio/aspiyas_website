import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface ServiceItem {
  tag: string;
  title: string;
  desc: string;
  features: string[];
  path: string;
}

type ContentWithLang = { tr: ServiceItem[]; en: ServiceItem[] };

const EMPTY_ITEM: ServiceItem = { tag: '', title: '', desc: '', features: [], path: '' };

function normalizeContent(raw: unknown): ContentWithLang {
  const c = raw as Record<string, unknown>;
  if (c?.tr && Array.isArray(c.tr)) {
    return { tr: c.tr as ServiceItem[], en: (Array.isArray(c.en) ? c.en : []) as ServiceItem[] };
  }
  const arr = Array.isArray(c) ? (c as ServiceItem[]) : [];
  return { tr: arr.length ? arr : [{ ...EMPTY_ITEM }], en: [] };
}

export function ServicesEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: [{ ...EMPTY_ITEM }], en: [] });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await supabase.from('site_sections').select('content').eq('key', 'services').single();
        if (data?.content) setContent(normalizeContent(data.content));
      } catch {
        setContent({ tr: [{ ...EMPTY_ITEM }], en: [] });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const valid = content[lang].filter(i => i.title.trim());
    const toSave = { ...content, [lang]: valid.length ? valid : content[lang] };
    const { error: err } = await supabase.from('site_sections').upsert({ key: 'services', content: toSave, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (err) setError(err.message);
    setSaving(false);
  };

  const items = content[lang];
  const update = (i: number, f: Partial<ServiceItem>) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[lang] = next[lang].map((item: ServiceItem, idx: number) => idx === i ? { ...item, ...f } : item);
      return next;
    });
  };
  const updateFeatures = (i: number, text: string) => update(i, { features: text.split(',').map(s => s.trim()).filter(Boolean) });
  const add = () => setContent(prev => ({ ...prev, [lang]: [...prev[lang], { ...EMPTY_ITEM }] }));
  const remove = (idx: number) => setContent(prev => ({ ...prev, [lang]: prev[lang].filter((_: ServiceItem, i: number) => i !== idx) }));

  if (loading) return <p className="text-white/50">Yükleniyor...</p>;

  return (
    <CollapsibleSection title="Hizmetler Kartları (Ana Sayfa)" defaultOpen={false}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {(['tr', 'en'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)} className={`px-4 py-2 text-sm font-medium ${lang === l ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>
              {l === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
        <button type="button" onClick={handleSave} disabled={saving} className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-black/50 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">Kart {i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded" disabled={items.length <= 1}>
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Etiket (tag)</label>
              <input value={item.tag} onChange={e => update(i, { tag: e.target.value })} placeholder="Örn: SaaS" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Başlık</label>
              <input value={item.title} onChange={e => update(i, { title: e.target.value })} placeholder="Örn: SaaS Yazılım Projeleri" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Açıklama</label>
              <textarea value={item.desc} onChange={e => update(i, { desc: e.target.value })} placeholder="Kısa açıklama" rows={2} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Özellikler (virgülle ayırın)</label>
              <input value={item.features?.join(', ') ?? ''} onChange={e => updateFeatures(i, e.target.value)} placeholder="Örn: Bulut Tabanlı, Yüksek Güvenlik, API" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Sayfa yolu (path)</label>
              <input value={item.path} onChange={e => update(i, { path: e.target.value })} placeholder="Örn: /saas-yazilim" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white" />
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="flex gap-2 items-center mt-4 px-3 py-2 bg-white/10 hover:bg-white/5 rounded text-sm">
        <Plus size={16} /> Kart Ekle
      </button>
    </CollapsibleSection>
  );
}
