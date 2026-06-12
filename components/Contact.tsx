'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, MessageCircle, ArrowRight } from 'lucide-react'

const info = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Baytown, Texas',
    href: 'https://maps.google.com/?q=Mercedes+Salon+Baytown+TX',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(281) 422-4231',
    href: 'tel:+12814224231',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 5:00 PM',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-[120px] md:py-20 bg-ink text-white">
      <div className="max-w-container mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-[600] tracking-[0.22em] uppercase text-accent mb-4">
            Get In Touch
          </p>
          <h2 className="text-[38px] sm:text-[44px] font-[800] tracking-[-0.03em] leading-[1.05]">
            Visit Us in<br className="hidden sm:block" /> Baytown, TX
          </h2>
          <p className="text-[15px] text-white/55 mt-4 max-w-md mx-auto leading-relaxed">
            We&rsquo;re ready to serve you. Book by phone, WhatsApp, or online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Left: contact info */}
          <motion.div
            className="lg:col-span-2 space-y-7"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <div className="w-11 h-11 rounded bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-[600] tracking-[0.18em] uppercase text-accent mb-1.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener' : undefined}
                      className="text-[14px] text-white/70 hover:text-white transition-colors leading-relaxed"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+12814224231"
                className="group inline-flex items-center justify-center gap-2.5 text-white text-[12px] font-[600] tracking-[0.06em] uppercase py-3.5 rounded border border-white/20 hover:border-white/50 transition-all duration-200 hover:bg-white/5"
              >
                <Phone size={13} /> Call Now
              </a>
              <a
                href="https://wa.me/12814224231"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white text-[12px] font-[600] tracking-[0.06em] uppercase py-3.5 rounded hover:bg-[#1fad55] transition-all duration-200 hover:-translate-y-px"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2.5 bg-accent text-white text-[12px] font-[600] tracking-[0.06em] uppercase py-3.5 rounded hover:bg-accent-d transition-all duration-200 hover:-translate-y-px"
              >
                Book Online
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>

          {/* Right: map */}
          <motion.div
            className="lg:col-span-3 rounded-[20px] overflow-hidden h-[340px] sm:h-[420px] border border-white/[0.07]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55584.92857768!2d-94.976788!3d29.735682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e5f15e51d15b%3A0x60fd96ee0af4c6c!2sBaytown%2C%20TX!5e0!3m2!1sen!2sus!4v1718750000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mercedes Salon location in Baytown TX"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
