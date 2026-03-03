import { useState, useEffect } from 'react';
import { LocalizedLink } from '../LocalizedLink';
import Section from '../Section';
import { ArrowRight, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

interface ContactCtaContent {
  title: string;
  desc: string;
  button: string;
}

const DEFAULT: ContactCtaContent = { title: 'Projenizi konuşalım', desc: 'Hedefiniz ürün, içerik mi yoksa büyüme stratejisi mi? Kısa bir keşif görüşmesiyle en doğru yolu birlikte netleştirebiliriz.', button: 'Bize Ulaşın' };

export function ContactCtaSection() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'contact_cta').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
    });
  }, []);
  const c = pickLangContent<ContactCtaContent>(raw, lang) ?? DEFAULT;

  return (
    <Section id="contact-cta" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/15 via-[#050505] to-[#050505] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                {c.title}
              </h2>
              <p className="text-sm md:text-base text-white/60">
                {c.desc}
              </p>
            </div>
          </div>
          <LocalizedLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all shrink-0"
          >
            {c.button}
            <ArrowRight size={16} />
          </LocalizedLink>
        </div>
      </div>
    </Section>
  );
}
