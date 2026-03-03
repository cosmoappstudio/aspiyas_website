import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { Seo } from '../components/Seo';
import { Mail, MapPin, Phone, ArrowRight, Send } from 'lucide-react';
import { VisualPanel } from '../components/VisualPanel';
import { supabase } from '../lib/supabase';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useLanguage, pickLangContent } from '../hooks/useLanguage';

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

const DEFAULT: ContactContent = {
  badge: 'İletişim',
  title: 'Projenizi konuşalım',
  description: 'İstanbul merkezli ekibimizle Türkiye ve global pazarlarda ürün, içerik ve büyüme süreçleri tasarlıyoruz.',
  formTitle: 'Bize yazın',
  formLabelName: 'Adınız Soyadınız',
  formLabelEmail: 'E-posta',
  formLabelPhone: 'Telefon (opsiyonel)',
  formLabelSubject: 'Konu (opsiyonel)',
  formLabelMessage: 'Mesajınız',
  formSubmit: 'Gönder',
  formSending: 'Gönderiliyor...',
  formSuccess: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.',
  formError: 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.',
  contactInfoTitle: 'İletişim bilgileri',
  discoveryCardTitle: 'Hızlı keşif çağrısı',
  discoveryCardDesc: '20 dakikalık bir görüşmede; hedeflerinizi, zaman planınızı ve bütçe yaklaşımınızı netleştirip size uygun bir yol haritası çıkarabiliriz.',
  discoveryCardButton: 'Mail at',
  visualPanelTitle: 'İstanbul ofis',
  visualPanelSubtitle: 'Maslak merkezli operasyon; Türkiye ve EMEA pazarlarına hızlı erişim.',
};

export default function ContactPage() {
  const { settings } = useSiteSettings();
  const lang = useLanguage();
  const [content, setContent] = useState<ContactContent>(DEFAULT);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'contact').single().then(({ data }) => {
      if (data?.content) setContent(pickLangContent<ContactContent>(data.content, lang));
    });
  }, [lang]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <Seo
        title="İletişim | Aspiyas Teknoloji ve Ticaret A.Ş."
        description="Aspiyas ile iletişime geçin. İstanbul merkezli teknoloji holdingi: SaaS, medya & prodüksiyon, AI mobil uygulamalar ve dijital pazarlama."
        canonicalPath="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'İletişim',
          url: `${typeof window !== 'undefined' ? window.location.origin : ''}/contact`,
          about: { '@type': 'Organization', name: 'Aspiyas Teknoloji ve Ticaret A.Ş.' },
        }}
      />

      <PageSection className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <PageHeader tag={content.badge} title={content.title} intro={content.description} />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-8 md:gap-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 25 }}
          >
            <div className="space-y-5 md:space-y-6">
              <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4">
                <h2 className="text-xl md:text-2xl font-display font-semibold mb-4">
                  {content.formTitle}
                </h2>
                <input
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                  placeholder={content.formLabelName}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                  placeholder={content.formLabelEmail}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                  placeholder={content.formLabelPhone}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40"
                  placeholder={content.formLabelSubject}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
                <textarea
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 resize-none"
                  placeholder={content.formLabelMessage}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-3 font-semibold hover:bg-gray-200 disabled:opacity-50 transition-all"
                >
                  {status === 'sending' ? content.formSending : content.formSubmit}
                  <Send size={16} />
                </button>
                {status === 'success' && <p className="text-green-400 text-sm">{content.formSuccess}</p>}
                {status === 'error' && <p className="text-red-400 text-sm">{content.formError}</p>}
              </form>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-display font-semibold mb-4">
                  {content.contactInfoTitle}
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm md:text-base text-white/75">
                    <Mail size={18} className="mt-[2px] text-purple-300" />
                    <a href={`mailto:${settings.contact_email}`} className="hover:text-white">{settings.contact_email}</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm md:text-base text-white/75">
                    <Phone size={18} className="mt-[2px] text-purple-300" />
                    <span>{settings.contact_phone}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm md:text-base text-white/75">
                    <MapPin size={18} className="mt-[2px] text-purple-300" />
                    <span>{settings.contact_address}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-black to-black p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-display font-semibold mb-3">
                  {content.discoveryCardTitle}
                </h2>
                <p className="text-sm md:text-base text-white/70 mb-5">
                  {content.discoveryCardDesc}
                </p>
                <a
                  href={`mailto:${settings.contact_email}?subject=Aspiyas%20-%20Ke%C5%9Fif%20G%C3%B6r%C3%BC%C5%9Fmesi`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all"
                >
                  {content.discoveryCardButton}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6">
              <VisualPanel
                title={content.visualPanelTitle}
                subtitle={content.visualPanelSubtitle}
                imageUrl="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1200&auto=format&fit=crop"
                alt="İstanbul şehir manzarası"
              />
            </div>
          </motion.div>
        </div>
      </PageSection>
    </Layout>
  );
}

