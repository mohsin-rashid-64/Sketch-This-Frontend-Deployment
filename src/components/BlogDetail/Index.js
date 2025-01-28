import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import MainBlogs from './MainBlogs'
import YouMayLike from '../SeeBoard/SeeBoard'
import Membership from '../Blog/MembershipCards'
import './BlogDetail.scss'
import Banner from './Banner/Banner'


function Blog() {
  return (
    <>
      <Navbar />
      <Banner />
      <MainBlogs />
      <YouMayLike />
      <Membership />
      <Footer />
    </>
  )
}

export default Blog
