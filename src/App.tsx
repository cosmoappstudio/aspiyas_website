import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import DynamicPage from './pages/DynamicPage';
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ShoovoPage from './pages/Shoovo';
import SaasYazilimPage from './pages/SaasYazilim';
import MedyaProduksiyonPage from './pages/MedyaProduksiyon';
import AiMobilUygulamalarPage from './pages/AiMobilUygulamalar';
import DijitalPazarlamaPage from './pages/DijitalPazarlama';
import AgencyPage from './pages/Agency';
import AppStudioPage from './pages/AppStudio';
import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { GtmLoader } from './components/GtmLoader';
import { DocumentHead } from './components/DocumentHead';
import { LanguageProvider } from './contexts/LanguageContext';
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(!!s?.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s?.user));
    return () => subscription.unsubscribe();
  }, []);

  if (session === null) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Yükleniyor...</div>;
  if (!session) return <Navigate to="/login" />;
  return <>{children}</>;
}

function RedirectToLang() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('aspiyas_lang') : null;
  const lang = stored === 'en' ? 'en' : 'tr';
  return <Navigate to={`/${lang}`} replace />;
}

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route path="/login" element={<Login />} />
        <Route path="/yonetimofisi/*" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        {/* Lang-prefixed routes */}
        <Route path="/tr" element={<Home />} />
        <Route path="/tr/about" element={<AboutPage />} />
        <Route path="/tr/services" element={<ServicesPage />} />
        <Route path="/tr/contact" element={<ContactPage />} />
        <Route path="/tr/blog" element={<BlogList />} />
        <Route path="/tr/blog/:slug" element={<BlogPost />} />
        <Route path="/tr/shoovo" element={<ShoovoPage />} />
        <Route path="/tr/saas-yazilim" element={<SaasYazilimPage />} />
        <Route path="/tr/medya-produksiyon" element={<MedyaProduksiyonPage />} />
        <Route path="/tr/ai-mobil-uygulamalar" element={<AiMobilUygulamalarPage />} />
        <Route path="/tr/dijital-pazarlama" element={<DijitalPazarlamaPage />} />
        <Route path="/tr/asp-agency" element={<AgencyPage />} />
        <Route path="/tr/asp-app-studio" element={<AppStudioPage />} />
        <Route path="/tr/:slug" element={<DynamicPage />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/about" element={<AboutPage />} />
        <Route path="/en/services" element={<ServicesPage />} />
        <Route path="/en/contact" element={<ContactPage />} />
        <Route path="/en/blog" element={<BlogList />} />
        <Route path="/en/blog/:slug" element={<BlogPost />} />
        <Route path="/en/shoovo" element={<ShoovoPage />} />
        <Route path="/en/saas-yazilim" element={<SaasYazilimPage />} />
        <Route path="/en/medya-produksiyon" element={<MedyaProduksiyonPage />} />
        <Route path="/en/ai-mobil-uygulamalar" element={<AiMobilUygulamalarPage />} />
        <Route path="/en/dijital-pazarlama" element={<DijitalPazarlamaPage />} />
        <Route path="/en/asp-agency" element={<AgencyPage />} />
        <Route path="/en/asp-app-studio" element={<AppStudioPage />} />
        <Route path="/en/:slug" element={<DynamicPage />} />
      </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <GtmLoader />
        <DocumentHead />
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}
