'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const services = [
  {
    name: 'Hair Styling',
    desc: 'Precision cuts & signature blowouts',
    price: 'From $35',
    image: '/photos/stylist.png',
  },
  {
    name: 'Hair Color',
    desc: 'Vivid, natural & balayage tones',
    price: 'From $65',
    image: '/photos/highlights.png',
  },
  {
    name: 'Highlights',
    desc: 'Dimensional foils, ombré & balayage',
    price: 'From $85',
    image: '/photos/red-hair.png',
  },
  {
    name: 'Nail Services',
    desc: 'Gel, acrylic & intricate nail art',
    price: 'From $28',
    image: '/photos/nails.png',
  },
  {
    name: 'Barber',
    desc: 'Fades, cuts & hot towel shaves',
    price: 'From $25',
    image: '/photos/barber.png',
  },
  {
    name: 'Beauty Treatments',
    desc: 'Facials, lashes & brow design',
    price: 'From $45',
    image: '/photos/beauty.png',
  },
  {
    name: 'Bridal Styling',
    desc: 'Wedding day hair & full makeup',
    price: 'From $120',
    image: '/photos/portrait.png',
  },
]

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector<HTMLElement>('.svc-card')
    const amt  = (card?.offsetWidth ?? 296) + 20
    trackRef.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' })
  }

  return (
    <section
      id="services"
      className="py-[120px] md:py-20 bg-[#FAFAFA] border-t border-[#EAEAEA]"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">

        {/* Header row */}
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="section-label mb-3.5">What We Offer</p>
            <h2 className="text-[38px] sm:text-[44px] font-[800] text-ink tracking-[-0.03em] leading-[1.05]">
              Our Services
            </h2>
          </div>

          {/* Scroll nav */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded border border-[#EAEAEA] bg-white flex items-center justify-center text-ink transition-all duration-200 hover:bg-ink hover:text-white hover:border-ink"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded border border-[#EAEAEA] bg-white flex items-center justify-center text-ink transition-all duration-200 hover:bg-ink hover:text-white hover:border-ink"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>

        {/* Scroll track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
        >
          {services.map((svc, i) => (
            <motion.article
              key={svc.name}
              className="svc-card flex-none w-[260px] sm:w-[296px] h-[340px] sm:h-[380px] rounded overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            >
              {/* Image */}
              <img
                src={svc.image}
                alt={svc.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.18) 50%, transparent 100%)' }}
              />

              {/* Price chip */}
              <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-[700] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full z-10">
                {svc.price}
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <p className="text-[15px] font-[700] text-white leading-snug mb-1">{svc.name}</p>
                <p className="text-[12px] text-white/65 leading-snug">{svc.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
