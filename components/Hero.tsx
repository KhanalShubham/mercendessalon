'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Scissors, Sparkles } from 'lucide-react'

const fadeUp = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex items-center"
      style={{ paddingTop: '72px' }}
    >

      {/* ── Decorative background ── */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Plus signs */}
        <span className="absolute top-[18%] left-[6%] text-[#111111]/[0.04] text-4xl font-thin leading-none">+</span>
        <span className="absolute top-[52%] left-[3%] text-[#111111]/[0.03] text-2xl font-thin leading-none">+</span>
        <span className="absolute top-[30%] right-[6%] text-[#111111]/[0.04] text-3xl font-thin leading-none">+</span>
        <span className="absolute bottom-[20%] right-[18%] text-[#C58B58]/[0.06] text-4xl font-thin leading-none">+</span>

        {/* Circles */}
        <div className="absolute top-[22%] right-[28%] w-3 h-3 rounded-full bg-[#C58B58] opacity-[0.08]" />
        <div className="absolute top-[60%] left-[14%] w-2 h-2 rounded-full bg-[#111111] opacity-[0.05]" />
        <div className="absolute bottom-[28%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#C58B58] opacity-[0.07]" />
        <div className="absolute top-[10%] right-[14%] w-2.5 h-2.5 rounded-full bg-[#111111] opacity-[0.04]" />
      </div>

      <div className="relative w-full max-w-container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-0 min-h-[calc(100vh-72px)] py-20 lg:py-0">

          {/* ────────────── LEFT: Text ────────────── */}
          <motion.div
            className="w-full lg:w-[45%] lg:pr-16 flex-shrink-0"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="section-label mb-7"
            >
              ✦ Baytown, Texas
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="mb-6"
              aria-label="Mercedes Salon"
            >
              <span className="heading-xl block text-[60px] sm:text-[80px] lg:text-[112px] xl:text-[128px] text-ink">
                Mercedes
              </span>
              <span className="heading-xl block text-[60px] sm:text-[80px] lg:text-[112px] xl:text-[128px] text-accent">
                Salon.
              </span>
            </motion.h1>

            {/* Services tag */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-[600] tracking-[0.22em] uppercase text-muted mb-5"
            >
              Hair &bull; Nails &bull; Beauty &bull; Barber
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-[15px] text-muted leading-[1.75] max-w-[400px] mb-10"
            >
              Professional beauty services designed to help you look and feel your absolute best.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 mb-12"
            >
              <a
                href="#booking"
                className="group inline-flex items-center gap-2.5 bg-accent text-white text-[12px] font-[600] tracking-[0.06em] uppercase px-8 py-4 rounded transition-all duration-300 hover:bg-accent-d hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
              >
                Book Appointment
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>

              <a
                href="https://wa.me/12814224231"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-ink text-[12px] font-[600] tracking-[0.06em] uppercase px-8 py-4 rounded border border-[#EAEAEA] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-8 pt-8 border-t border-[#EAEAEA]"
            >
              <div>
                <p className="text-[30px] font-[800] text-ink leading-none tracking-tight mb-1.5">236+</p>
                <p className="text-[10px] font-[600] text-muted tracking-[0.18em] uppercase">Reviews</p>
              </div>
              <div className="h-10 w-px bg-[#EAEAEA]" />
              <div>
                <p className="text-[30px] font-[800] text-ink leading-none tracking-tight mb-1.5">1117+</p>
                <p className="text-[10px] font-[600] text-muted tracking-[0.18em] uppercase">Followers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ────────────── RIGHT: Image ────────────── */}
          <div className="w-full lg:w-[55%] flex items-center justify-center lg:justify-end relative">
            <motion.div
              className="relative w-full max-w-[620px]"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >

              {/* Main image — organic shape */}
              <div
                className="relative overflow-hidden w-full h-[440px] sm:h-[560px] lg:h-[680px]"
                style={{
                  borderRadius: '40px 80px 40px 80px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src="/photos/red-hair.png"
                  alt="Vivid red hair transformation at Mercedes Salon, Baytown TX"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(0,0,0,0.06) 100%)' }}
                />
              </div>

              {/* Floating card 1 — top right: Hair Color */}
              <motion.div
                className="absolute -top-5 right-4 sm:right-8 bg-white rounded shadow-[0_8px_30px_rgba(0,0,0,0.10)] p-3.5 flex items-center gap-3 z-10"
                style={{ minWidth: '192px' }}
                initial={{ opacity: 0, y: -20, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.72, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Scissors size={17} className="text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[12px] font-[600] text-ink leading-snug">Hair Color</p>
                  <p className="text-[11px] text-muted leading-snug mt-0.5">Transformation</p>
                </div>
              </motion.div>

              {/* Floating card 2 — bottom left: Services pill */}
              <motion.div
                className="absolute bottom-8 -left-3 sm:-left-10 bg-white rounded shadow-[0_8px_30px_rgba(0,0,0,0.10)] px-4 py-3.5 z-10"
                initial={{ opacity: 0, x: -20, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.92, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[16px]" aria-hidden>💅</span>
                  <p className="text-[12px] font-[700] text-ink">Nails</p>
                </div>
                <p className="text-[11px] text-muted">Beauty · Barber</p>
                <div className="flex gap-1 mt-2.5">
                  <span className="h-[3px] w-8 bg-accent rounded-full block" />
                  <span className="h-[3px] w-4 bg-[#EAEAEA] rounded-full block" />
                  <span className="h-[3px] w-2 bg-[#EAEAEA] rounded-full block" />
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-[#EAEAEA] pointer-events-none opacity-60"
                aria-hidden
              />
              <div
                className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full border border-[#EAEAEA] pointer-events-none opacity-30"
                aria-hidden
              />

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
