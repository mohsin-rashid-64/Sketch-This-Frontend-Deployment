import React, { useEffect } from 'react'
import BlogList from './AllBlogList.json'
import AOS from 'aos';
import { Link } from 'react-router-dom';
function MainBlogs() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <React.Fragment>
            <div className="AllBlog">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="title">
                                <h2>All blog posts</h2>
                            </div>
                        </div>
                    </div>
                    <div className="blogs">
                        <div className="row">
                            {
                                BlogList.map((item) => {
                                    return (
                                        <div className="col-lg-4 col-md-6" data-aos="fade-down"
                                            data-aos-duration="1000" key={item.id}>
                                            <div className="BlogList" >
                                                <Link to="/blog-details"><img className='mainImg' src={item.img} alt={item.alt} /></Link>
                                                <div className="time">
                                                    <p>{item.category}</p>
                                                    <span className='dot'></span>
                                                    <p>{item.time} min read</p>
                                                </div>
                                                <h2>{item.title}</h2>
                                                <p>{item.desc}</p>
                                                <div className="date">
                                                    <p><img src={item.user} alt="bloguser" /> {item.name}</p>
                                                    <span className='dot'></span>
                                                    <p>{item.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <button className="more">Discover More</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainBlogs
