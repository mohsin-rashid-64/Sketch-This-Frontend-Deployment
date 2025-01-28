import { useEffect } from "react";
import "./ChooseUs.scss";
import ChooseList from "./chooseUsList.json";
import AOS from "aos";

function ChooseUs() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="chooseUs">
      <div className="container">
        <div
          className="chooseUsTitle"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2>What is Sketch-this?</h2>
        </div>
        <div className="row gy-4">
          {ChooseList.map((item) => {
            return (
              <div
                className="col-lg-6"
                data-aos="fade-down"
                data-aos-duration="1000"
                key={item.id}
              >
                <div className="chooseUsList">
                  <img src={item.img} alt={item.alt} />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
