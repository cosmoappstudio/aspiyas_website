import { useState, useEffect, type ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

const ACCENT_OPTIONS = [
  { value: 'from-[#FF4D00] to-[#FF0000]', label: 'Turuncu-Kırmızı' },
  { value: 'from-[#5B21FF] to-[#22D3EE]', label: 'Mor-Mavi' },
  { value: 'from-[#F97316] to-[#FACC15]', label: 'Turuncu-Sarı' },
  { value: 'from-[#22C55E] to-[#0EA5E9]', label: 'Yeşil-Mavi' },
];

interface VentureItem {
  name: string;
  tag: string;
  description: string;
  accent: string;
  href: string;
  ctaText: string;
}

interface VenturesContent {
  header: { tag: string; title: string; titleSubline: string; intro: string };
  ventures: VentureItem[];
}

type ContentWithLang = { tr: VenturesContent; en: VenturesContent };

const EMPTY_VENTURE: VentureItem = {
  name: '',
  tag: '',
  description: '',
  accent: 'from-[#5B21FF] to-[#22D3EE]',
  href: '',
  ctaText: 'Detaylı incele',
};

const EMPTY: VenturesContent = {
  header: { tag: '', title: '', titleSubline: '', intro: '' },
  ventures: [{ ...EMPTY_VENTURE }],
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-white/50 mb-1">{label}</label>
      {children}
    </div>
  );
}

function normalizeContent(raw: unknown): ContentWithLang {
  const c = raw as Record<string, unknown>;
  if (c?.tr && typeof c.tr === 'object') {
    const tr = { ...EMPTY, ...c.tr } as VenturesContent;
    const en = { ...EMPTY, ...(c.en as object) } as VenturesContent;
    if (!tr.ventures?.length) tr.ventures = [{ ...EMPTY_VENTURE }];
    if (!en.ventures?.length) en.ventures = [{ ...EMPTY_VENTURE }];
    return { tr, en };
  }
  return { tr: { ...EMPTY }, en: { ...EMPTY } };
}

export function VenturesEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'ventures').single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from('site_sections').upsert({ key: 'ventures', content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (err) setError(err.message);
    setSaving(false);
  };

  const c = content[lang];
  const ventures = c.ventures ?? [];

  const update = (path: string, value: unknown) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = (`${lang}.${path}`).split('.');
      let o: Record<string, unknown> = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        const idx = parseInt(k, 10);
        if (!isNaN(idx)) o = (o as unknown as unknown[])[idx] as Record<string, unknown>;
        else o = o[k] as Record<string, unknown>;
      }
      o[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateVenture = (i: number, f: Partial<VentureItem>) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const v = [...(next[lang].ventures || [])];
      v[i] = { ...v[i], ...f };
      next[lang].ventures = v;
      return next;
    });
  };

  const addVenture = () => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[lang].ventures = [...(next[lang].ventures || []), { ...EMPTY_VENTURE }];
      return next;
    });
  };

  const removeVenture = (i: number) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const v = (next[lang].ventures || []).filter((_: VentureItem, idx: number) => idx !== i);
      next[lang].ventures = v.length ? v : [{ ...EMPTY_VENTURE }];
      return next;
    });
  };

  if (loading) return <p className="text-white/50">Yükleniyor...</p>;

  const inputCls = 'w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm';

  return (
    <CollapsibleSection title="Ekosistem (Ventures)" defaultOpen={true}>
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

      <CollapsibleSection title="Başlık Alanı" defaultOpen={true}>
        <Field label="Etiket"><input className={inputCls} value={c.header.tag} onChange={e => update('header.tag', e.target.value)} /></Field>
        <Field label="Başlık"><input className={inputCls} value={c.header.title} onChange={e => update('header.title', e.target.value)} /></Field>
        <Field label="Alt başlık (gri)"><input className={inputCls} value={c.header.titleSubline} onChange={e => update('header.titleSubline', e.target.value)} /></Field>
        <Field label="Açıklama (sağ)"><textarea className={inputCls} rows={2} value={c.header.intro} onChange={e => update('header.intro', e.target.value)} /></Field>
      </CollapsibleSection>

      <div className="mt-4 space-y-4">
        {ventures.map((v, i) => (
          <div key={i} className="p-4 bg-black/50 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">Kart {i + 1}</span>
              <button type="button" onClick={() => removeVenture(i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded" disabled={ventures.length <= 1}>
                <Trash2 size={16} />
              </button>
            </div>
            <Field label="İsim"><input className={inputCls} value={v.name} onChange={e => updateVenture(i, { name: e.target.value })} placeholder="Shoovo" /></Field>
            <Field label="Kategori etiketi"><input className={inputCls} value={v.tag} onChange={e => updateVenture(i, { tag: e.target.value })} placeholder="Social Commerce" /></Field>
            <Field label="Açıklama"><textarea className={inputCls} rows={2} value={v.description} onChange={e => updateVenture(i, { description: e.target.value })} /></Field>
            <Field label="Link (href)">
              <input className={inputCls} value={v.href} onChange={e => updateVenture(i, { href: e.target.value })} placeholder="/shoovo" />
            </Field>
            <Field label="CTA metni"><input className={inputCls} value={v.ctaText} onChange={e => updateVenture(i, { ctaText: e.target.value })} placeholder="Detaylı incele" /></Field>
            <Field label="Gradient renk">
              <select className={inputCls} value={v.accent} onChange={e => updateVenture(i, { accent: e.target.value })}>
                {ACCENT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </div>
        ))}
      </div>
      <button type="button" onClick={addVenture} className="flex gap-2 items-center mt-4 px-3 py-2 bg-white/10 hover:bg-white/5 rounded text-sm">
        <Plus size={16} /> Kart Ekle
      </button>
    </CollapsibleSection>
  );
}
