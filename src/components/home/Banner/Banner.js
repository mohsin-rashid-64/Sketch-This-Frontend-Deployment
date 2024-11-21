import React,{useEffect} from 'react'
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
            <div className="banner_content" data-aos="fade-right" data-aos-duration="1000">
                <p className="subline">
                <span>10%</span> Discount until this week
                </p>
                <h1>Elegant designs for every home: Welcome to our  <span>furniture</span> world <img src="/images/bannerChair.svg" alt="bannerChair" /></h1>
                <p className='para'>Showcases a wide range of furniture products for sale. It provides a convenient and user-friendly way for customers to browse, select, and purchase furniture items from the comfort of their own homes.</p>
                <div className="links">
                    <Link to="/Steps" className="started">Get Started <img src="/images/arrowRight.svg" alt="arrowRight" /></Link>
                    <Link to="/" className="video"><img src="/images/video.svg" alt="video" /> Watch a video</Link>
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


