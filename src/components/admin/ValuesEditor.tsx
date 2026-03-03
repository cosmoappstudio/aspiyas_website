import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';
import { getIcon } from '../../lib/iconMap';

type Lang = 'tr' | 'en';

const ICON_OPTIONS = ['Zap', 'Users', 'TrendingUp', 'DollarSign', 'Heart', 'Leaf', 'Target', 'Award', 'Shield', 'Sparkles', 'Rocket', 'GitBranch', 'CheckCircle2', 'Star'];

interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

type ContentWithLang = { tr: ValueItem[]; en: ValueItem[] };

function normalizeContent(raw: unknown): ContentWithLang {
  const c = raw as Record<string, unknown>;
  if (c?.tr && Array.isArray(c.tr)) {
    return { tr: c.tr as ValueItem[], en: (Array.isArray(c.en) ? c.en : []) as ValueItem[] };
  }
  const arr = Array.isArray(c) ? (c as ValueItem[]) : [];
  return { tr: arr.length ? arr : [{ icon: 'Zap', title: '', desc: '' }], en: [] };
}

export function ValuesEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: [{ icon: 'Zap', title: '', desc: '' }], en: [] });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await supabase.from('site_sections').select('content').eq('key', 'values').single();
        if (data?.content) setContent(normalizeContent(data.content));
      } catch {
        setContent({ tr: [{ icon: 'Zap', title: '', desc: '' }], en: [] });
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
    const { error: err } = await supabase.from('site_sections').upsert({ key: 'values', content: toSave, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (err) setError(err.message);
    setSaving(false);
  };

  const items = content[lang];
  const update = (i: number, f: Partial<ValueItem>) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[lang] = next[lang].map((item: ValueItem, idx: number) => idx === i ? { ...item, ...f } : item);
      return next;
    });
  };
  const add = () => setContent(prev => ({ ...prev, [lang]: [...prev[lang], { icon: 'Zap', title: '', desc: '' }] }));
  const remove = (i: number) => setContent(prev => ({ ...prev, [lang]: prev[lang].filter((_: ValueItem, idx: number) => idx !== i) }));

  if (loading) return <p className="text-white/50">Yükleniyor...</p>;

  return (
    <CollapsibleSection title="Değerler Kartları" defaultOpen={true}>
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
              <label className="block text-xs text-white/50 mb-1">İkon</label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map(opt => {
                  const IconComp = getIcon(opt);
                  const isSelected = item.icon === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update(i, { icon: opt })}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                        isSelected ? 'bg-white/20 border-white/40 text-white' : 'bg-black/50 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                      title={opt}
                    >
                      <IconComp size={20} />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Başlık</label>
              <input value={item.title} onChange={e => update(i, { title: e.target.value })} placeholder="Örn: Hız" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Açıklama</label>
              <textarea value={item.desc} onChange={e => update(i, { desc: e.target.value })} placeholder="Kısa açıklama" rows={2} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" />
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
