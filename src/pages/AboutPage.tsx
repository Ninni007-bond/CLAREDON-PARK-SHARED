import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/shorewood-logo.png";

const AboutPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="relative w-full overflow-hidden h-[70vh] md:h-[85vh]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/about-hero.mp4"
          />
        </section>

        <section className="bg-background">
          <div className="container-main text-center py-24 md:py-36">
            <p className="eyebrow text-foreground/50 mb-8 text-[10px] sm:text-[11px]">About Us</p>
            <img
              src={logo}
              alt="Shorewood Homes"
              className="h-9 sm:h-12 w-auto mx-auto mb-10"
              style={{ filter: "brightness(0) saturate(100%) invert(13%) sepia(63%) saturate(2480%) hue-rotate(180deg) brightness(94%) contrast(101%)" }}
            />
            <div className="w-10 h-px bg-foreground/20 mx-auto mb-10" />
            <p className="font-body font-light text-foreground/70 max-w-md mx-auto text-sm md:text-base leading-[1.9] tracking-wide">
              Built for Living, Valued for Life
            </p>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28 border-t border-foreground/5">
          <div className="container-main max-w-3xl text-center">
            <div className="mb-12">
              <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">Our Story</p>
              <h2 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-foreground mb-6">
                Crafting Exceptional Homes
              </h2>
              <div className="w-10 h-px bg-foreground/20 mx-auto" />
            </div>

            <div className="space-y-6 text-foreground/65 font-body font-light text-sm md:text-[15px] leading-[1.9]">
              <p>
                Shorewood Homes is a distinguished residential developer dedicated to creating homes of
                exceptional quality in some of England's most desirable locations. With a commitment to
                craftsmanship that runs through every detail, we design residences that seamlessly blend
                contemporary living with timeless architectural principles.
              </p>
              <p>
                Our approach is rooted in a deep understanding of place. Each development is carefully
                conceived to complement its surroundings, drawing inspiration from the local landscape,
                heritage, and character. We believe that a home should not only meet the practical needs
                of modern life but should also enrich the lives of those who inhabit it.
              </p>
              <p>
                From the initial concept through to final handover, every Shorewood home reflects our
                unwavering standards. We work with leading architects, interior designers, and landscape
                specialists to ensure that each residence is a testament to thoughtful design, superior
                materials, and meticulous attention to detail.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-24 md:py-32">
          <div className="container-main max-w-5xl">
            <div className="text-center mb-16 md:mb-20">
              <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Our Values</p>
              <h2 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-6">
                What We Stand For
              </h2>
              <div className="w-10 h-px bg-brand-limestone/20 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {[
                { title: "Quality", desc: "Every material is selected for its beauty and longevity. We never compromise on the standards that define a Shorewood home." },
                { title: "Integrity", desc: "Transparency and honesty guide every relationship — with our buyers, partners, and the communities we build within." },
                { title: "Legacy", desc: "We create homes designed to endure, becoming cherished places that appreciate in both value and meaning over generations." },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <h3 className="font-display font-normal text-base uppercase tracking-[0.2em] text-brand-limestone mb-5">
                    {value.title}
                  </h3>
                  <p className="font-body font-light text-[13px] sm:text-sm text-brand-limestone/55 leading-[1.85]">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
