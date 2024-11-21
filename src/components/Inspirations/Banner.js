import React, { useEffect } from 'react'
import AOS from 'aos';
function Banner() {
  useEffect(() => {
    AOS.init();
}, [])
  return (
    <React.Fragment>
      <div className="inspirationBanner">
        <div className="container">
            <div className="row">
                <div className="col-lg-12" data-aos="fade-up"
                        data-aos-duration="1000">
                <h2 className="banner-heading">Inspirations</h2>
                <p>A center for all our resources & insights</p>
                <div className="formGroup">
                <input type="text" placeholder='Search our blogs by topic or keywords....' />
                <img src="/images/searchIcon.svg" alt="searchIcon" />
                </div>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Banner
