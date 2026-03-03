import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { LocalizedLink } from '../LocalizedLink';
import Section from '../Section';
import { supabase } from '../../lib/supabase';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqContent {
  title: string;
  subtitle?: string;
  items: FaqItem[];
  ctaText?: string;
}

const DEFAULT_TR: FaqContent = {
  title: 'Sıkça Sorulan Sorular',
  subtitle: 'Ajans süreçlerimiz ve çalışma şeklimiz hakkında merak ettikleriniz.',
  ctaText: 'Projenizi konuşalım',
  items: [
    {
      question: 'Keşif süreci nasıl işler?',
      answer: 'İlk görüşmede hedeflerinizi, mevcut durumunuzu ve beklentilerinizi dinliyoruz. Kısa bir keşif çağrısıyla projenin kapsamını netleştirip, size özel bir yol haritası sunuyoruz.',
    },
    {
      question: 'Proje yönetimi nasıl yapılıyor?',
      answer: 'Her projede atanmış bir proje yöneticisi ile haftalık senkron toplantıları yapıyoruz. Trello, Notion veya sizin tercih ettiğiniz araçlarla ilerleme takibi sağlıyoruz.',
    },
    {
      question: 'Teslimat süreleri ne kadar?',
      answer: 'Proje türüne göre değişir. MVP ve prototipler 4–8 hafta, tam kapsamlı ürünler 3–6 ay sürebilir. Keşif sonrası net bir zaman çizelgesi sunuyoruz.',
    },
    {
      question: 'Fiyatlandırma nasıl çalışır?',
      answer: 'Proje bazlı sabit fiyat veya sprint bazlı retainer modeli sunuyoruz. Keşif görüşmesinde ihtiyacınıza uygun modeli birlikte belirliyoruz.',
    },
  ],
};

const DEFAULT_EN: FaqContent = {
  title: 'Frequently Asked Questions',
  subtitle: 'Questions about our agency processes and how we work.',
  ctaText: "Let's talk about your project",
  items: [
    {
      question: 'How does the discovery process work?',
      answer: 'In the first meeting, we listen to your goals, current situation and expectations. We clarify the project scope in a short discovery call and present a custom roadmap.',
    },
    {
      question: 'How is project management handled?',
      answer: 'Each project has an assigned project manager with weekly sync meetings. We track progress via Trello, Notion or your preferred tools.',
    },
    {
      question: 'What are the delivery timelines?',
      answer: 'Varies by project type. MVP and prototypes: 4–8 weeks, full-scale products: 3–6 months. We provide a clear timeline after discovery.',
    },
    {
      question: 'How does pricing work?',
      answer: 'We offer fixed project-based pricing or sprint-based retainer models. We determine the right model for your needs in the discovery meeting.',
    },
  ],
};

const DEFAULTS: Record<'tr' | 'en', FaqContent> = { tr: DEFAULT_TR, en: DEFAULT_EN };

export function FaqSection() {
  const lang = useLanguage();
  const [raw, setRaw] = useState<unknown>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'agency_faq').single().then(({ data }) => {
      if (data?.content) setRaw(data.content);
    });
  }, []);

  const c = (() => {
    const picked = pickLangContent<FaqContent>(raw, lang);
    if (picked && Array.isArray(picked.items) && picked.items.length > 0) return picked;
    return DEFAULTS[lang];
  })();

  return (
    <Section id="faq" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 text-purple-400 mb-6 shadow-[0_0_40px_-15px_rgba(139,92,246,0.4)]">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
            {c.title}
          </h2>
          {c.subtitle && (
            <p className="text-white/50 text-sm md:text-base">
              {c.subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-3">
          {c.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-purple-500/30 bg-[#0a0a0a] shadow-[0_0_30px_-10px_rgba(139,92,246,0.15)]'
                  : 'border-white/10 bg-[#080808] hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors relative"
              >
                {openIndex === index && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-600 rounded-l" />
                )}
                <span className="font-medium text-white text-sm md:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-white/40 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-4 md:pb-5 pt-0">
                      <p className="text-white/60 text-sm md:text-[15px] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <LocalizedLink
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-colors shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
            >
              {c.ctaText ?? 'Bize Ulaşın'}
            </LocalizedLink>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
