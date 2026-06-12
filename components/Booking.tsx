'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, MessageCircle, X, ArrowRight } from 'lucide-react'

const SERVICES = [
  'Haircuts & Styling',
  'Hair Color',
  'Highlights',
  'Nail Services',
  'Barber',
  'Beauty Treatments',
  'Bridal Styling',
  'Salon Package',
]

interface FormData {
  name: string; phone: string; email: string
  service: string; date: string; time: string; notes: string
}

const empty: FormData = { name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' }

export default function Booking() {
  const [form, setForm]         = useState<FormData>(empty)
  const [errors, setErrors]     = useState<Partial<FormData>>({})
  const [success, setSuccess]   = useState(false)
  const [waHref, setWaHref]     = useState('')

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.phone.trim())   e.phone   = 'Required'
    if (!form.email.trim())   e.email   = 'Required'
    if (!form.service)        e.service = 'Required'
    if (!form.date)           e.date    = 'Required'
    if (!form.time)           e.time    = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const msg =
      `Hi Mercedes Salon! I'd like to book an appointment:\n\n` +
      `• Name: ${form.name}\n• Phone: ${form.phone}\n• Email: ${form.email}\n` +
      `• Service: ${form.service}\n• Date: ${form.date}\n• Time: ${form.time}` +
      (form.notes ? `\n• Notes: ${form.notes}` : '')

    setWaHref(`https://wa.me/12814224231?text=${encodeURIComponent(msg)}`)
    setSuccess(true)
    setForm(empty)
  }

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors(prev => { const n = { ...prev }; delete n[k]; return n })
  }

  const inputCls = (err?: string) =>
    `w-full bg-[#FAFAFA] border ${err ? 'border-red-400' : 'border-[#EAEAEA]'} rounded px-4 py-3 text-[14px] text-ink placeholder:text-[#BDBDBD] focus:outline-none focus:border-accent transition-colors duration-200`

  return (
    <section id="booking" className="py-[120px] md:py-20 bg-[#FAFAFA]">
      <div className="max-w-container mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-4">Reserve Your Spot</p>
          <h2 className="text-[38px] sm:text-[44px] font-[800] text-ink tracking-[-0.03em] leading-[1.05]">
            Book Your<br className="hidden sm:block" /> Appointment
          </h2>
          <p className="text-[15px] text-muted mt-4 max-w-md mx-auto leading-relaxed">
            Fill out the form and we&rsquo;ll confirm via WhatsApp within the hour.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="max-w-[720px] mx-auto bg-white rounded-[28px] border border-[#EAEAEA] p-8 sm:p-12 shadow-[0_4px_32px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Full Name *</label>
                <input className={inputCls(errors.name)} type="text" placeholder="Your full name" value={form.name} onChange={set('name')} autoComplete="name" />
                {errors.name && <p className="text-red-400 text-[11px]">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Phone *</label>
                <input className={inputCls(errors.phone)} type="tel" placeholder="(281) 000-0000" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                {errors.phone && <p className="text-red-400 text-[11px]">{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Email *</label>
                <input className={inputCls(errors.email)} type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} autoComplete="email" />
                {errors.email && <p className="text-red-400 text-[11px]">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Service *</label>
                <div className="relative">
                  <select
                    className={`${inputCls(errors.service)} appearance-none pr-10 cursor-pointer`}
                    value={form.service}
                    onChange={set('service')}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 8L2 4h8l-4 4z"/>
                    </svg>
                  </div>
                </div>
                {errors.service && <p className="text-red-400 text-[11px]">{errors.service}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Preferred Date *</label>
                <input className={inputCls(errors.date)} type="date" value={form.date} onChange={set('date')} />
                {errors.date && <p className="text-red-400 text-[11px]">{errors.date}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Preferred Time *</label>
                <input className={inputCls(errors.time)} type="time" min="09:00" max="19:00" value={form.time} onChange={set('time')} />
                {errors.time && <p className="text-red-400 text-[11px]">{errors.time}</p>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[11px] font-[600] tracking-[0.1em] uppercase text-muted">Notes (optional)</label>
                <textarea
                  className={`${inputCls()} resize-none`}
                  rows={3}
                  placeholder="Any special requests or questions..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>

            </div>

            <button
              type="submit"
              className="group mt-7 w-full inline-flex items-center justify-center gap-2.5 bg-accent text-white text-[13px] font-[600] tracking-[0.06em] uppercase py-4 rounded hover:bg-accent-d transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20"
            >
              Confirm Booking
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Alternative */}
            <div className="mt-7 pt-7 border-t border-[#EAEAEA] text-center">
              <p className="text-[11px] font-[600] tracking-[0.14em] uppercase text-muted mb-4">
                Or book directly via
              </p>
              <div className="flex justify-center gap-3">
                <a href="tel:+12814224231" className="inline-flex items-center gap-2 text-[12px] font-[600] text-ink px-5 py-2.5 rounded border border-[#EAEAEA] hover:border-accent/40 transition-colors duration-200">
                  Call
                </a>
                <a href="https://wa.me/12814224231" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[12px] font-[600] text-white bg-[#25D366] px-5 py-2.5 rounded hover:bg-[#1fad55] transition-colors duration-200">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/70 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuccess(false)}
          >
            <motion.div
              className="bg-white rounded-[24px] p-10 max-w-[440px] w-full text-center shadow-2xl"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <Check size={24} className="text-accent" />
              </div>
              <h3 className="text-[22px] font-[800] text-ink tracking-tight mb-2">Request Sent!</h3>
              <p className="text-[14px] text-muted leading-relaxed mb-7">
                We&rsquo;ve received your booking request and will confirm via WhatsApp shortly.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-[13px] font-[600] py-3.5 rounded hover:bg-[#1fad55] transition-colors duration-200"
                >
                  <MessageCircle size={15} /> Open WhatsApp
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[13px] font-[600] text-muted py-3 rounded border border-[#EAEAEA] hover:border-accent/40 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
