'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#hero',     label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#about',    label: 'About' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [active, setActive]           = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      // Active link tracking
      const secs = document.querySelectorAll<HTMLElement>('section[id]')
      let cur = ''
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setMobileOpen(false)

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-[#EAEAEA]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-container mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex-shrink-0" aria-label="Mercedes Salon">
            <span className="text-[18px] font-[800] tracking-[-0.5px] text-ink">
              Mercedes<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-[12px] font-[500] tracking-[0.04em] uppercase transition-colors duration-200 ${
                  active === l.href.slice(1) ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#booking"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-white text-[12px] font-[600] tracking-[0.05em] px-6 py-3 rounded transition-all duration-200 hover:bg-accent-d hover:-translate-y-px hover:shadow-md"
            >
              Book Appointment
            </a>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-ink"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-[#EAEAEA] shadow-lg md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={handleLink}
                  className="text-[14px] font-[500] text-ink tracking-[0.04em] uppercase"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={handleLink}
                className="mt-2 inline-flex justify-center bg-accent text-white text-[13px] font-[600] py-3.5 rounded"
              >
                Book Appointment
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
