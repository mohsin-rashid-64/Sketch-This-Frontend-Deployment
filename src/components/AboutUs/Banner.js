import React, { useEffect } from 'react'
import AOS from 'aos';
import './AboutUs.scss'
function Banner() {
  useEffect(() => {
    AOS.init();
}, [])
  return (
    <React.Fragment>
      <div className="Aboutbanner">
        <div className="container">
            <div className="row">
                <div className="col-lg-12" data-aos="fade-up"
                        data-aos-duration="1000">
                <h2 className="banner-heading">About Us</h2>
                <p>Everything your home deserves</p>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Banner
