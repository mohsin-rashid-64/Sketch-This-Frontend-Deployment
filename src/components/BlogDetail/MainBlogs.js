import React, { useEffect } from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom';
function MainBlogs() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <React.Fragment>
            <div className="MainBlogsDetails">
                            {/* <div className="mainImg">
                                <img src="/images/blogDetail.png" alt="blogDetail" />
                            </div> */}
                <div className="container">
                    <div className="content">
                    <div className="detail">
                        <p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.</p>
                        <p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p>
                        <h4>Research Your Destination</h4>
                        <p>Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.</p>
                        <h4>Plan Your Itinerary</h4>
                        <p>While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.</p>
                        <p>Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.</p>
                        <h4>Immerse Yourself in the Local Culture</h4>
                        <p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p>
                        <h4>Capture Memories</h4>
                        <p>Finally, don't forget to capture memories of your journey. Whether it's through photographs, journaling, or souvenirs, preserving the moments and experiences of your travels can bring joy and nostalgia for years to come. However, it's also essential to be present in the moment and not let technology distract you from the beauty of your surroundings.</p>
                    </div>
                        <div className="block">
                            <p>“Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy.”</p>
                        </div>
                        <div className="blockImg">
                            <img src="/images/blogdetailImg.png" alt="blogImg" />
                            <p>Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.</p>
                        </div>
                        <div className="shareBlog">
                            <div className="written">
                                <img src="/images/bloguser.svg" alt="bloguser" />
                                <div className="name">
                                    <p>Written by</p>
                                    <h4>Tracey Wilson</h4>
                                </div>
                            </div>
                            <div className="share">
                            <h4>Share this blog:</h4>
                            <div className="imgBlock">
                            <Link to=""><img src="/images/facebookb.svg" alt="facebook" /></Link>
                            <Link to=""><img src="/images/twitterb.svg" alt="twitter" /></Link>
                            <Link to=""><img src="/images/instagramb.svg" alt="instagram" /></Link>
                            <Link to=""><img src="/images/whatsappb.svg" alt="linkedin" /></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainBlogs
