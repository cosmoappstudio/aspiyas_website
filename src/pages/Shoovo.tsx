import Layout from '../components/Layout';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { ArrowRight, CheckCircle2, ShoppingBag, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VisualPanel } from '../components/VisualPanel';

export default function ShoovoPage() {
  return (
    <Layout>
      <PageSection className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <PageHeader tag="Sosyal Alışveriş Platformu" title={<>{'Shoovo: Türkiye merkezli '}<span className="block text-white/40">yeni nesil sosyal alışveriş deneyimi</span></>} intro="Shoovo, İstanbul çıkışlı bir sosyal alışveriş platformu olarak; markaları, içerik üreticilerini ve tüketicileri tek ekosistemde buluşturur. Organik içerik akışı ile satın alma davranışını aynı yerde birleştirerek dönüşüm oranlarını artırmayı hedefler." />

          <div className="space-y-8 md:space-y-10">
            <section aria-labelledby="shoop-benefits-heading" className="space-y-4 md:space-y-5">
              <h2
                id="shoop-benefits-heading"
                className="text-xl md:text-2xl font-display font-semibold mb-1 md:mb-2"
              >
                Markalar için Shoovo
              </h2>
              <p className="text-sm md:text-base text-white/65">
                Türkiye ve EMEA pazarına odaklanan Shoovo; ürün keşfi, içerik etkileşimi ve satın
                alma aksiyonunu tek funnel üzerinde toplar. Böylece medya harcamalarından alınan
                geri dönüş daha net ölçümlenebilir.
              </p>
              <ul className="space-y-3 mt-3">
                {[
                  'İçerik üzerinden direkt ürün sayfasına yönlendirme',
                  'Influencer ve marka işbirlikleri için performans odaklı altyapı',
                  'Detaylı panel ile şehir, kampanya ve cihaz bazlı raporlama',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-[15px] text-white/75">
                    <CheckCircle2 className="mt-[2px] text-purple-400" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="users-heading" className="space-y-4 md:space-y-5">
              <h2
                id="users-heading"
                className="text-xl md:text-2xl font-display font-semibold mb-1 md:mb-2"
              >
                Kullanıcılar için deneyim
              </h2>
              <p className="text-sm md:text-base text-white/65">
                Shoovo, Türkiye’deki kullanıcıların sosyal medya deneyimini bozmadan alışveriş
                yapabilmesini hedefler. Keşfet sekmesi; ilgi alanı, şehir ve alışveriş alışkanlıkları
                ile kişiselleştirilir.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {[
                  { icon: ShoppingBag, label: 'Tek dokunuşla ürün keşfi' },
                  { icon: Users, label: 'Güvenilir içerik üreticileri' },
                  { icon: Sparkles, label: 'Kişiselleştirilmiş akış' },
                  { icon: CheckCircle2, label: 'Güvenli ödeme altyapısı (yakında)' },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full bg-white/5 border border-white/5 px-3 py-2 text-xs md:text-sm text-white/80"
                  >
                    <Icon size={16} className="text-purple-300" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-8 md:gap-10">
              <VisualPanel
                title="Shoovo arayüz tasarımı"
                subtitle="Yeni nesil sosyal alışveriş deneyimi için tasarlanan mobil ve web arayüzünden bir önizleme."
                imageUrl="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
                alt="Sosyal alışveriş uygulaması kullanıcı arayüzü"
              />

              <aside className="space-y-5 md:space-y-6">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF4D00]/20 via-black to-black p-5 md:p-6">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
                    Pilot başvurusu
                  </p>
                  <p className="text-sm md:text-[15px] text-white/80 mb-4">
                    Shoovo’yu ilk deneyimleyen markalardan biri olmak için pazarlama veya e-ticaret
                    ekibinizle kısa bir keşif görüşmesi planlayabiliriz.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-all"
                  >
                    Görüşme talep et
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#050505]/60 p-5 md:p-6">
                  <h3 className="text-sm font-semibold text-white mb-2">Hedef pazarlar</h3>
                  <p className="text-xs text-white/60 mb-3">
                    Öncelikli olarak İstanbul merkezli markalar ve Türkiye geneli e-ticaret şirketleri.
                  </p>
                  <ul className="flex flex-wrap gap-2 text-[11px] text-white/75">
                    {['İstanbul', 'Ankara', 'İzmir', 'Türkiye Geneli', 'Orta Doğu (ikinci faz)'].map(
                      (city) => (
                        <li
                          key={city}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        >
                          {city}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </PageSection>
    </Layout>
  );
}

