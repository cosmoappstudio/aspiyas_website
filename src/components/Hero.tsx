import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { TerminalHero } from './TerminalHero';
import { LocalizedLink } from './LocalizedLink';
import { supabase } from '../lib/supabase';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';
import './TerminalHero.css';
import './Hero.css';

interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollHint: string;
}

const DEFAULT: HeroContent = {
  badge: 'Geleceği Şekillendiriyoruz',
  titleLine1: 'Aspiyas?',
  titleLine2: 'Teknoloji Odaklı Yaratıcı Çözümler',
  description: 'Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz. Markalarınızı güçlendirerek dijital dönüşümde öncü rol oynuyoruz.',
  ctaPrimary: 'Bize Ulaşın',
  ctaSecondary: 'Tanıtım Filmi',
  scrollHint: 'Kaydır',
};

export default function Hero() {
  const lang = useLanguage();
  const [content, setContent] = useState<HeroContent>(DEFAULT);

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'home').single().then(({ data }) => {
      if (data?.content) setContent(pickLangContent<HeroContent>(data.content, lang));
    });
  }, [lang]);

  const answerFormatted = content.titleLine2.includes(' ')
    ? content.titleLine2.replace(/ (.+)/, '\n$1')
    : content.titleLine2;

  return (
    <section className="terminal-hero-section">
      {/* Background - HTML design */}
      <div className="terminal-hero-section__bg" />
      <div className="terminal-hero-section__grid" />
      <div className="terminal-hero-section__glow" />

      <div className="terminal-hero-section__content">
        <TerminalHero
          query={content.titleLine1}
          answer={answerFormatted}
          barTitle="aspiyas — version 2026.07 Premium Edition"
          metaType="string"
          metaResult="typeof result === 'innovation'"
          metaBadge="V2.0.26"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="terminal-hero-section__description"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, type: 'spring', stiffness: 200, damping: 25 }}
          className="terminal-hero-section__cta"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <LocalizedLink
              to="/contact"
              className="group relative block px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {content.ctaPrimary}
                <motion.span whileHover={{ x: 4 }}><ArrowRight size={18} /></motion.span>
              </span>
            </LocalizedLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <LocalizedLink
              to="/services"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm w-full"
            >
              <motion.span
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Play size={10} fill="currentColor" />
              </motion.span>
              {content.ctaSecondary}
            </LocalizedLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        className="terminal-hero-section__scroll"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/30">{content.scrollHint}</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
