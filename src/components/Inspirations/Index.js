import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import MembershipCards from '../Blog/MembershipCards'
import Banner from './Banner'
import './Inspirations.scss'
import Boards from './Boards'


function Index() {
  return (
    <>
      <Navbar />
      <Banner />
      <Boards />
      <MembershipCards />
      <Footer />
    </>
  )
}

export default Index
