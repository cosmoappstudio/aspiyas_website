import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { ImageField } from './ImageField';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface ServicePageContent {
  header: { tag: string; title: string; titleSubline?: string; intro: string };
  section: { title: string; desc: string; bullets: string[] };
  stats?: { label: string; value: string }[];
  features?: { label: string }[];
  visualPanel?: { title: string; subtitle: string; imageUrl: string; alt: string };
  asideCard: { title: string; desc: string; tags: string[] };
  ctaCard: { title: string; desc: string; buttonText: string };
}

type ContentWithLang = { tr: ServicePageContent; en: ServicePageContent };

const EMPTY: ServicePageContent = {
  header: { tag: '', title: '', titleSubline: '', intro: '' },
  section: { title: '', desc: '', bullets: [] },
  asideCard: { title: '', desc: '', tags: [] },
  ctaCard: { title: '', desc: '', buttonText: '' },
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
    return { tr: { ...EMPTY, ...c.tr } as ServicePageContent, en: { ...EMPTY, ...(c.en as object) } as ServicePageContent };
  }
  const flat = { ...EMPTY, ...c } as ServicePageContent;
  return { tr: flat, en: { ...EMPTY } };
}

interface Props {
  slug: string;
  title: string;
}

export function ServicePageEditor({ slug, title }: Props) {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', slug).single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, [slug]);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_sections').upsert({ key: slug, content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
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
        <h3 className="text-lg font-bold">{title}</h3>
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
        <Field label="Başlık satır 1"><input className={inputCls} value={c.header.title} onChange={e => update('header.title', e.target.value)} /></Field>
        <Field label="Başlık satır 2 (opsiyonel)"><input className={inputCls} value={c.header.titleSubline ?? ''} onChange={e => update('header.titleSubline', e.target.value)} /></Field>
        <Field label="Giriş paragrafı"><textarea rows={3} className={inputCls} value={c.header.intro} onChange={e => update('header.intro', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Ana Bölüm" defaultOpen={true}>
        <Field label="Bölüm başlığı"><input className={inputCls} value={c.section.title} onChange={e => update('section.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.section.desc} onChange={e => update('section.desc', e.target.value)} /></Field>
        <Field label="Madde işaretleri (her satır bir madde)"><textarea rows={4} className={inputCls} value={(c.section.bullets ?? []).join('\n')} onChange={e => update('section.bullets', e.target.value.split('\n').filter(Boolean))} /></Field>
      </CollapsibleSection>

      {(content.tr.stats?.length ?? 0) > 0 && (
        <CollapsibleSection title="İstatistik Kartları" defaultOpen={false}>
          {c.stats!.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Etiket"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.label} onChange={e => { const n = [...(c.stats!)]; n[i] = { ...n[i], label: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, stats: n } })); }} /></Field>
              <Field label="Değer"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.value} onChange={e => { const n = [...(c.stats!)]; n[i] = { ...n[i], value: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, stats: n } })); }} /></Field>
            </div>
          ))}
        </CollapsibleSection>
      )}

      {(content.tr.features?.length ?? 0) > 0 && (
        <CollapsibleSection title="Özellik Kartları" defaultOpen={false}>
          {c.features!.map((f, i) => (
            <div key={i}><Field label={`Özellik ${i + 1}`}><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={f.label} onChange={e => { const n = [...(c.features!)]; n[i] = { label: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, features: n } })); }} /></Field></div>
          ))}
        </CollapsibleSection>
      )}

      {content.tr.visualPanel && (
        <CollapsibleSection title="Görsel Panel" defaultOpen={false}>
          <Field label="Başlık"><input className={inputCls} value={c.visualPanel!.title} onChange={e => update('visualPanel.title', e.target.value)} /></Field>
          <Field label="Alt başlık"><input className={inputCls} value={c.visualPanel!.subtitle} onChange={e => update('visualPanel.subtitle', e.target.value)} /></Field>
          <ImageField label="Görsel" value={c.visualPanel!.imageUrl} onChange={v => update('visualPanel.imageUrl', v)} recommendedSize="1200×800" />
          <Field label="Alt metin"><input className={inputCls} value={c.visualPanel!.alt} onChange={e => update('visualPanel.alt', e.target.value)} /></Field>
        </CollapsibleSection>
      )}

      <CollapsibleSection title="Yan Kart (Bölge/Sektör)" defaultOpen={false}>
        <Field label="Başlık"><input className={inputCls} value={c.asideCard.title} onChange={e => update('asideCard.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.asideCard.desc} onChange={e => update('asideCard.desc', e.target.value)} /></Field>
        <Field label="Etiketler (virgülle ayırın)"><input className={inputCls} value={c.asideCard.tags?.join(', ') ?? ''} onChange={e => update('asideCard.tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="CTA Kartı" defaultOpen={false}>
        <Field label="Başlık"><input className={inputCls} value={c.ctaCard.title} onChange={e => update('ctaCard.title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea rows={2} className={inputCls} value={c.ctaCard.desc} onChange={e => update('ctaCard.desc', e.target.value)} /></Field>
        <Field label="Buton metni"><input className={inputCls} value={c.ctaCard.buttonText} onChange={e => update('ctaCard.buttonText', e.target.value)} /></Field>
      </CollapsibleSection>
    </div>
  );
}
