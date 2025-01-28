import Banner from './Banner'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import MainBlogs from './MainBlogs'
import AllBlog from './AllBlog'
import MembershipCards from './MembershipCards'


function Blog() {
  return (
    <>
      <Navbar />
      <Banner />
      <MainBlogs />
      <AllBlog />
      <MembershipCards />
      <Footer />
    </>
  )
}

export default Blog
