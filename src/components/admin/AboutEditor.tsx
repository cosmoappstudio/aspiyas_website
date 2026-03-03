import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { ImageField } from './ImageField';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface AboutContent {
  header: { tag: string; title: string; intro: string };
  stats: { label: string; value: string }[];
  vision: { title: string; desc: string; pillars: { title: string; desc: string }[] };
  visualPanel: { title: string; subtitle: string; imageUrl: string; alt: string };
  markets: { tag: string; title: string; desc: string; tags: string[] };
  ecosystem: { tag: string; title: string; subtitle: string; ventures: { href: string; name: string; desc: string }[] };
  faq: { title: string; label: string; items: { q: string; a: string }[] };
  cta: { tag: string; title: string; desc: string; buttonText: string };
}

type ContentWithLang = { tr: AboutContent; en: AboutContent };

const EMPTY: AboutContent = {
  header: { tag: 'Hakkımızda', title: '', intro: '' },
  stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
  vision: { title: '', desc: '', pillars: [{ title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }] },
  visualPanel: { title: '', subtitle: '', imageUrl: '', alt: '' },
  markets: { tag: '', title: '', desc: '', tags: [] },
  ecosystem: { tag: '', title: '', subtitle: '', ventures: [] },
  faq: { title: '', label: '', items: [] },
  cta: { tag: '', title: '', desc: '', buttonText: '' },
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
    return { tr: { ...EMPTY, ...c.tr } as AboutContent, en: { ...EMPTY, ...(c.en as object) } as AboutContent };
  }
  const flat = { ...EMPTY, ...c } as AboutContent;
  return { tr: flat, en: { ...EMPTY } };
}

export function AboutEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'about').single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_sections').upsert({ key: 'about', content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(false);
  };

  const c = content[lang];

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

  if (loading) return <p className="text-white/50">Yükleniyor...</p>;

  const inputCls = 'w-full bg-black border border-white/10 rounded px-3 py-2 text-white';

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-bold">Hakkımızda Sayfası</h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {(['tr', 'en'] as const).map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} className={`px-4 py-2 text-sm font-medium ${lang === l ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>
                {l === 'tr' ? 'Türkçe' : 'English'}
              </button>
            ))}
          </div>
          <button type="button" onClick={save} disabled={saving} className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      <CollapsibleSection title="Üst Bölüm" defaultOpen={true}>
        <Field label="Etiket"><input className={inputCls} value={c.header.tag} onChange={e => update('header.tag', e.target.value)} /></Field>
        <Field label="Başlık"><input className={inputCls} value={c.header.title} onChange={e => update('header.title', e.target.value)} /></Field>
        <Field label="Giriş paragrafı"><textarea rows={3} className={inputCls} value={c.header.intro} onChange={e => update('header.intro', e.target.value)} /></Field>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {c.stats.map((s, i) => (
            <div key={i} className="bg-black/50 p-3 rounded">
              <Field label="Etiket"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.label} onChange={e => update(`stats.${i}.label`, e.target.value)} /></Field>
              <Field label="Değer"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.value} onChange={e => update(`stats.${i}.value`, e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Vizyon Bölümü" defaultOpen={false}>
        <Field label="Başlık"><input className={inputCls} value={c.vision.title} onChange={e => update('vision.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.vision.desc} onChange={e => update('vision.desc', e.target.value)} /></Field>
        {c.vision.pillars.map((p, i) => (
          <div key={i} className="mt-4 p-3 bg-black/50 rounded">
            <Field label={`Pilon ${i + 1} başlık`}><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" value={p.title} onChange={e => update(`vision.pillars.${i}.title`, e.target.value)} /></Field>
            <Field label={`Pilon ${i + 1} açıklama`}><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" value={p.desc} onChange={e => update(`vision.pillars.${i}.desc`, e.target.value)} /></Field>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Görsel Panel" defaultOpen={false}>
        <Field label="Başlık"><input className={inputCls} value={c.visualPanel.title} onChange={e => update('visualPanel.title', e.target.value)} /></Field>
        <Field label="Alt başlık"><input className={inputCls} value={c.visualPanel.subtitle} onChange={e => update('visualPanel.subtitle', e.target.value)} /></Field>
        <ImageField label="Görsel" value={c.visualPanel.imageUrl} onChange={v => update('visualPanel.imageUrl', v)} recommendedSize="1200×800" />
        <Field label="Alt metin"><input className={inputCls} value={c.visualPanel.alt} onChange={e => update('visualPanel.alt', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Pazarlar Kartı" defaultOpen={false}>
        <Field label="Etiket"><input className={inputCls} value={c.markets.tag} onChange={e => update('markets.tag', e.target.value)} /></Field>
        <Field label="Başlık"><input className={inputCls} value={c.markets.title} onChange={e => update('markets.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.markets.desc} onChange={e => update('markets.desc', e.target.value)} /></Field>
        <Field label="Etiketler (virgülle ayırın)"><input className={inputCls} value={c.markets.tags?.join(', ') ?? ''} onChange={e => update('markets.tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Ekosistem / Oluşumlar" defaultOpen={false}>
        <Field label="Etiket"><input className={inputCls} value={c.ecosystem.tag} onChange={e => update('ecosystem.tag', e.target.value)} /></Field>
        <Field label="Başlık"><input className={inputCls} value={c.ecosystem.title} onChange={e => update('ecosystem.title', e.target.value)} /></Field>
        <Field label="Alt başlık"><input className={inputCls} value={c.ecosystem.subtitle} onChange={e => update('ecosystem.subtitle', e.target.value)} /></Field>
        {(c.ecosystem.ventures ?? []).map((v, i) => (
          <div key={i} className="mt-4 p-3 bg-black/50 rounded">
            <Field label="Link"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={v.href} onChange={e => update(`ecosystem.ventures.${i}.href`, e.target.value)} /></Field>
            <Field label="İsim"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={v.name} onChange={e => update(`ecosystem.ventures.${i}.name`, e.target.value)} /></Field>
            <Field label="Açıklama"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={v.desc} onChange={e => update(`ecosystem.ventures.${i}.desc`, e.target.value)} /></Field>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="SSS" defaultOpen={false}>
        <Field label="Başlık"><input className={inputCls} value={c.faq.title} onChange={e => update('faq.title', e.target.value)} /></Field>
        <Field label="Etiket"><input className={inputCls} value={c.faq.label} onChange={e => update('faq.label', e.target.value)} /></Field>
        {(c.faq.items ?? []).map((item, i) => (
          <div key={i} className="mt-4 p-3 bg-black/50 rounded">
            <Field label="Soru"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" value={item.q} onChange={e => update(`faq.items.${i}.q`, e.target.value)} /></Field>
            <Field label="Cevap"><textarea rows={2} className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" value={item.a} onChange={e => update(`faq.items.${i}.a`, e.target.value)} /></Field>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="CTA Bölümü" defaultOpen={false}>
        <Field label="Etiket"><input className={inputCls} value={c.cta.tag} onChange={e => update('cta.tag', e.target.value)} /></Field>
        <Field label="Başlık"><input className={inputCls} value={c.cta.title} onChange={e => update('cta.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.cta.desc} onChange={e => update('cta.desc', e.target.value)} /></Field>
        <Field label="Buton metni"><input className={inputCls} value={c.cta.buttonText} onChange={e => update('cta.buttonText', e.target.value)} /></Field>
      </CollapsibleSection>
    </div>
  );
}
