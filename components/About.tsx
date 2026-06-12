'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  { src: '/photos/storefront.png', alt: 'Mercedes Salon storefront' },
  { src: '/photos/stations.png',   alt: 'Styling stations' },
  { src: '/photos/entrance.png',   alt: 'Salon entrance' },
  { src: '/photos/waiting.png',    alt: 'Waiting area' },
]

const features = [
  'Licensed & continuously trained stylists',
  'Premium product lines — gentle on every hair type',
  'English & Spanish services available',
  'Walk-ins welcome · Appointments preferred',
]

export default function About() {
  const [idx, setIdx] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (i: number) => setIdx((i + slides.length) % slides.length)

  const reset = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIdx(x => (x + 1) % slides.length), 5000)
  }

  useEffect(() => {
    reset()
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  return (
    <section id="about" className="py-[120px] md:py-20 bg-[#FAFAFA]">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: Image slider */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            style={{ borderRadius: '32px', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides.map((s, i) => (
              <motion.img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: i === idx ? 1 : 0 }}
                transition={{ duration: 0.55 }}
                loading="lazy"
              />
            ))}

            {/* Arrow buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 z-10"
              onClick={() => { go(idx - 1); reset() }}
              aria-label="Previous"
            >
              <ChevronLeft size={15} className="text-ink" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 z-10"
              onClick={() => { go(idx + 1); reset() }}
              aria-label="Next"
            >
              <ChevronRight size={15} className="text-ink" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { go(i); reset() }}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full h-[5px] transition-all duration-300 ${
                    i === idx ? 'w-5 bg-white' : 'w-[5px] bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-5">Our Story</p>

            <h2 className="text-[34px] sm:text-[40px] font-[800] text-ink tracking-[-0.03em] leading-[1.08] mb-6">
              Beauty Crafted with<br />Heart &amp; Precision
            </h2>

            <p className="text-[15px] text-muted leading-[1.78] mb-4">
              Mercedes Salon was founded with a simple mission: make every client feel beautiful, confident, and at home. Our team of experienced stylists brings years of expertise to every appointment.
            </p>
            <p className="text-[15px] text-muted leading-[1.78] mb-8">
              Located in the heart of Baytown, TX, we serve our community with premium services, genuine care, and a passion for the craft that shows in every result.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-10">
              {features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-[7px] w-[5px] h-[5px] flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-[14px] text-ink leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2.5 bg-accent text-white text-[12px] font-[600] tracking-[0.06em] uppercase px-8 py-4 rounded transition-all duration-200 hover:bg-accent-d hover:-translate-y-px hover:shadow-md"
              >
                Book Appointment
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-ink text-[12px] font-[600] tracking-[0.06em] uppercase px-8 py-4 rounded border border-[#EAEAEA] transition-all duration-200 hover:border-accent/50 hover:-translate-y-px"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
