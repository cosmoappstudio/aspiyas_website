import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollHint: string;
}

type ContentWithLang = { tr: HeroContent; en: HeroContent };

const EMPTY: HeroContent = {
  badge: '',
  titleLine1: '',
  titleLine2: '',
  description: '',
  ctaPrimary: '',
  ctaSecondary: '',
  scrollHint: '',
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
    return { tr: { ...EMPTY, ...c.tr } as HeroContent, en: { ...EMPTY, ...(c.en as object) } as HeroContent };
  }
  const flat = { ...EMPTY, ...c } as HeroContent;
  return { tr: flat, en: { ...EMPTY } };
}

export function HeroEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'home').single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_sections').upsert({ key: 'home', content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
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
        o = o[k] as Record<string, unknown>;
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
        <h3 className="text-lg font-bold">Ana Sayfa Hero</h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {(['tr', 'en'] as const).map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} className={`px-4 py-2 text-sm font-medium ${lang === l ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>
                {l === 'tr' ? 'Türkçe' : 'English'}
              </button>
            ))}
          </div>
          <button onClick={save} disabled={saving} className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      <CollapsibleSection title="Badge & Başlık" defaultOpen={true}>
        <Field label="Badge metni"><input className={inputCls} value={c.badge} onChange={e => update('badge', e.target.value)} /></Field>
        <Field label="Başlık satır 1"><input className={inputCls} value={c.titleLine1} onChange={e => update('titleLine1', e.target.value)} /></Field>
        <Field label="Başlık satır 2"><input className={inputCls} value={c.titleLine2} onChange={e => update('titleLine2', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Açıklama" defaultOpen={true}>
        <Field label="Alt başlık / açıklama"><textarea className={inputCls} rows={3} value={c.description} onChange={e => update('description', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Butonlar" defaultOpen={true}>
        <Field label="Birincil buton (İletişim)"><input className={inputCls} value={c.ctaPrimary} onChange={e => update('ctaPrimary', e.target.value)} /></Field>
        <Field label="İkincil buton (Tanıtım)"><input className={inputCls} value={c.ctaSecondary} onChange={e => update('ctaSecondary', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Diğer" defaultOpen={false}>
        <Field label="Kaydır ipucu"><input className={inputCls} value={c.scrollHint} onChange={e => update('scrollHint', e.target.value)} /></Field>
      </CollapsibleSection>
    </div>
  );
}
