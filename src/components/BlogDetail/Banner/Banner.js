import React, { useEffect } from 'react'
import './Banner.scss'
import { Link } from 'react-router-dom'
import Slider from './Slider/Slider'
import AOS from 'aos';

function Banner() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <React.Fragment>
      <div className="banner">
        <div className='container'>
          <div className="row">
            <div className="col-lg-6">
              <div className="banner_content" data-aos="fade-right"
                data-aos-duration="1000">
                <p className="subline">
                  <span>Furniture  •  15 min read</span>
                </p>
                <h1>High Style Dining Furniture Options For Todays <span>Lifestyles</span> <img src="/images/bannerChair.svg" alt="bannerChair" /></h1>
                <p className='para'>Showcases a wide range of furniture products for sale. It provides a convenient and user-friendly way for customers to browse, select, and purchase furniture items from the comfort of their own homes.</p>
                <div className="date">
                  <p><img src="/images/bloguser.svg" alt="bloguser" /> Tracey Wilson</p>
                  <span className='dot'></span>
                  <p>20 Jun, 2023</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 sliderP">
              <div data-aos="fade-left"
                data-aos-duration="1000">
                <Slider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Banner
