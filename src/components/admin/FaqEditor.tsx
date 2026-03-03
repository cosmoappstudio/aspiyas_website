import { useState, useEffect } from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CollapsibleSection } from './CollapsibleSection';

type Lang = 'tr' | 'en';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqLangContent {
  title: string;
  subtitle: string;
  ctaText: string;
  items: FaqItem[];
}

type ContentWithLang = { tr: FaqLangContent; en: FaqLangContent };

const DEFAULT_ITEM: FaqItem = { question: '', answer: '' };

const DEFAULT_TR: FaqLangContent = {
  title: 'Sıkça Sorulan Sorular',
  subtitle: 'Ajans süreçlerimiz ve çalışma şeklimiz hakkında merak ettikleriniz.',
  ctaText: 'Projenizi konuşalım',
  items: [],
};

const DEFAULT_EN: FaqLangContent = {
  title: 'Frequently Asked Questions',
  subtitle: 'Questions about our agency processes and how we work.',
  ctaText: "Let's talk about your project",
  items: [],
};

function normalizeContent(raw: unknown): ContentWithLang {
  const c = raw as Record<string, unknown>;
  if (c?.tr && typeof c.tr === 'object') {
    const tr = c.tr as Record<string, unknown>;
    const en = (c.en && typeof c.en === 'object') ? c.en as Record<string, unknown> : {};
    return {
      tr: {
        title: (tr.title as string) ?? DEFAULT_TR.title,
        subtitle: (tr.subtitle as string) ?? DEFAULT_TR.subtitle,
        ctaText: (tr.ctaText as string) ?? DEFAULT_TR.ctaText,
        items: Array.isArray(tr.items) ? tr.items as FaqItem[] : [],
      },
      en: {
        title: (en.title as string) ?? DEFAULT_EN.title,
        subtitle: (en.subtitle as string) ?? DEFAULT_EN.subtitle,
        ctaText: (en.ctaText as string) ?? DEFAULT_EN.ctaText,
        items: Array.isArray(en.items) ? en.items as FaqItem[] : [],
      },
    };
  }
  return { tr: { ...DEFAULT_TR }, en: { ...DEFAULT_EN } };
}

const inputCls = 'w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm';

export function FaqEditor() {
  const [content, setContent] = useState<ContentWithLang>({ tr: { ...DEFAULT_TR }, en: { ...DEFAULT_EN } });
  const [lang, setLang] = useState<Lang>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await supabase.from('site_sections').select('content').eq('key', 'agency_faq').single();
        if (data?.content) setContent(normalizeContent(data.content));
      } catch {
        setContent({ tr: { ...DEFAULT_TR }, en: { ...DEFAULT_EN } });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from('site_sections').upsert(
      { key: 'agency_faq', content: content, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
    if (err) setError(err.message);
    setSaving(false);
  };

  const c = content[lang];
  const items = c.items;

  const updateMeta = (field: keyof FaqLangContent, value: string) => {
    setContent(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const updateItem = (i: number, field: keyof FaqItem, value: string) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[lang].items[i] = { ...next[lang].items[i], [field]: value };
      return next;
    });
  };

  const addItem = () => {
    setContent(prev => ({
      ...prev,
      [lang]: { ...prev[lang], items: [...prev[lang].items, { ...DEFAULT_ITEM }] },
    }));
  };

  const removeItem = (i: number) => {
    setContent(prev => ({
      ...prev,
      [lang]: { ...prev[lang], items: prev[lang].items.filter((_, idx) => idx !== i) },
    }));
  };

  if (loading) return <p className="text-white/50">Yükleniyor...</p>;

  return (
    <CollapsibleSection title="Sıkça Sorulan Sorular (SSS)" defaultOpen={true}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {(['tr', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-4 py-2 text-sm font-medium ${lang === l ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              {l === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs text-white/50 mb-1">Başlık</label>
          <input
            value={c.title}
            onChange={e => updateMeta('title', e.target.value)}
            placeholder="Sıkça Sorulan Sorular"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1">Alt başlık</label>
          <input
            value={c.subtitle}
            onChange={e => updateMeta('subtitle', e.target.value)}
            placeholder="Ajans süreçlerimiz hakkında..."
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1">CTA buton metni</label>
          <input
            value={c.ctaText}
            onChange={e => updateMeta('ctaText', e.target.value)}
            placeholder="Projenizi konuşalım"
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} className="text-purple-400" />
        <h4 className="font-medium">Soru-Cevap Maddeleri</h4>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-black/50 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">Madde {i + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                disabled={items.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Soru</label>
              <input
                value={item.question}
                onChange={e => updateItem(i, 'question', e.target.value)}
                placeholder="Örn: Keşif süreci nasıl işler?"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Cevap</label>
              <textarea
                value={item.answer}
                onChange={e => updateItem(i, 'answer', e.target.value)}
                placeholder="Cevap metni..."
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="flex gap-2 items-center mt-4 px-3 py-2 bg-white/10 hover:bg-white/5 rounded text-sm"
      >
        <Plus size={16} /> Soru Ekle
      </button>
    </CollapsibleSection>
  );
}
