'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const FILTERS = ['All', 'Hair', 'Nails', 'Beauty', 'Salon'] as const
type Filter = typeof FILTERS[number]

const photos = [
  { src: '/photos/barber.png',    alt: 'Salon chairs',            cat: 'Salon'  },
  { src: '/photos/stylist.png',   alt: 'Stylist with client',     cat: 'Hair'   },
  { src: '/photos/red-hair.png',  alt: 'Vivid red hair',          cat: 'Hair'   },
  { src: '/photos/highlights.png',alt: 'Hair highlights',         cat: 'Hair'   },
  { src: '/photos/stations.png',  alt: 'Styling stations',        cat: 'Salon'  },
  { src: '/photos/storefront.png',alt: 'Salon storefront',        cat: 'Salon'  },
  { src: '/photos/nails.png',     alt: 'Nail art',                cat: 'Nails'  },
  { src: '/photos/entrance.png',  alt: 'Salon entrance',          cat: 'Salon'  },
  { src: '/photos/beauty.png',    alt: 'Beauty lash treatment',   cat: 'Beauty' },
  { src: '/photos/silk-hair.png', alt: 'Silky straight hair',     cat: 'Hair'   },
  { src: '/photos/portrait.png',  alt: 'Stylist portrait',        cat: 'Beauty' },
  { src: '/photos/waiting.png',   alt: 'Waiting area',            cat: 'Salon'  },
]

export default function Gallery() {
  const [active, setActive]     = useState<Filter>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = active === 'All' ? photos : photos.filter(p => p.cat === active)

  const navLB = (dir: number) => {
    if (lightbox === null) return
    setLightbox((lightbox + dir + visible.length) % visible.length)
  }

  return (
    <section id="gallery" className="py-[120px] md:py-20 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-4">Our Work</p>
          <h2 className="text-[38px] sm:text-[44px] font-[800] text-ink tracking-[-0.03em] leading-[1.05]">
            The Transformation<br className="hidden sm:block" /> Gallery
          </h2>
          <p className="text-[15px] text-muted mt-4 max-w-md mx-auto leading-relaxed">
            Real results from real clients at Mercedes Salon.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[11px] font-[600] tracking-[0.12em] uppercase px-5 py-2.5 rounded transition-all duration-200 ${
                active === f
                  ? 'bg-ink text-white'
                  : 'bg-transparent text-muted border border-[#EAEAEA] hover:border-accent hover:text-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 [column-gap:16px]">
          <AnimatePresence>
            {visible.map((p, i) => (
              <motion.div
                key={p.src}
                className="break-inside-avoid mb-4 rounded overflow-hidden relative group cursor-zoom-in"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn size={22} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={26} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); navLB(-1) }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <motion.img
              key={lightbox}
              src={visible[lightbox].src}
              alt={visible[lightbox].alt}
              className="max-w-[90vw] max-h-[88vh] object-contain rounded"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); navLB(1) }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
