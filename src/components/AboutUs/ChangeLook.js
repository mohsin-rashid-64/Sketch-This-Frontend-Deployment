import { useEffect } from "react";
import AOS from "aos";

function ChangeLook() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="changeLook">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="content"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h2 className="banner-heading">
                C Home is where one starts from
              </h2>
              <p style={{ textAlign: "right", marginRight: "90px" }}>
                 T. S. Eliot
              </p>
              {/* <button className="more">Discover More</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeLook;
