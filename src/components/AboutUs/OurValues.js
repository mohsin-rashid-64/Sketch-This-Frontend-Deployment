import React, { useEffect } from 'react'
import AOS from 'aos';

function OurValues() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <React.Fragment>
            <div className="ourValues">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-left"
                        data-aos-duration="1000">
                            <div className="content">
                                <span>Our value</span>
                                <h2>You can Design.</h2>
                                <p>Make your home an extension of yourself</p>
                            </div>
                        </div>
                        <div className="col-lg-8" data-aos="fade-right"
                        data-aos-duration="1000">
                            <div className="cardBlock">
                                   <div className="block">
                                   <img className='line' src="/images/v1.svg" alt="v1" />
                                <div className="card">
                                    <img className='value' src="/images/value2.svg" alt="value" />
                                    <h3>Vision</h3>
                                    <p>Create and save your spatial ideas</p>
                                </div>
                                   </div>
                               <div className="block">
                               <img className='line2' src="/images/v2.svg" alt="v1" />
                                <div className="card">
                                    <img className='value' src="/images/value1.svg" alt="value" />
                                    <h3>Mission</h3>
                                    <p>Provide a convenient and user-friendly way for customers to browse, select, and purchase furniture items </p>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OurValues
