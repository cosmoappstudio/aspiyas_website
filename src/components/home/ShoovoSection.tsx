import Section from '../Section';

export function ShoovoSection() {
  return (
    <Section id="shoovo">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2.4rem] md:rounded-[3rem] bg-gradient-to-br from-[#FF4D00] to-[#FF0000] p-8 md:p-12 lg:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[420px] md:w-[600px] h-[420px] md:h-[600px] bg-white/10 rounded-full blur-[90px] group-hover:scale-110 transition-transform duration-1000" />
          </div>

          <div className="relative z-10">
            <span className="inline-block px-4 md:px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-[11px] md:text-sm font-bold mb-6 md:mb-10 text-white tracking-wide">
              YENİ ÜRÜNÜMÜZ
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 md:mb-10 tracking-tighter text-white drop-shadow-lg">
              Shoovo
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl md:max-w-4xl mx-auto mb-8 md:mb-16 font-light leading-relaxed">
              Markaları, içerik üreticileri ve tüketicileri tek bir alanda birleştiren{' '}
              <span className="font-semibold">yeni nesil</span> sosyal alışveriş platformu.
            </p>
            <button className="px-8 md:px-10 py-3.5 md:py-5 bg-white text-black rounded-full font-semibold md:font-bold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Keşfetmeye Başla
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

