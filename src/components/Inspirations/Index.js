import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import MembershipCards from '../Blog/MembershipCards'
import Banner from './Banner'
import './Inspirations.scss'
import Boards from './Boards'


function Index() {
  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <Boards />
      <MembershipCards />
      <Footer />
    </React.Fragment>
  )
}

export default Index
