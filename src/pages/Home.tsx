import React from 'react';
import { motion } from 'motion/react';
import { Zap, Users, TrendingUp, DollarSign, Heart, Leaf, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';

const values = [
  { icon: Zap, title: "Hız", desc: "En hızlı çözümlerle rakiplerinizin önüne geçin.", col: "md:col-span-1" },
  { icon: Users, title: "Güçlü Ortaklıklar", desc: "Sektör liderleriyle stratejik işbirlikleri.", col: "md:col-span-1" },
  { icon: TrendingUp, title: "Ölçeklenebilirlik", desc: "Büyüyen işinizle birlikte genişleyen altyapı.", col: "md:col-span-2" },
  { icon: DollarSign, title: "Karlılık", desc: "Yatırım getirisini maksimize eden stratejiler.", col: "md:col-span-1" },
  { icon: Heart, title: "Sosyal Fayda", desc: "Topluma değer katan projeler.", col: "md:col-span-1" },
  { icon: Leaf, title: "Sürdürülebilirlik", desc: "Gelecek nesiller için çevre dostu teknolojiler.", col: "md:col-span-2" },
];

const services = [
  {
    tag: "SaaS",
    title: "SaaS Yazılım Projeleri",
    desc: "B2B odaklı, faydalı micro-macro SaaS yazılım projeleri üretiyoruz.",
    features: ["Bulut Tabanlı", "Yüksek Güvenlik", "API Entegrasyonu"]
  },
  {
    tag: "Medya & Prodüksiyon",
    title: "Medya ve Prodüksiyon",
    desc: "Dinamik İçerik Optimizasyonu, Tasarım ve Prodüksiyon odaklı projeler.",
    features: ["4K Video", "Motion Graphics", "Ses Tasarımı"]
  },
  {
    tag: "Mobil Uygulama",
    title: "AI Destekli Mobil Apps",
    desc: "Farklı gelir modelleri içeren yapay zeka destekli üretkenlik uygulamaları.",
    features: ["iOS & Android", "Machine Learning", "User Experience"]
  },
  {
    tag: "Reklam & Pazarlama",
    title: "Dijital Pazarlama",
    desc: "Veri bilimi odaklı performans pazarlama ve programatik reklam.",
    features: ["SEO/SEM", "Veri Analizi", "Dönüşüm Odaklı"]
  },
];

const founders = [
  {
    name: "Fetih Önal",
    role: "Kurucu Ortak - CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", 
  },
  {
    name: "Göktürk Ülker",
    role: "Kurucu Ortak - CMO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop", 
  },
  {
    name: "Feyza Nur Acar",
    role: "Kurucu Ortak - CDO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop", 
  },
];

export default function Home() {
  return (
    <Layout>
      <Hero />

      {/* Values Section - Bento Grid */}
      <Section className="bg-[#050505]">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            Değerlerimiz
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Teknoloji Odaklı Yaratıcı<br />
            <span className="text-white/40">Sürdürülebilir Büyüme</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${item.col} p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight className="text-white/20" />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-24 relative z-10">
          <span className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Neler Yapıyoruz?</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Yenilikçi Teknolojiler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative z-10">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-10 hover:border-purple-500/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-white/80">
                    {service.tag}
                  </span>
                  <ArrowUpRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed mb-8 text-lg">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle2 size={14} className="text-purple-500/50" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Founders Section */}
      <Section className="bg-[#050505]">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Liderlik Ekibi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-8 overflow-hidden rounded-3xl aspect-[3/4] mx-auto w-full bg-zinc-900">
                <div className="absolute inset-0 bg-zinc-800 animate-pulse" /> {/* Placeholder loading state */}
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-10 h-10 mx-auto bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">{founder.name}</h3>
              <p className="text-purple-400 text-sm font-medium tracking-wide uppercase">{founder.role}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Product Section (Shoovo) */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#FF4D00] to-[#FF0000] p-12 md:p-32 text-center relative overflow-hidden group">
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            
            {/* Animated Circles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-sm font-bold mb-10 text-white tracking-wide">
                YENİ ÜRÜNÜMÜZ
              </span>
              <h2 className="text-7xl md:text-9xl font-display font-black mb-10 tracking-tighter text-white drop-shadow-lg">
                Shoovo
              </h2>
              <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16 font-light leading-relaxed">
                Markaları, içerik üreticileri ve tüketicileri tek bir alanda birleştiren <span className="font-bold">yeni nesil</span> sosyal alışveriş platformu.
              </p>
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                Keşfetmeye Başla
              </button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
