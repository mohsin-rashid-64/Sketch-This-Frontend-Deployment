import Banner from './Banner'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import WhoWeAre from './WhoWeAre'
import ChangeLook from './ChangeLook'
import OurValues from './OurValues'
import ConvertHome from './ConvertHome'
import Testimonials from './Testimonials'
import Membership from '../home/Membership/Membership'

function Index() {
  return (
    <>
        <Navbar />
      <Banner />
      <WhoWeAre />
      <ChangeLook />
      <OurValues />
      <ConvertHome />
      <Testimonials />
      <Membership />
      <Footer />
    </>
  )
}

export default Index
