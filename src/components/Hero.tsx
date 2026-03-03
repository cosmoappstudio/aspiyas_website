import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]"
          >
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/90">Geleceği Şekillendiriyoruz</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 pb-2">
              Teknoloji Odaklı
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 pb-4">
              Yaratıcı Çözümler
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz. 
            Markalarınızı güçlendirerek dijital dönüşümde öncü rol oynuyoruz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Bize Ulaşın
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/services"
              className="group px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play size={10} fill="currentColor" />
              </span>
              Tanıtım Filmi
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/30">Kaydır</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </motion.div>
    </section>
  );
}
