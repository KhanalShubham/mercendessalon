'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    name:   'Maria G.',
    text:   'Mercedes Salon completely transformed my hair! The balayage turned out exactly how I wanted — better even. I\'ll never go anywhere else.',
    source: 'Google Review',
    stars:  5,
  },
  {
    name:   'Sandra R.',
    text:   'Best salon experience in Baytown, hands down. The staff is professional and the atmosphere is so welcoming. My nails have never looked better!',
    source: 'Google Review',
    stars:  5,
  },
  {
    name:   'Ashley T.',
    text:   'I came in for a bridal package and it was absolutely flawless. The team listened to exactly what I wanted and delivered perfection for my big day.',
    source: 'Google Review',
    stars:  5,
  },
  {
    name:   'Carmen L.',
    text:   'Excelente servicio y muy profesional. Me encantó mi corte nuevo. Hablan español y eso lo hace mucho más cómodo. ¡Definitivamente vuelvo!',
    source: 'Google Review',
    stars:  5,
  },
]

export default function Reviews() {
  const [idx, setIdx]     = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (i: number) => setIdx((i + reviews.length) % reviews.length)
  const start = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIdx(x => (x + 1) % reviews.length), 6000)
  }

  useEffect(() => { start(); return () => { if (timer.current) clearInterval(timer.current) } }, [])

  return (
    <section id="reviews" className="py-[120px] md:py-20 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-4">Client Love</p>
          <h2 className="text-[38px] sm:text-[44px] font-[800] text-ink tracking-[-0.03em] leading-[1.05]">
            What Our Clients<br className="hidden sm:block" /> Are Saying
          </h2>
        </motion.div>

        {/* Review card */}
        <div
          className="max-w-[740px] mx-auto"
          onMouseEnter={() => { if (timer.current) clearInterval(timer.current) }}
          onMouseLeave={start}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-[28px] p-10 sm:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: reviews[idx].stars }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#C58B58">
                    <path d="M8 1l1.85 3.75L14 5.56l-3 2.93.71 4.12L8 10.4l-3.71 2.21.71-4.12L2 5.56l4.15-.81L8 1z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[16px] sm:text-[17px] text-ink leading-[1.8] italic font-[400] mb-8">
                &ldquo;{reviews[idx].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-[14px] font-[700] text-ink">{reviews[idx].name}</p>
                <p className="text-[12px] text-muted mt-1 tracking-[0.06em]">{reviews[idx].source}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { go(i); start() }}
                aria-label={`Review ${i + 1}`}
                className={`rounded-full h-[5px] transition-all duration-300 ${
                  i === idx ? 'w-5 bg-accent' : 'w-[5px] bg-[#EAEAEA]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
