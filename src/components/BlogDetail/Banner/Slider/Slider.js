import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.scss';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
function Slider() {
  return (
    <div className='swiperPosition'>
       <Swiper
       loop={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
              }}
              modules={[Pagination, Navigation]}
              navigation={true}
              className="mySwiper"
      >
        <SwiperSlide>
            <img src="/images/bannerSlide.png" alt="bannerSlide" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/bannerSlide.png" alt="bannerSlide" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/bannerSlide.png" alt="bannerSlide" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/bannerSlide.png" alt="bannerSlide" />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  )
}

export default Slider
