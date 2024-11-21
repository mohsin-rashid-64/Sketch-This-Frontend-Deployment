import React, { useEffect } from 'react';
import './AboutUs.scss';
import { Link } from 'react-router-dom';
import AOS from 'aos';

function AboutUs({ onBrowseCatalogClick }) {  // Receive the scroll function as a prop
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="aboutus">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img className='dreamImg' src="/images/dreamImg.svg" alt="dreamImg" />
            </div>
            <div className="col-lg-6">
              <div className="content" data-aos="fade-left" data-aos-duration="1000">
                <h2>Let’s make your <br /><span>dream</span> home a reality!</h2>
                <p>Welcome to Sketch-This, your one-stop destination for all your home design needs. We understand that furnishing your space is not just about acquiring pieces, it’s about crafting an environment that reflects your identity.</p>
                <ul>
                  <li><img src="/images/dreamArrow.svg" alt="dreamArrow" /> Trustworthy reviews and testimonials</li>
                  <li><img src="/images/dreamArrow.svg" alt="dreamArrow" /> Easy online shopping experience</li>
                </ul>
                <div className="curve">
                  <img className='curveArrow' src="/images/curveArrow.svg" alt="curveArrow" />
                  <Link to="/" className="started" onClick={onBrowseCatalogClick}>  {/* Attach the click handler */}
                    Browse catalog <img className='arrow' src="/images/arrowRight.svg" alt="arrowRight" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AboutUs;
