import Header from "@/components/Header";
import ResidencesSection from "@/components/ResidencesSection";
import Footer from "@/components/Footer";
import residencesHero from "@/assets/residences-hero.webp";

const ResidencesPage = () => (
  <>
    <Header />
    <main>
      <section className="relative w-full overflow-hidden h-[70vh] md:h-[85vh]">
        <img
          src={residencesHero}
          alt="Clarendon Park residence exterior"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>
      <ResidencesSection />
    </main>
    <Footer />
  </>
);

export default ResidencesPage;
