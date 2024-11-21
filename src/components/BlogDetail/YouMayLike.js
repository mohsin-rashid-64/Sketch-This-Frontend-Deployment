import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import AOS from 'aos';

function YouMayLike() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <React.Fragment>
            <div className="YouMayLike">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                        data-aos-duration="1000">
                        <h2>You may also like</h2>
                        <p>Want some inspiration. Check out our weekly blog</p>
                    </div>
                    <Swiper
                        navigation={true}
                        spaceBetween={30}
                        loop={true}
                        slidesPerView={1}
                        modules={[Navigation]}
                        breakpoints={{
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
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
                        className="mySwipers">
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog1.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog2.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog3.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog4.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog1.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card" data-aos="fade-down"
                                data-aos-duration="1000">
                                <div className="head">
                                    <img src="/images/blog2.png" className='blogImg' alt="blogImg" />
                                    <div className="date">
                                        <p><img src="/images/date.svg" alt="date" />October 30, 2017</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>Why Furnitres are good?</h3>
                                    <p>Why Furnitres are good? Why Furnitres are good? Why Furnitres are good? Why Furnitres are good?</p>
                                    <Link to="" className='readMore'>Read More <img src="/images/read.svg" alt="raedImg" /></Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="text-center" data-aos="fade-down"
                        data-aos-duration="1000">
                        <Link to="/" className="seeAll">See All <img src="/images/arrowRight.svg" alt="arrowRight" /></Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default YouMayLike
