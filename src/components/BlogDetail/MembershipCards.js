import React, { useEffect } from 'react'
import AOS from 'aos';
import cardData from './MembershipCardsList.json'

function formatFeaturesWithColors(feature) {
    const parts = feature.split(/(\d+)/).map((part, index) =>
        /\d+/.test(part) ? <span key={index} className="numbers">{part}</span> : part
    );
    return <>{parts}</>;
}

function MembershipCards() {
    useEffect(() => {
        AOS.init();
    }, [])
    
  return (
    <React.Fragment>
      <div className="membershipCards">
        <div className="container">
        <div className="title" data-aos="fade-up"
                        data-aos-duration="1000">
                        <span>Membership</span>
                        <h2>Need more help?</h2>
                        <p>Book a live consultation with a designer today</p>
        </div>
        <div className="cards">
        <div className="row justify-content-center">
                {cardData.map((card) => (
                    <div className="col-md-6 col-lg-4 my-3" key={card.id}>
                        <div className="card">
                                {card.popular ? <p className="popular">{card.popular}</p> : ""}
                                <p className="price">{card.title}</p>
                                <p className="card-title">{card.price}</p>
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
  )
}

export default MembershipCards
