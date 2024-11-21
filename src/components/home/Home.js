import React, { useRef } from 'react';
import Navbar from '../navbar/Navbar';
import Banner from './Banner/Banner';
import ChooseUs from './ChooseUs/ChooseUs';
import AboutUs from './AboutUs/AboutUs';
import Blogs from './Blogs/Blog';
import Membership from './Membership/Membership';
import Footer from '../footer/Footer';
import Products from './Products/Products';
import Steps from './Steps/Steps';

import axios from 'axios';

function Home() {
  const productsRef = useRef(null);  // Create a ref for the Products section

  // Function to scroll to Products section
  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <ChooseUs />
      <AboutUs onBrowseCatalogClick={scrollToProducts} />  {/* Pass the scroll function */}
      <Steps />
      <Products ref={productsRef} />  {/* Attach ref to Products section */}
      <Blogs />
      <Membership />
      <Footer />
    </React.Fragment>
  );
}

export default Home;
