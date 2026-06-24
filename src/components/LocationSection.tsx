import { motion } from "framer-motion";
import { TreePine, Train, GraduationCap, MapPin, Wine, ShoppingBag, Church, Waves } from "lucide-react";
import locationHero from "@/assets/location-hero.png";

const features = [
  { icon: TreePine, title: "Countryside Setting", description: "Surrounded by rolling green landscape and mature woodland walks." },
  { icon: Train, title: "Transport Links", description: "Excellent rail and motorway connections to London, Southampton and beyond." },
  { icon: GraduationCap, title: "Outstanding Schools", description: "Within catchment of highly regarded primary and secondary schools." },
  { icon: MapPin, title: "Village Amenities", description: "Local shops, gastropubs, and a thriving community on your doorstep." },
];

const nearby = [
  { icon: Wine, name: "Winchester City Centre", distance: "3 miles", note: "Historic cathedral city with fine dining, boutique shopping and cultural venues." },
  { icon: Church, name: "Winchester Cathedral", distance: "3.5 miles", note: "One of Europe's finest medieval cathedrals and a UNESCO heritage landmark." },
  { icon: Train, name: "Winchester Station", distance: "3 miles", note: "Direct trains to London Waterloo in just under an hour." },
  { icon: GraduationCap, name: "Winchester College", distance: "3 miles", note: "Founded in 1382 — one of the most prestigious independent schools in England." },
  { icon: ShoppingBag, name: "The Wykeham Arms", distance: "3 miles", note: "Iconic 18th-century gastropub tucked behind the Cathedral." },
  { icon: Waves, name: "South Downs National Park", distance: "4 miles", note: "Miles of rolling chalk downland, perfect for walking, cycling and riding." },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=Winchester+Cathedral,Winchester,UK&hl=en&z=13&output=embed";

const LocationSection = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden h-[70vh] md:h-[85vh]">
        <img
          src={locationHero}
          alt="Winchester riverside scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="bg-secondary">
        <div className="container-main px-5 sm:px-6 text-center py-24 md:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">The Location</p>
            <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.3em] text-brand-limestone mb-8">
              A Place to Call Home
            </h2>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-10" />
            <p className="font-body font-light text-brand-limestone/65 tracking-wide max-w-xl mx-auto text-sm md:text-base leading-[1.9]">
              Clarendon Park enjoys a coveted position within one of Hampshire's most
              desirable villages — where rural tranquillity meets effortless connectivity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary border-t border-brand-limestone/5">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="mb-20 md:mb-24 overflow-hidden border border-brand-limestone/15"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <iframe
              title="Clarendon Park location map"
              src={GOOGLE_MAPS_EMBED}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full aspect-[16/10] md:aspect-[21/9]"
              style={{ filter: "grayscale(35%) contrast(1.05) brightness(0.97)" }}
            />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <feature.icon className="w-5 h-5 text-brand-limestone/60 mx-auto mb-4" strokeWidth={1.2} />
                <h3 className="font-display font-normal text-[14px] sm:text-[15px] uppercase tracking-[0.18em] text-brand-limestone mb-3">
                  {feature.title}
                </h3>
                <p className="font-body font-light text-[12.5px] sm:text-sm text-brand-limestone/55 leading-[1.8]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary border-t border-brand-limestone/5">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Explore</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-8">
              On Your Doorstep
            </h3>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-8" />
            <p className="font-body font-light text-brand-limestone/55 tracking-wide max-w-lg mx-auto text-sm leading-[1.85]">
              Winchester and its surrounding villages offer an enviable quality of life — rich in history, culture and natural beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl mx-auto">
            {nearby.map((place, i) => (
              <motion.div
                key={place.name}
                className="flex gap-5 border-t border-brand-limestone/10 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <place.icon className="w-4 h-4 text-brand-limestone/40 mt-1 flex-shrink-0" strokeWidth={1.2} />
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                    <h4 className="font-display font-normal text-[15px] uppercase tracking-[0.15em] text-brand-limestone">{place.name}</h4>
                    <span className="font-body font-light text-[10px] text-brand-limestone/35 tracking-[0.15em] uppercase">{place.distance}</span>
                  </div>
                  <p className="font-body font-light text-[13px] text-brand-limestone/50 leading-[1.8]">{place.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-limestone">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <div className="w-10 h-px bg-secondary/20 mx-auto mb-10" />
            <blockquote className="font-display font-normal text-lg sm:text-xl md:text-2xl text-secondary leading-[1.6] mb-8 italic">
              "Winchester consistently ranks among the finest places to live in Britain — a city where heritage and modern living exist in perfect balance."
            </blockquote>
            <p className="font-body font-light text-[10px] sm:text-[11px] text-secondary/50 uppercase tracking-[0.25em]">
              The Sunday Times, Best Places to Live
            </p>
            <div className="w-10 h-px bg-secondary/20 mx-auto mt-10" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LocationSection;
