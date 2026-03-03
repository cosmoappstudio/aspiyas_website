import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-display font-bold text-xl text-white relative z-10">A</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Aspiyas<span className="text-purple-500">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            <NavLink to="/">Ana Sayfa</NavLink>
            <NavLink to="/about">Hakkımızda</NavLink>
            <NavLink to="/services">Ürünlerimiz</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2.5 hover:bg-white/5 rounded-full transition-colors border border-transparent hover:border-white/10 text-white/70 hover:text-white">
              <Globe size={18} />
            </button>
            <Link
              to="/contact"
              className="group relative px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                Bize Ulaşın <ArrowRight size={14} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
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
              <MobileNavLink to="/">Ana Sayfa</MobileNavLink>
              <MobileNavLink to="/about">Hakkımızda</MobileNavLink>
              <MobileNavLink to="/services">Ürünlerimiz</MobileNavLink>
              <MobileNavLink to="/blog">Blog</MobileNavLink>
              <MobileNavLink to="/contact">İletişim</MobileNavLink>
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
              <Link to="/" className="text-3xl font-display font-bold tracking-tighter mb-6 block text-white">
                Aspiyas<span className="text-purple-500">.</span>
              </Link>
              <p className="text-white/40 max-w-md text-lg font-light leading-relaxed mb-8">
                Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz.
                Geleceği bugünden şekillendiriyoruz.
              </p>
              <div className="flex gap-4">
                <SocialLink href="#" label="Instagram" />
                <SocialLink href="#" label="LinkedIn" />
                <SocialLink href="#" label="Twitter" />
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-white font-medium mb-6 font-display">Keşfet</h4>
              <ul className="space-y-4 text-white/40">
                <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Ürünlerimiz</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-medium mb-6 font-display">İletişim</h4>
              <ul className="space-y-4 text-white/40">
                <li>info@aspiyas.com</li>
                <li>+90 212 000 00 00</li>
                <li>Maslak, İstanbul</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-white/20 text-sm">
            <p>&copy; {new Date().getFullYear()} Aspiyas Teknoloji A.Ş.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Gizlilik</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Kullanım Şartları</Link>
              <Link to="/login" className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-white/10 text-white shadow-lg shadow-purple-500/10' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="block p-4 text-2xl font-display font-light text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <div className="w-4 h-4 bg-current rounded-sm" /> 
    </a>
  );
}
