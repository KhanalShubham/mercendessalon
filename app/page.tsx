import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'
import Services from '@/components/Services'
import Gallery  from '@/components/Gallery'
import About    from '@/components/About'
import Reviews  from '@/components/Reviews'
import Contact  from '@/components/Contact'
import Booking  from '@/components/Booking'
import Footer   from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Reviews />
        <Contact />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
