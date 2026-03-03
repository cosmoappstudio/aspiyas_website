import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface ServiceItem { slug: string; label: string; description: string; tags: string[] }
interface ProductItem { slug: string; label: string; description: string; tags: string[] }

interface ServicesPageContent {
  header: { tag: string; title: string; intro: string };
  services: ServiceItem[];
  productsTag: string;
  products: ProductItem[];
}

type ContentWithLang = { tr: ServicesPageContent; en: ServicesPageContent };

const EMPTY: ServicesPageContent = {
  header: { tag: 'Hizmetlerimiz', title: '', intro: '' },
  services: [],
  productsTag: 'Ürünlerimiz',
  products: [],
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
    return { tr: { ...EMPTY, ...c.tr } as ServicesPageContent, en: { ...EMPTY, ...(c.en as object) } as ServicesPageContent };
  }
  const flat = { ...EMPTY, ...c } as ServicesPageContent;
  return { tr: flat, en: { ...EMPTY } };
}

export function ServicesPageEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'services_page').single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_sections').upsert({ key: 'services_page', content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
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
        <h3 className="text-lg font-bold">Hizmetler Sayfası (/services)</h3>
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
        <Field label="Giriş paragrafı"><textarea rows={2} className={inputCls} value={c.header.intro} onChange={e => update('header.intro', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Hizmet Kartları" defaultOpen={true}>
        {(c.services ?? []).map((s, i) => (
          <div key={i} className="mb-6 p-4 bg-black/50 rounded">
            <Field label="Slug"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.slug} onChange={e => { const n = [...(c.services || [])]; n[i] = { ...n[i], slug: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, services: n } })); }} /></Field>
            <Field label="Başlık"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.label} onChange={e => { const n = [...(c.services || [])]; n[i] = { ...n[i], label: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, services: n } })); }} /></Field>
            <Field label="Açıklama"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.description} onChange={e => { const n = [...(c.services || [])]; n[i] = { ...n[i], description: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, services: n } })); }} /></Field>
            <Field label="Etiketler (virgülle ayırın)"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={s.tags?.join(', ') ?? ''} onChange={e => { const n = [...(c.services || [])]; n[i] = { ...n[i], tags: e.target.value.split(',').map(x => x.trim()).filter(Boolean) }; setContent(prev => ({ ...prev, [lang]: { ...c, services: n } })); }} /></Field>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Ürünler Bölümü" defaultOpen={false}>
        <Field label="Bölüm etiketi"><input className={inputCls} value={c.productsTag} onChange={e => update('productsTag', e.target.value)} /></Field>
        {(c.products ?? []).map((p, i) => (
          <div key={i} className="mb-6 p-4 bg-black/50 rounded">
            <Field label="Slug"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={p.slug} onChange={e => { const n = [...(c.products || [])]; n[i] = { ...n[i], slug: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, products: n } })); }} /></Field>
            <Field label="Başlık"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={p.label} onChange={e => { const n = [...(c.products || [])]; n[i] = { ...n[i], label: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, products: n } })); }} /></Field>
            <Field label="Açıklama"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={p.description} onChange={e => { const n = [...(c.products || [])]; n[i] = { ...n[i], description: e.target.value }; setContent(prev => ({ ...prev, [lang]: { ...c, products: n } })); }} /></Field>
            <Field label="Etiketler (virgülle ayırın)"><input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-sm" value={p.tags?.join(', ') ?? ''} onChange={e => { const n = [...(c.products || [])]; n[i] = { ...n[i], tags: e.target.value.split(',').map(x => x.trim()).filter(Boolean) }; setContent(prev => ({ ...prev, [lang]: { ...c, products: n } })); }} /></Field>
          </div>
        ))}
      </CollapsibleSection>
    </div>
  );
}
