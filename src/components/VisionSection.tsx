import { motion } from "framer-motion";
import visionHero from "@/assets/vision-hero.png";
import { useState } from "react";
import { FileDown, Check, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const values = [
  { title: "Enduring Quality", description: "Every material is selected for its longevity, beauty and provenance — from hand-laid brickwork to natural stone detailing." },
  { title: "Considered Design", description: "Proportions, light and flow are meticulously planned to create homes that feel effortlessly generous and welcoming." },
  { title: "Landscape Integration", description: "Each residence is designed to sit in harmony with its surroundings, blurring the boundary between inside and out." },
  { title: "Sustainable Craft", description: "Modern energy systems and responsible sourcing ensure comfort today without compromising tomorrow." },
];

const updates = [
  { title: "Meet the Architect", description: "An introduction to the design philosophy behind Clarendon Park.", category: "Design", video: "/videos/meet_the_architect.mp4", poster: "/videos/thumbs/meet_the_architect.jpg" },
  { title: "Site Phase 1 Progress", description: "Foundation works and structural framing — a look at the build so far.", category: "Construction", video: "/videos/pitt_manor_update.mp4", poster: "/videos/thumbs/pitt_manor_update.jpg" },
  { title: "Landscape Masterplan", description: "How the grounds are being shaped to complement every residence.", category: "Landscape" },
  { title: "Interior Selections", description: "A preview of the bespoke materials and finishes chosen for each home.", category: "Interiors" },
  { title: "Site Manager Introduction", description: "Meet the team ensuring every detail meets our exacting standards.", category: "Team" },
  { title: "Community & Surroundings", description: "Exploring Winchester and the Hampshire countryside on your doorstep.", category: "Location" },
];

const VisionSection = () => {
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState("");

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBrochureSubmitted(true);
  };

  return (
    <>
      <section className="relative w-full overflow-hidden h-[70vh] md:h-[85vh]">
        <img
          src={visionHero}
          alt="Clarendon Park aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="bg-secondary">
        <div className="container-main text-center py-24 md:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">The Vision</p>
            <h1 className="font-display font-normal text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.3em] text-brand-limestone mb-8">
              Architecture That Endures
            </h1>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-10" />
            <p className="font-body font-light text-brand-limestone/70 max-w-xl mx-auto text-sm md:text-base leading-[1.9]">
              Clarendon Park is built on the belief that a home should be both a
              sanctuary and a legacy — designed with intention, crafted without
              compromise.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background border-t border-foreground/5">
        <div className="container-main px-5 sm:px-6 max-w-3xl py-24 md:py-36 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">Our Approach</p>
            <h2 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-foreground mb-8">
              Timeless by Design
            </h2>
            <div className="w-10 h-px bg-foreground/20 mx-auto mb-10" />
            <p className="font-body font-light text-foreground/70 leading-[1.9] max-w-2xl mx-auto text-sm md:text-[15px]">
              Clarendon Park represents a harmonious blend of traditional
              craftsmanship and contemporary spatial design. Every residence is a
              testament to Shorewood Homes' commitment to enduring quality —
              where considered proportions meet the finest natural materials.
            </p>
            <p className="font-body font-light text-foreground/70 leading-[1.9] max-w-2xl mx-auto text-sm md:text-[15px] mt-6">
              Set within landscaped grounds, each home has been designed to
              complement its natural surroundings — creating a sense of sanctuary
              from the moment you arrive.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-secondary border-t border-brand-limestone/5">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Our Principles</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-8">
              Built on Conviction
            </h3>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-14 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border-t border-brand-limestone/10 pt-6"
              >
                <h4 className="font-display font-normal text-[15px] sm:text-base uppercase tracking-[0.18em] text-brand-limestone mb-4">{v.title}</h4>
                <p className="font-body font-light text-[13px] sm:text-sm text-brand-limestone/55 leading-[1.8]">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="brochure" className="py-24 md:py-36 bg-background border-t border-foreground/5">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <FileDown className="w-6 h-6 text-foreground/70 mx-auto mb-6" strokeWidth={1} />
            <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">Download</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-foreground mb-6">
              The Clarendon Park Brochure
            </h3>
            <div className="w-10 h-px bg-foreground/20 mx-auto mb-8" />
            <p className="font-body font-light text-foreground/65 text-sm leading-[1.85] mb-4">
              A comprehensive guide featuring detailed floorplans, specification highlights, and a curated introduction to life in Winchester and the surrounding Hampshire countryside.
            </p>
            <p className="font-body font-light text-foreground/40 text-[11px] leading-relaxed mb-10 tracking-wide">
              Area guide · school catchments · transport links · local amenities
            </p>

            {brochureSubmitted ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Check className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                <p className="font-body font-light text-sm text-foreground">
                  Thank you — your brochure is on its way.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={brochureEmail}
                  onChange={(e) => setBrochureEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent border border-foreground/15 px-4 py-3 font-body font-light text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors duration-300"
                />
                <button type="submit" className="border border-foreground/30 px-6 py-3 font-body text-[10px] uppercase tracking-[0.25em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300 whitespace-nowrap">
                  Request Brochure
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-secondary border-t border-brand-limestone/5">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Stay Informed</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-8">
              Development Updates
            </h3>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-8" />
            <p className="font-body font-light text-brand-limestone/55 max-w-lg mx-auto text-sm leading-[1.85]">
              Follow the journey of Clarendon Park — from concept to completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {updates.map((update, i) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="group"
              >
                <div className="relative aspect-video bg-brand-limestone/[0.03] border border-brand-limestone/10 mb-5 flex items-center justify-center cursor-pointer overflow-hidden">
                  {update.video ? (
                    <>
                      <video
                        src={update.video}
                        poster={update.poster}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="none"
                        onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); }}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                      />
                      <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-brand-blue/0 transition-colors duration-500 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-11 h-11 rounded-full border border-brand-limestone/40 backdrop-blur-sm bg-brand-blue/30 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                          <Play className="w-4 h-4 text-brand-limestone/90 ml-0.5" strokeWidth={1} fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-11 h-11 rounded-full border border-brand-limestone/15 flex items-center justify-center">
                      <Play className="w-4 h-4 text-brand-limestone/30 ml-0.5" strokeWidth={1} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 font-body text-[9px] uppercase tracking-[0.2em] text-brand-limestone/60 z-10">
                    {update.category}
                  </span>
                  {!update.video && (
                    <span className="absolute bottom-3 right-3 font-body text-[9px] uppercase tracking-[0.2em] text-brand-limestone/30">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h4 className="font-display font-normal text-[15px] sm:text-base uppercase tracking-[0.15em] text-brand-limestone mb-2">
                  {update.title}
                </h4>
                <p className="font-body font-light text-[13px] sm:text-sm text-brand-limestone/50 leading-[1.8]">
                  {update.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionSection;
