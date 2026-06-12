import { Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'

const cols = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home',     href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'Gallery',  href: '#gallery' },
      { label: 'About',    href: '#about' },
      { label: 'Book Now', href: '#booking' },
    ],
  },
  {
    title: 'Hours',
    content: (
      <ul className="space-y-2.5">
        {[
          ['Mon – Sat', '9:00 AM – 7:00 PM'],
          ['Sunday',    '10:00 AM – 5:00 PM'],
        ].map(([day, hrs]) => (
          <li key={day} className="flex justify-between text-[13px] text-white/50 border-b border-white/[0.05] pb-2.5">
            <span>{day}</span><span>{hrs}</span>
          </li>
        ))}
      </ul>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-16 pb-8 border-t border-[#C58B58]/10">
      <div className="max-w-container mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="block mb-5">
              <span className="text-[18px] font-[800] tracking-[-0.5px] text-white">
                Mercedes<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-[13px] text-white/45 leading-[1.75] mb-6 max-w-[260px]">
              Premium hair, nails &amp; beauty services in Baytown, Texas.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook'  },
                { Icon: MessageCircle, href: 'https://wa.me/12814224231', label: 'WhatsApp' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="w-9 h-9 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/50 hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-[600] tracking-[0.18em] uppercase text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {(cols[0].links ?? []).map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] font-[600] tracking-[0.18em] uppercase text-white mb-5">Hours</h4>
            {cols[1].content}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-[600] tracking-[0.18em] uppercase text-white mb-5">Contact</h4>
            <ul className="space-y-3">
              {[
                { Icon: Phone,   text: '(281) 422-4231',  href: 'tel:+12814224231' },
                { Icon: MessageCircle, text: 'WhatsApp',  href: 'https://wa.me/12814224231' },
                { Icon: MapPin,  text: 'Baytown, Texas',  href: null },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-accent mt-[3px] flex-shrink-0" />
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">{text}</a>
                  ) : (
                    <span className="text-[13px] text-white/50">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/30">
          <span>© 2026 Mercedes Salon. All rights reserved.</span>
          <span>Built with care for our community.</span>
        </div>

      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 md:hidden border-t-2 border-accent">
        <a href="tel:+12814224231"                 className="flex flex-col items-center justify-center gap-1 py-3 bg-[#1A1A1A] text-white text-[9px] font-[600] tracking-[0.08em] uppercase"><Phone size={16}/> Call</a>
        <a href="https://wa.me/12814224231" target="_blank" rel="noopener" className="flex flex-col items-center justify-center gap-1 py-3 bg-[#25D366] text-white text-[9px] font-[600] tracking-[0.08em] uppercase"><MessageCircle size={16}/> WhatsApp</a>
        <a href="#booking"                         className="flex flex-col items-center justify-center gap-1 py-3 bg-accent text-white text-[9px] font-[600] tracking-[0.08em] uppercase"><span className="text-[16px]">✓</span> Book</a>
      </div>

      {/* Desktop WhatsApp float */}
      <a
        href="https://wa.me/12814224231"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-7 right-7 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:bg-[#1fad55] hover:scale-105 transition-all duration-200"
      >
        <MessageCircle size={24} />
      </a>
    </footer>
  )
}
