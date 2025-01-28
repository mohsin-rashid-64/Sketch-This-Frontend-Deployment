import { useEffect } from "react";
import BlogList from "./BlogList.json";
import AOS from "aos";
import { Link } from "react-router-dom";
function MainBlogs() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="MainBlogs">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-6"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="mainImg">
              <img src="/images/MainBlogs.png" alt="MainBlogs" />
            </div>
          </div>
          <div
            className="col-md-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="content">
              <div className="time">
                <p>Furniture</p>
                <span className="dot"></span>
                <p>15 min read</p>
              </div>
              <h2>High Style Dining Furniture Options For Todays Lifestyles</h2>
              <div className="date">
                <p>
                  <img src="/images/bloguser.svg" alt="bloguser" /> Tracey
                  Wilson
                </p>
                <span className="dot"></span>
                <p>20 Jun, 2023</p>
              </div>
            </div>
          </div>
        </div>
        <div className="blogs">
          <div className="row">
            {BlogList.map((item) => {
              return (
                <div
                  className="col-lg-4 col-md-6"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  key={item.id}
                >
                  <div className="BlogList">
                    <Link to="/blog-details">
                      <img className="mainImg" src={item.img} alt={item.alt} />
                    </Link>
                    <div className="time">
                      <p>{item.category}</p>
                      <span className="dot"></span>
                      <p>{item.time} min read</p>
                    </div>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                    <div className="date">
                      <p>
                        <img src={item.user} alt="bloguser" /> {item.name}
                      </p>
                      <span className="dot"></span>
                      <p>{item.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlogs;
