import { useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface ContactContent {
  badge: string;
  title: string;
  description: string;
  formTitle: string;
  formLabelName: string;
  formLabelEmail: string;
  formLabelPhone: string;
  formLabelSubject: string;
  formLabelMessage: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  contactInfoTitle: string;
  discoveryCardTitle: string;
  discoveryCardDesc: string;
  discoveryCardButton: string;
  visualPanelTitle: string;
  visualPanelSubtitle: string;
}

type ContentWithLang = { tr: ContactContent; en: ContactContent };

const EMPTY: ContactContent = {
  badge: '',
  title: '',
  description: '',
  formTitle: '',
  formLabelName: '',
  formLabelEmail: '',
  formLabelPhone: '',
  formLabelSubject: '',
  formLabelMessage: '',
  formSubmit: '',
  formSending: '',
  formSuccess: '',
  formError: '',
  contactInfoTitle: '',
  discoveryCardTitle: '',
  discoveryCardDesc: '',
  discoveryCardButton: '',
  visualPanelTitle: '',
  visualPanelSubtitle: '',
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
    return { tr: { ...EMPTY, ...c.tr } as ContactContent, en: { ...EMPTY, ...(c.en as object) } as ContactContent };
  }
  const flat = { ...EMPTY, ...c } as ContactContent;
  return { tr: flat, en: { ...EMPTY } };
}

export function ContactPageEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...EMPTY }, en: { ...EMPTY } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'contact').single().then(({ data }) => {
      if (data?.content) setContent(normalizeContent(data.content));
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_sections').upsert({ key: 'contact', content: content, updated_at: new Date().toISOString() }, { onConflict: 'key' });
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
        <h3 className="text-lg font-bold">İletişim Sayfası</h3>
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

      <CollapsibleSection title="Başlık Alanı" defaultOpen={true}>
        <Field label="Badge"><input className={inputCls} value={c.badge} onChange={e => update('badge', e.target.value)} /></Field>
        <Field label="Sayfa başlığı"><input className={inputCls} value={c.title} onChange={e => update('title', e.target.value)} /></Field>
        <Field label="Açıklama"><textarea className={inputCls} rows={3} value={c.description} onChange={e => update('description', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Form" defaultOpen={true}>
        <Field label="Form başlığı"><input className={inputCls} value={c.formTitle} onChange={e => update('formTitle', e.target.value)} /></Field>
        <Field label="Ad alanı etiketi"><input className={inputCls} value={c.formLabelName} onChange={e => update('formLabelName', e.target.value)} /></Field>
        <Field label="E-posta etiketi"><input className={inputCls} value={c.formLabelEmail} onChange={e => update('formLabelEmail', e.target.value)} /></Field>
        <Field label="Telefon etiketi"><input className={inputCls} value={c.formLabelPhone} onChange={e => update('formLabelPhone', e.target.value)} /></Field>
        <Field label="Konu etiketi"><input className={inputCls} value={c.formLabelSubject} onChange={e => update('formLabelSubject', e.target.value)} /></Field>
        <Field label="Mesaj etiketi"><input className={inputCls} value={c.formLabelMessage} onChange={e => update('formLabelMessage', e.target.value)} /></Field>
        <Field label="Gönder butonu"><input className={inputCls} value={c.formSubmit} onChange={e => update('formSubmit', e.target.value)} /></Field>
        <Field label="Gönderiliyor metni"><input className={inputCls} value={c.formSending} onChange={e => update('formSending', e.target.value)} /></Field>
        <Field label="Başarı mesajı"><input className={inputCls} value={c.formSuccess} onChange={e => update('formSuccess', e.target.value)} /></Field>
        <Field label="Hata mesajı"><input className={inputCls} value={c.formError} onChange={e => update('formError', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="İletişim Bilgileri & Keşif Kartı" defaultOpen={true}>
        <Field label="İletişim bilgileri başlığı"><input className={inputCls} value={c.contactInfoTitle} onChange={e => update('contactInfoTitle', e.target.value)} /></Field>
        <Field label="Keşif kartı başlığı"><input className={inputCls} value={c.discoveryCardTitle} onChange={e => update('discoveryCardTitle', e.target.value)} /></Field>
        <Field label="Keşif kartı açıklama"><textarea className={inputCls} rows={2} value={c.discoveryCardDesc} onChange={e => update('discoveryCardDesc', e.target.value)} /></Field>
        <Field label="Keşif kartı buton"><input className={inputCls} value={c.discoveryCardButton} onChange={e => update('discoveryCardButton', e.target.value)} /></Field>
      </CollapsibleSection>

      <CollapsibleSection title="Görsel Panel" defaultOpen={false}>
        <Field label="Panel başlığı"><input className={inputCls} value={c.visualPanelTitle} onChange={e => update('visualPanelTitle', e.target.value)} /></Field>
        <Field label="Panel alt başlığı"><input className={inputCls} value={c.visualPanelSubtitle} onChange={e => update('visualPanelSubtitle', e.target.value)} /></Field>
      </CollapsibleSection>
    </div>
  );
}
