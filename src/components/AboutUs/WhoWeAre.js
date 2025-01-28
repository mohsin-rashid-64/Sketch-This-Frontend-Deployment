import { useEffect } from "react";
import AOS from "aos";
import "./AboutUs.scss";
function WhoWeAre() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="whoWeAre">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="imgBlock">
              <img src="/images/whoWeAre.svg" alt="whoWeAre" />
              <div className="card">
                <h2>
                  25<b>+</b>
                </h2>
                <p>Year Experience</p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="content">
              <span>Who we are</span>
              <h2>A creation that suits your personality.</h2>
              <p>Search for all furniture items available online</p>
              <ul>
                <li>
                  <img src="/images/we1.svg" alt="whoWeAre" />
                  <div className="block">
                    <h4>Shop all furniture store</h4>
                    <p>
                      Look through our ever growing furniture list. Add items
                      and create as many mood boards as you like.{" "}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="/images/we2.svg" alt="whoWeAre" />
                  <div className="block">
                    <h4>Keep your ideas saved</h4>
                    <p>
                      Save furniture and accessories from any online store here
                      for shopping now or later.
                    </p>
                  </div>
                </li>
                <li>
                  <img src="/images/we3.svg" alt="whoWeAre" />
                  <div className="block">
                    <h4>Professional Services</h4>
                    <p>Need help with your design. Book a consultation</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhoWeAre;
