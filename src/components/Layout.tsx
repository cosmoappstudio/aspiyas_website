import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LocalizedLink } from './LocalizedLink';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';
import { useLanguageContext } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { supabase } from '../lib/supabase';

interface LayoutStrings {
  navHome: string;
  navAbout: string;
  navServices: string;
  navBlog: string;
  navContact: string;
  ctaContact: string;
  footerDiscover: string;
  footerContact: string;
  footerPrivacy: string;
  footerTerms: string;
}

const DEFAULT_LAYOUT: Record<'tr' | 'en', LayoutStrings> = {
  tr: { navHome: 'Ana Sayfa', navAbout: 'Hakkımızda', navServices: 'Hizmetlerimiz', navBlog: 'Blog', navContact: 'İletişim', ctaContact: 'Bize Ulaşın', footerDiscover: 'Keşfet', footerContact: 'İletişim', footerPrivacy: 'Gizlilik', footerTerms: 'Kullanım Şartları' },
  en: { navHome: 'Home', navAbout: 'About', navServices: 'Services', navBlog: 'Blog', navContact: 'Contact', ctaContact: 'Contact Us', footerDiscover: 'Discover', footerContact: 'Contact', footerPrivacy: 'Privacy', footerTerms: 'Terms of Use' },
};

function getFooterDescription(raw: string, lang: 'tr' | 'en'): string {
  try {
    const parsed = JSON.parse(raw) as { tr?: string; en?: string };
    if (parsed && (parsed.tr != null || parsed.en != null)) {
      return (pickLangContent(parsed, lang) as string) || '';
    }
  } catch { /* ignore */ }
  return raw || '';
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { settings } = useSiteSettings();
  const lang = useLanguage();
  const [layoutStrings, setLayoutStrings] = useState<LayoutStrings>(DEFAULT_LAYOUT[lang]);
  const footerDescription = getFooterDescription(settings.footer_description, lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLayoutStrings(DEFAULT_LAYOUT[lang]);
    supabase.from('site_sections').select('content').eq('key', 'layout').single().then(({ data }) => {
      if (data?.content) setLayoutStrings(pickLangContent<LayoutStrings>(data.content, lang));
    });
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <LocalizedLink to="/" className="group flex items-center gap-2">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Aspiyas" className="h-10 w-auto object-contain" />
            ) : (
              <>
                <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-display font-bold text-xl text-white relative z-10">A</span>
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Aspiyas<span className="text-purple-500">.</span>
                </span>
              </>
            )}
          </LocalizedLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            <NavLink to="/">{layoutStrings.navHome}</NavLink>
            <NavLink to="/about">{layoutStrings.navAbout}</NavLink>
            <NavLink to="/services">{layoutStrings.navServices}</NavLink>
            <NavLink to="/blog">{layoutStrings.navBlog}</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <LocalizedLink
              to="/contact"
              className="group relative px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                {layoutStrings.ctaContact} <ArrowRight size={14} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </LocalizedLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="mb-4">
                <LanguageSwitcher />
              </div>
              <MobileNavLink to="/">{layoutStrings.navHome}</MobileNavLink>
              <MobileNavLink to="/about">{layoutStrings.navAbout}</MobileNavLink>
              <MobileNavLink to="/services">{layoutStrings.navServices}</MobileNavLink>
              <MobileNavLink to="/blog">{layoutStrings.navBlog}</MobileNavLink>
              <MobileNavLink to="/contact">{layoutStrings.navContact}</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
        {/* Footer Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5">
              <LocalizedLink to="/" className="block mb-6">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Aspiyas" className="h-10 w-auto object-contain" />
                ) : (
                  <span className="text-3xl font-display font-bold tracking-tighter text-white">
                    Aspiyas<span className="text-purple-500">.</span>
                  </span>
                )}
              </LocalizedLink>
              <p className="text-white/40 max-w-md text-lg font-light leading-relaxed mb-8">
                {footerDescription}
              </p>
              <div className="flex gap-4">
                {settings.social_instagram && <SocialLink href={settings.social_instagram} label="Instagram" icon={<Instagram size={18} />} />}
                {settings.social_linkedin && <SocialLink href={settings.social_linkedin} label="LinkedIn" icon={<Linkedin size={18} />} />}
                {settings.social_twitter && <SocialLink href={settings.social_twitter} label="Twitter" icon={<Twitter size={18} />} />}
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-white font-medium mb-6 font-display">{layoutStrings.footerDiscover}</h4>
              <ul className="space-y-4 text-white/40">
                <li><LocalizedLink to="/" className="hover:text-white transition-colors">{layoutStrings.navHome}</LocalizedLink></li>
                <li><LocalizedLink to="/about" className="hover:text-white transition-colors">{layoutStrings.navAbout}</LocalizedLink></li>
                <li><LocalizedLink to="/services" className="hover:text-white transition-colors">{layoutStrings.navServices}</LocalizedLink></li>
                <li><LocalizedLink to="/blog" className="hover:text-white transition-colors">{layoutStrings.navBlog}</LocalizedLink></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-medium mb-6 font-display">{layoutStrings.footerContact}</h4>
              <ul className="space-y-4 text-white/40">
                <li><a href={`mailto:${settings.contact_email}`} className="hover:text-white">{settings.contact_email}</a></li>
                <li>{settings.contact_phone}</li>
                <li>{settings.contact_address}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-white/20 text-sm">
            <p>&copy; {new Date().getFullYear()} Aspiyas Teknoloji A.Ş.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <LocalizedLink to="/privacy" className="hover:text-white transition-colors">{layoutStrings.footerPrivacy}</LocalizedLink>
              <LocalizedLink to="/terms" className="hover:text-white transition-colors">{layoutStrings.footerTerms}</LocalizedLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const { pathWithLang } = useLanguageContext();
  const fullTo = pathWithLang(to);
  const isActive = location.pathname === fullTo;
  
  return (
    <LocalizedLink 
      to={to} 
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-white/10 text-white shadow-lg shadow-purple-500/10' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </LocalizedLink>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <LocalizedLink 
      to={to} 
      className="block p-4 text-2xl font-display font-light text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
    >
      {children}
    </LocalizedLink>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {icon ?? <div className="w-4 h-4 bg-current rounded-sm" />}
    </a>
  );
}
