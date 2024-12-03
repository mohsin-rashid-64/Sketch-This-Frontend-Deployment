import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import cardData from './MembershipCardsList.json';
import "./mem.scss"
function formatFeaturesWithColors(feature) {
    const parts = feature.split(/(\d+)/).map((part, index) =>
        /\d+/.test(part) ? <span key={index} className="numbers">{part}</span> : part
    );
    return <>{parts}</>;
}

function MembershipCards() {
    // const [toggle, setToggle] = useState(false);
    const [isYearly, setIsYearly] = useState(false); // State to toggle between monthly and yearly

    useEffect(() => {
        AOS.init();
    }, []);

    const togglePlan = () => {
        setIsYearly(prevState => !prevState);
    };

    return (
        <React.Fragment>
            <div className="membershipCards">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <span>Membership</span>
                        <h2>Need more help?</h2>
                        <p>Book a live consultation with a designer today</p>
                    </div>

                    {/* Toggle Button for Monthly / Yearly */}
                  <div style={{display:'flex', gap:'10px' , justifyContent:'center', marginBottom:'20px'}}>
                  <span style={{color:'white'}}>monthly</span>
                    <div onClick={togglePlan} style={{
                        width: "64px",
                        height: "32px",
                        borderRadius: "32px",
                        backgroundColor: "white",
                        padding: "3px",
                    }}>
                        <div style={{
                            width: '26px',
                            height: "26px",
                            backgroundColor: "rgb(240, 159, 10)",
                            borderRadius: "100%",
                            transform: isYearly ? "translateX(32px)" : "translateX(0px)",
                            transition:'0.3s'
                        }} />
                    </div>
                    <span style={{color:'white'}}>yearly</span>
                  </div>
                    {/* <div className="toggle-switch">
                        <label>
                            <span style={{color:'white'}}>Monthly</span>
                            <input
                                type="checkbox"
                                checked={isYearly}
                                onChange={togglePlan}
                                className="toggle-input"
                            />
                            <span style={{color:'white'}}>Yearly</span>
                        </label>
                    </div> */}

                    <div className="cards">
                        <div className="row justify-content-center">
                            {cardData.map((card) => (
                                <div className="col-md-6 col-lg-4 my-3" key={card.id}>
                                    <div className="card">
                                        {card.popular ? <p className="popular">{card.popular}</p> : ""}
                                        <p className="price">{card.title}</p>
                                        <p className="card-title">
                                            {/* Conditionally render price based on toggle */}
                                            {isYearly ? card.yearlyPrice : card.price}
                                        </p>
                                        <p className="card-text">{card.description}</p>
                                        <button>{card.buttonText}</button>
                                        <ul>
                                            {card.features.map((feature, index) => (
                                                <li key={index}>{formatFeaturesWithColors(feature)}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MembershipCards;
