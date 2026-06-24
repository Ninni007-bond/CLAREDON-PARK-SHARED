import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import gal1 from "@/assets/gallery/gal_1.jpg";
import gal2 from "@/assets/gallery/gal_2.jpg";
import gal3 from "@/assets/gallery/gal_3.jpg";
import gal4 from "@/assets/gallery/gal_4.jpg";
import gal5 from "@/assets/gallery/gal_5.jpg";
import gal6 from "@/assets/gallery/gal_6.jpg";
import gal7 from "@/assets/gallery/gal_7.jpg";
import gal8 from "@/assets/gallery/gal_8.jpg";
import gal9 from "@/assets/gallery/gal_9.jpg";
import gal10 from "@/assets/gallery/gal_10.jpg";
import gal11 from "@/assets/gallery/gal_11.jpg";
import gal12 from "@/assets/gallery/gal_12.jpg";
import gal13 from "@/assets/gallery/gal_13.jpg";
import gal14 from "@/assets/gallery/gal_14.jpg";
import gal15 from "@/assets/gallery/gal_15.jpg";
import gal16 from "@/assets/gallery/gal_16.jpg";
import gal17 from "@/assets/gallery/gal_17.jpg";
import gal18 from "@/assets/gallery/gal_18.jpg";
import gal19 from "@/assets/gallery/gal_19.jpg";
import gal20 from "@/assets/gallery/gal_20.jpg";
import gal21 from "@/assets/gallery/gal_21.jpg";
import gal22 from "@/assets/gallery/gal_22.jpg";
import gal23 from "@/assets/gallery/gal_23.jpg";

type GalleryRow = { type: "2col" | "3col"; images: string[] };

const galleryRows: GalleryRow[] = [
  { type: "2col", images: [gal1, gal2] },
  { type: "3col", images: [gal3, gal4, gal5] },
  { type: "2col", images: [gal6, gal7] },
  { type: "3col", images: [gal8, gal9, gal10] },
  { type: "3col", images: [gal11, gal12, gal13] },
  { type: "2col", images: [gal14, gal15] },
  { type: "3col", images: [gal16, gal17, gal18] },
  { type: "2col", images: [gal19, gal20] },
  { type: "3col", images: [gal21, gal22, gal23] },
];

const allImages = galleryRows.flatMap((row) => row.images);

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (img: string) => {
    const idx = allImages.indexOf(img);
    setLightboxIndex(idx >= 0 ? idx : null);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (dir: -1 | 1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative w-full overflow-hidden h-[70vh] md:h-[85vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/gallery-hero.mp4"
        />
      </div>

      <section className="bg-background border-t border-foreground/5">
        <div className="container-main text-center py-24 md:py-32 max-w-3xl">
          <p className="eyebrow text-foreground/50 mb-5 text-[10px] sm:text-[11px]">Gallery</p>
          <h1 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.3em] text-foreground mb-8">
            Interior Design
          </h1>
          <div className="w-10 h-px bg-foreground/20 mx-auto mb-10" />
          <p className="font-body font-light text-[13px] sm:text-sm md:text-[15px] leading-[1.9] text-foreground/65">
            We approach our developments in a distinct, design-led manner from the very beginning of the planning process. From the proportions and flow of the layout, the design and specification of the kitchen and the layout and materials of each bathroom, to the location of every electrical socket, the type of flooring and style of the door handles; every aspect of each house has been meticulously considered. Warm, neutral decorative tones have been used throughout, as well as a refined specification, to ensure that the rooms of the home sit alongside each other sensitively and cohesively, creating an overall ambience of understated elegance.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-main">
          <div className="flex flex-col gap-4 md:gap-5">
            {galleryRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid gap-4 md:gap-5 ${
                  row.type === "2col"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {row.images.map((img, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    className="overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: imgIdx * 0.08 }}
                    onClick={() => openLightbox(img)}
                  >
                    <div className={`relative w-full overflow-hidden ${row.type === "2col" ? "aspect-[1000/692]" : "aspect-[700/846]"}`}>
                      <img
                        src={img}
                        alt={`Interior design ${rowIdx * 3 + imgIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-main text-center max-w-xl">
          <Instagram className="w-7 h-7 text-brand-limestone/70 mx-auto mb-6" strokeWidth={1.2} />
          <p className="eyebrow text-brand-limestone/50 mb-5 text-[10px] sm:text-[11px]">@shorewoodhomes</p>
          <h2 className="font-display font-normal text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] text-brand-limestone mb-8">
            Follow Our Journey
          </h2>
          <div className="w-10 h-px bg-brand-limestone/20 mx-auto mb-10" />
          <p className="font-body font-light text-[13px] sm:text-sm md:text-[15px] leading-[1.9] text-brand-limestone/60 mb-10">
            Discover the latest from Clarendon Park and our wider collection of homes — from architectural details to interior moments, captured throughout the build.
          </p>
          <a
            href="https://instagram.com/shorewoodhomes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-brand-limestone/30 px-8 py-3 font-body text-[10px] uppercase tracking-[0.25em] text-brand-limestone hover:bg-brand-limestone hover:text-secondary transition-all duration-300"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-secondary/95 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-brand-limestone/60 hover:text-brand-limestone transition-colors z-10 font-body text-[11px] uppercase tracking-[0.2em]"
              aria-label="Back to collection"
            >
              <ArrowLeft size={16} strokeWidth={1.2} />
              Back to Collection
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-brand-limestone/50 hover:text-brand-limestone transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-brand-limestone/50 hover:text-brand-limestone transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={allImages[lightboxIndex]}
              alt="Gallery view"
              className="max-w-[90vw] max-h-[85vh] object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
