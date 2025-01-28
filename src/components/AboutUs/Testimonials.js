import { useEffect } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./AboutUs.scss";

function Testimonials() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="testimonials">
      <div className="container">
        <div className="title" data-aos="fade-up" data-aos-duration="1000">
          <span>Testimonials</span>
          <h2>What our clients are saying.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <Swiper
          navigation={true}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          modules={[Navigation]}
          breakpoints={{
            1200: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          className="mySwipers"
        >
          <SwiperSlide>
            <div className="card">
              <div className="head">
                <div className="user">
                  <img className="userImg" src="/images/t2.svg" alt="t2" />
                  <div className="block">
                    <h5>Callum Whitaker</h5>
                    <div className="rating">
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                    </div>
                    <span>Jakarta</span>
                  </div>
                </div>
                <img className="quote" src="/images/quote.svg" alt="quote" />
              </div>
              <h2>
                Dis vitae proin sit fames imperdiet integer magna odio nunc
                tellus non. Adipiscing lacus per litora sed semper ante vivamus.
                Quis turpis aenean gravida magna suspendisse.
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="head">
                <div className="user">
                  <img className="userImg" src="/images/t1.svg" alt="t2" />
                  <div className="block">
                    <h5>Chelsea Hughes</h5>
                    <div className="rating">
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                    </div>
                    <span>Bandung</span>
                  </div>
                </div>
                <img className="quote" src="/images/quote.svg" alt="quote" />
              </div>
              <h2>
                Dis vitae proin sit fames imperdiet integer magna odio nunc
                tellus non. Adipiscing lacus per litora sed semper ante vivamus.
                Quis turpis aenean gravida magna suspendisse.
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="head">
                <div className="user">
                  <img className="userImg" src="/images/t2.svg" alt="t2" />
                  <div className="block">
                    <h5>Callum Whitaker</h5>
                    <div className="rating">
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                    </div>
                    <span>Jakarta</span>
                  </div>
                </div>
                <img className="quote" src="/images/quote.svg" alt="quote" />
              </div>
              <h2>
                Dis vitae proin sit fames imperdiet integer magna odio nunc
                tellus non. Adipiscing lacus per litora sed semper ante vivamus.
                Quis turpis aenean gravida magna suspendisse.
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="head">
                <div className="user">
                  <img className="userImg" src="/images/t1    .svg" alt="t2" />
                  <div className="block">
                    <h5>Chelsea Hughes</h5>
                    <div className="rating">
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                      <img src="/images/star.svg" alt="star" />
                    </div>
                    <span>Bandung</span>
                  </div>
                </div>
                <img className="quote" src="/images/quote.svg" alt="quote" />
              </div>
              <h2>
                Dis vitae proin sit fames imperdiet integer magna odio nunc
                tellus non. Adipiscing lacus per litora sed semper ante vivamus.
                Quis turpis aenean gravida magna suspendisse.
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonials;
