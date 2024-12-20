// import React, { useState, useEffect } from 'react';
// import AOS from 'aos';
// import cardData from './MembershipCardsList.json';
// import axios from 'axios';

// function formatFeaturesWithColors(feature) {
//     const parts = feature.split(/(\d+)/).map((part, index) =>
//         /\d+/.test(part) ? <span key={index} className="numbers">{part}</span> : part
//     );
//     return <>{parts}</>;
// }

// const callStripe = async (title, price, interval) => {
//     try {
//         const priceInCents = parseFloat(price.replace('$', '')) * 100; // Convert to cents
//         const response = await axios.post(
//             `${process.env.REACT_APP_API_URL}/create-checkout-session`,
//             {
//                 card_title: title,
//                 card_price: priceInCents,
//                 card_interval: interval,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         console.log('Stripe response:', response.data);
//         window.location.href = response.data.url;
//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//     }
// };

// function MembershipCards() {
//     const [isYearly, setIsYearly] = useState(false); // State to toggle between monthly and yearly

//     useEffect(() => {
//         AOS.init();
//     }, []);

//     const togglePlan = () => {
//         setIsYearly((prevState) => !prevState);
//     };

//     return (
//         <React.Fragment>
//             <div className="membershipCards">
//                 <div className="container">
//                     <div className="title" data-aos="fade-up" data-aos-duration="1000">
//                         <span>Membership</span>
//                         <h2>Need more help?</h2>
//                         <p>Book a live consultation with a designer today</p>
//                     </div>
//                     <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
//                         <span style={{ color: 'white' }}>Monthly</span>
//                         <div
//                             onClick={togglePlan}
//                             style={{
//                                 width: '64px',
//                                 height: '32px',
//                                 borderRadius: '32px',
//                                 backgroundColor: 'white',
//                                 padding: '3px',
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     width: '26px',
//                                     height: '26px',
//                                     backgroundColor: 'rgb(240, 159, 10)',
//                                     borderRadius: '100%',
//                                     transform: isYearly ? 'translateX(32px)' : 'translateX(0px)',
//                                     transition: '0.3s',
//                                 }}
//                             />
//                         </div>
//                         <span style={{ color: 'white' }}>Yearly</span>
//                     </div>
//                     <div className="cards">
//                         <div className="row justify-content-center">
//                             {cardData.map((card) => (
//                                 <div className="col-md-6 col-lg-4 my-3" key={card.id}>
//                                     <div className="card">
//                                         {card.popular ? <p className="popular">{card.popular}</p> : ''}
//                                         <p className="price">{card.title}</p>
//                                         <p className="card-title">
//                                             {isYearly ? card.yearlyPrice : card.price}
//                                         </p>
//                                         <p className="card-text">{card.description}</p>
//                                         <button
//                                             onClick={() =>
//                                                 callStripe(
//                                                     card.title,
//                                                     isYearly ? card.yearlyPrice : card.price,
//                                                     isYearly ? 'year' : 'month'
//                                                 )
//                                             }
//                                         >
//                                             {card.buttonText}
//                                         </button>
//                                         <ul>
//                                             {card.features.map((feature, index) => (
//                                                 <li key={index}>{formatFeaturesWithColors(feature)}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default MembershipCards;















import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import cardData from './MembershipCardsList.json';
import axios from 'axios';

function formatFeaturesWithColors(feature) {
    const parts = feature.split(/(\d+)/).map((part, index) =>
        /\d+/.test(part) ? <span key={index} className="numbers">{part}</span> : part
    );
    return <>{parts}</>;
}

const callStripe = async (title, price) => {
    try {
        const priceInCents = parseFloat(price.replace('$', '')) * 100; // Convert to cents
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/create-checkout-session`,
            {
                card_title: title,
                card_price: priceInCents,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('Stripe response:', response.data);
        window.location.href = response.data.url;
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
};

function MembershipCards() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <div className="membershipCards">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <span>Membership</span>
                        <h2>Need more help?</h2>
                        <p>Book a live consultation with a designer today</p>
                    </div>
                    <div className="cards">
                        <div className="row justify-content-center">
                            {cardData.map((card) => (
                                <div className="col-md-6 col-lg-4 my-3" key={card.id}>
                                    <div className="card">
                                        {card.popular ? <p className="popular">{card.popular}</p> : ''}
                                        <p className="price">{card.title}</p>
                                        <p className="card-title">{card.price}</p>
                                        <p className="card-text">{card.description}</p>
                                        <button
                                            onClick={() =>
                                                callStripe(card.title, card.price)
                                            }
                                        >
                                            {card.buttonText}
                                        </button>
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
