import { useEffect } from "react";
import AOS from "aos";

function ConvertHome() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="convertHome">
      <div className="container">
        <div className="col-lg-6" data-aos="fade-left" data-aos-duration="1000">
          <div className="content">
            <h3>Converting your ideas into reality</h3>
            <p>
              Be a part of our community to create and inspire. Follow the
              guided selections by clicking Get Started or go to Our Selections
              and select any item you would like to add to your mood board
            </p>
            <p>
              Check out our blogs and Inspiration boards. Post your boards and
              inspire others in their creations.
            </p>
            <button className="more">Discover More</button>
          </div>
        </div>
        <div className="col-lg-6">
          <img className="convert" src="/images/convert.svg" alt="convert" />
        </div>
      </div>
    </div>
  );
}

export default ConvertHome;
