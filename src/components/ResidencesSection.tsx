import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import plot1Img from "@/assets/plot-1.webp";
import plot2Img from "@/assets/plot-2.webp";
import plot3Img from "@/assets/plot-3.webp";
import plot4Img from "@/assets/plot-4.webp";
import plot5Img from "@/assets/plot-5.webp";
import plot6Img from "@/assets/plot-6.webp";
import plot7Img from "@/assets/plot-7.webp";
import plot8Img from "@/assets/plot-8.webp";
import joineryImg from "@/assets/material-joinery.webp";
import brasswareImg from "@/assets/material-brassware.webp";
import stoneImg from "@/assets/material-stone.webp";

export interface Plot {
  id: number;
  name: string;
  plotNumber: string;
  beds: string;
  description: string;
  thumbnail: string | null;
  gallery: string[];
  floorplans: string[];
}

const plots: Plot[] = [
  { id: 1, plotNumber: "Plot 1", name: "The Marlowe", beds: "4 Bedroom Detached", description: "A generous family home with open-plan living and south-facing garden.", thumbnail: plot1Img, gallery: [], floorplans: [] },
  { id: 2, plotNumber: "Plot 2", name: "The Eliot", beds: "3 Bedroom Semi-Detached", description: "Elegant proportions with a contemporary kitchen and private courtyard.", thumbnail: plot2Img, gallery: [], floorplans: [] },
  { id: 3, plotNumber: "Plot 3", name: "The Austen", beds: "5 Bedroom Detached", description: "The flagship residence with master suite, study and landscaped grounds.", thumbnail: plot3Img, gallery: [], floorplans: [] },
  { id: 4, plotNumber: "Plot 4", name: "The Byron", beds: "4 Bedroom Detached", description: "A corner plot with wraparound garden and dual aspect reception rooms.", thumbnail: plot4Img, gallery: [], floorplans: [] },
  { id: 5, plotNumber: "Plot 5", name: "The Keats", beds: "3 Bedroom End Terrace", description: "Thoughtfully designed with vaulted ceilings and Juliet balcony.", thumbnail: plot5Img, gallery: [], floorplans: [] },
  { id: 6, plotNumber: "Plot 6", name: "The Shelley", beds: "4 Bedroom Detached", description: "Premium finish throughout with integrated home technology.", thumbnail: plot6Img, gallery: [], floorplans: [] },
  { id: 7, plotNumber: "Plot 7", name: "The Brontë", beds: "3 Bedroom Detached", description: "A charming residence with period-inspired detailing and modern comforts.", thumbnail: plot7Img, gallery: [], floorplans: [] },
  { id: 8, plotNumber: "Plot 8", name: "The Wordsworth", beds: "5 Bedroom Detached", description: "Expansive living with double garage and mature tree-lined frontage.", thumbnail: plot8Img, gallery: [], floorplans: [] },
];

const GALLERY_SLOTS = 6;
const FLOORPLAN_SLOTS = 3;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const PlotCard = ({ plot, onClick }: { plot: Plot; onClick: () => void }) => (
  <div className="group cursor-pointer select-none px-2 sm:px-3" onClick={onClick}>
    <div className="overflow-hidden mb-5 border border-brand-limestone/10">
      {plot.thumbnail ? (
        <img
          src={plot.thumbnail}
          alt={plot.name}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/3] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="w-full aspect-[4/3] bg-brand-limestone/5 flex items-center justify-center">
          <span className="font-body font-light text-[11px] text-brand-limestone/30 uppercase tracking-[0.2em]">
            Image Coming Soon
          </span>
        </div>
      )}
    </div>
    <p className="font-body font-light text-[10px] sm:text-[11px] text-brand-limestone/40 uppercase tracking-[0.2em] mb-2">
      {plot.plotNumber} · {plot.beds}
    </p>
    <h3 className="font-display font-normal text-base uppercase tracking-[0.15em] text-brand-limestone mb-2">
      {plot.name}
    </h3>
    <p className="font-body font-light text-[12.5px] sm:text-[13px] text-brand-limestone/50 leading-[1.8] mb-3">
      {plot.description}
    </p>
    <span className="font-body font-light text-[10px] text-brand-limestone/60 tracking-[0.2em] uppercase border-b border-brand-limestone/20 pb-1 transition-all duration-300 group-hover:border-brand-limestone/60 group-hover:text-brand-limestone">
      View Details
    </span>
  </div>
);

const PlotModal = ({
  plot,
  onClose,
  onNavigate,
}: {
  plot: Plot;
  onClose: () => void;
  onNavigate: (dir: -1 | 1) => void;
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"gallery" | "floorplans">("gallery");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const galleryImages = [...(plot.thumbnail ? [plot.thumbnail] : []), ...plot.gallery];
  const gallerySlots: (string | null)[] = Array.from({ length: GALLERY_SLOTS }, (_, i) => galleryImages[i] || null);
  const floorplanSlots: (string | null)[] = Array.from({ length: FLOORPLAN_SLOTS }, (_, i) => plot.floorplans[i] || null);

  const currentSlots = activeTab === "gallery" ? gallerySlots : floorplanSlots;
  const currentImage = currentSlots[activeImage] || null;

  useEffect(() => {
    setActiveImage(0);
    setActiveTab("gallery");
  }, [plot.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNavigate, onClose, lightbox]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-secondary/95 backdrop-blur-md" onClick={onClose} />

      <button
        onClick={() => onNavigate(-1)}
        className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 p-3 text-brand-limestone/50 hover:text-brand-limestone transition-colors hidden sm:block"
        aria-label="Previous residence"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button
        onClick={() => onNavigate(1)}
        className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 p-3 text-brand-limestone/50 hover:text-brand-limestone transition-colors hidden sm:block"
        aria-label="Next residence"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      <motion.div
        key={plot.id}
        className="relative z-10 w-full sm:max-w-6xl h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-secondary border-t sm:border border-brand-limestone/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 text-brand-limestone/60 hover:text-brand-limestone transition-colors font-body text-[10px] uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} strokeWidth={1.2} />
          Back to Collection
        </button>

        <div className="flex sm:hidden absolute top-4 right-4 z-20 gap-1">
          <button onClick={() => onNavigate(-1)} className="p-2 text-brand-limestone/60 hover:text-brand-limestone" aria-label="Previous"><ChevronLeft size={18} strokeWidth={1.2} /></button>
          <button onClick={() => onNavigate(1)} className="p-2 text-brand-limestone/60 hover:text-brand-limestone" aria-label="Next"><ChevronRight size={18} strokeWidth={1.2} /></button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-14 sm:pt-0">
          <div className="p-4 sm:p-8 lg:p-12">
            <div className="flex gap-6 mb-5">
              {(["gallery", "floorplans"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveImage(0); }}
                  className={`font-body text-[10px] uppercase tracking-[0.2em] pb-2 border-b transition-all duration-300 ${
                    activeTab === tab
                      ? "border-brand-limestone/70 text-brand-limestone"
                      : "border-transparent text-brand-limestone/30 hover:text-brand-limestone/60"
                  }`}
                >
                  {tab === "gallery" ? "Gallery" : "Floorplans"}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden border border-brand-limestone/10 mb-3 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeImage}-${plot.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentImage ? (
                    <>
                      <img
                        src={currentImage}
                        alt={`${plot.name} ${activeTab}`}
                        className="w-full aspect-[4/3] object-cover cursor-zoom-in"
                        onClick={() => setLightbox(currentImage)}
                      />
                      <button
                        onClick={() => setLightbox(currentImage)}
                        className="absolute top-3 right-3 p-2 bg-brand-blue/50 backdrop-blur-sm text-brand-limestone/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Expand image"
                      >
                        <Maximize2 size={14} strokeWidth={1.2} />
                      </button>
                    </>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-brand-limestone/5 flex items-center justify-center">
                      <span className="font-body font-light text-[11px] text-brand-limestone/25 uppercase tracking-[0.2em]">
                        {activeTab === "gallery" ? "Photo Coming Soon" : "Floorplan Coming Soon"}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {currentSlots.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 overflow-hidden border transition-all duration-300 ${
                    activeImage === i
                      ? "border-brand-limestone/60 opacity-100"
                      : "border-brand-limestone/10 opacity-40 hover:opacity-70"
                  }`}
                >
                  {img ? (
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-limestone/5 flex items-center justify-center">
                      <span className="text-[8px] text-brand-limestone/20 uppercase">
                        {activeTab === "floorplans" ? "FP" : i + 1}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-8 lg:p-12 flex flex-col justify-center">
            <p className="font-body font-light text-[10px] text-brand-limestone/40 uppercase tracking-[0.25em] mb-4">
              {plot.plotNumber} · {plot.beds}
            </p>
            <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.18em] text-brand-limestone mb-5">
              {plot.name}
            </h2>
            <div className="w-10 h-px bg-brand-limestone/25 mb-7" />
            <p className="font-body font-light text-[13px] sm:text-sm text-brand-limestone/65 leading-[1.85] mb-8">
              {plot.description}
            </p>
            <div className="space-y-0 mb-10">
              {[
                { label: "Bedrooms", value: plot.beds },
                { label: "Status", value: "Available" },
                { label: "Price", value: "On Application" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-3 border-b border-brand-limestone/10">
                  <span className="font-body font-light text-[10px] text-brand-limestone/40 uppercase tracking-[0.2em]">{row.label}</span>
                  <span className="font-body font-light text-[13px] text-brand-limestone/70">{row.value}</span>
                </div>
              ))}
            </div>
            <a
              href="/contact"
              className="border border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone hover:text-secondary transition-all duration-300 text-center font-body text-[10px] uppercase tracking-[0.25em] py-3"
            >
              Register Interest
            </a>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[60] bg-brand-blue/95 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-brand-limestone/60 hover:text-brand-limestone transition-colors font-body text-[11px] uppercase tracking-[0.2em] z-10"
            >
              <ArrowLeft size={16} strokeWidth={1.2} />
              Back to Collection
            </button>
            <motion.img
              src={lightbox}
              alt="Expanded view"
              className="max-w-[92vw] max-h-[88vh] object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResidencesSection = () => {
  const [selectedPlotIndex, setSelectedPlotIndex] = useState<number | null>(null);

  const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [autoplayPlugin]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const navigatePlot = useCallback((dir: -1 | 1) => {
    setSelectedPlotIndex((cur) => cur === null ? cur : (cur + dir + plots.length) % plots.length);
  }, []);

  return (
    <>
      <section id="residences" className="py-24 md:py-36 bg-secondary">
        <div className="container-main px-5 sm:px-6">
          <motion.div
            className="text-center mb-14 sm:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Homes</p>
            <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.3em] text-brand-limestone mb-8">
              Refined Living
            </h2>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-10" />
            <p className="font-body font-light text-brand-limestone/60 max-w-xl mx-auto text-sm md:text-[15px] leading-[1.9]">
              Forty-Eight individually designed residences, each crafted to embody our enduring commitment to quality and character.
            </p>
          </motion.div>

          <div className="relative">
            <button onClick={scrollPrev} className="absolute -left-2 sm:-left-6 top-1/3 -translate-y-1/2 z-10 p-2 text-brand-limestone/40 hover:text-brand-limestone transition-colors duration-300" aria-label="Previous">
              <ChevronLeft size={28} strokeWidth={1} />
            </button>
            <button onClick={scrollNext} className="absolute -right-2 sm:-right-6 top-1/3 -translate-y-1/2 z-10 p-2 text-brand-limestone/40 hover:text-brand-limestone transition-colors duration-300" aria-label="Next">
              <ChevronRight size={28} strokeWidth={1} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {plots.map((plot, idx) => (
                  <div key={plot.id} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]">
                    <PlotCard plot={plot} onClick={() => setSelectedPlotIndex(idx)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background border-t border-foreground/5">
        <div className="container-main px-5 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">Development Philosophy</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-foreground mb-8">
              A Considered Collection
            </h3>
            <div className="w-10 h-px bg-foreground/20 mx-auto mb-10" />
            <p className="font-body font-light text-foreground/65 text-sm md:text-[15px] leading-[1.9]">
              Clarendon Park is not a development of repetition. Each residence has been individually
              conceived to respond to its plot — its orientation, its outlook, and the rhythm of the
              wider masterplan. The result is a quiet, cohesive collection where no two homes are alike,
              yet all share the same architectural language.
            </p>
          </motion.div>
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
            <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">Materials & Craft</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-8">
              The Detail Within
            </h3>
            <div className="w-10 h-px bg-brand-limestone/20 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { title: "Joinery", desc: "Bespoke kitchen and wardrobe cabinetry, hand-fitted by master craftsmen using sustainable European hardwoods.", img: joineryImg },
              { title: "Brassware & Fittings", desc: "Solid brass ironmongery and softly burnished fixtures, specified for their tactile quality and elegant patina over time.", img: brasswareImg },
              { title: "Natural Stone", desc: "Hand-selected limestone and granite, used for entrances, hearths and exterior detailing — each piece chosen for its grain and provenance.", img: stoneImg },
            ].map((m) => (
              <div key={m.title} className="text-center">
                <div className="overflow-hidden mb-6 border border-brand-limestone/10">
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                  />
                </div>
                <div className="border-t border-brand-limestone/10 pt-6">
                  <h4 className="font-display font-normal text-[15px] uppercase tracking-[0.18em] text-brand-limestone mb-4">{m.title}</h4>
                  <p className="font-body font-light text-[13px] text-brand-limestone/55 leading-[1.85]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background border-t border-foreground/5">
        <div className="container-main px-5 sm:px-6 max-w-xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            variants={fadeUp}
          >
            <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">The Brochure</p>
            <h3 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-foreground mb-8">
              Explore the Collection
            </h3>
            <div className="w-10 h-px bg-foreground/20 mx-auto mb-10" />
            <p className="font-body font-light text-foreground/65 text-sm md:text-[15px] leading-[1.9] mb-10">
              The Clarendon Park brochure presents each residence in full — floorplans, specification, and the considered detail behind every home.
            </p>
            <a
              href="/the-vision#brochure"
              className="inline-block border border-foreground/30 px-8 py-3 font-body text-[10px] uppercase tracking-[0.25em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Request Brochure
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {selectedPlotIndex !== null && (
          <PlotModal
            plot={plots[selectedPlotIndex]}
            onClose={() => setSelectedPlotIndex(null)}
            onNavigate={navigatePlot}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ResidencesSection;
