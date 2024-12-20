import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './AccountManagement.scss';
import AOS from 'aos';
import axios from "axios";
import Table from 'react-bootstrap/Table';

function AccountManagement() {
    const [accountData, setAccountData] = useState({
        email: '',
        address: '',
        unit: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        planInfo: {
            nextInvoiceDate: 'Jun 2, 2024',
            currentPlan: 'Free',
            plans: [
                { name: 'Starter', price: '4.99' },
                { name: 'Enterprise', price: '9.99' },
            ],
            invoiceTotal: '15',
        },
        invoices: [
            { date: 'May 2, 2024', description: 'Enterprise', total: '$15.00', status: 'Paid' },
        ],
    });

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
        // Retrieve and log data from localStorage
        const editProfileData = JSON.parse(localStorage.getItem('editProfileData'));
        if (editProfileData) {
            setAccountData(prevData => ({
                ...prevData,
                ...editProfileData
            }));
        }
        console.log('Edit Profile Data:', editProfileData);
        console.log('Account Management Data:', accountData);
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAccountData({ ...accountData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const combinedData = {
                ...accountData,
                ...JSON.parse(localStorage.getItem('editProfileData'))
            };
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/save-profile`,
                combinedData,
                config
            );
            console.log(response.data);
            alert("Your profile is updated");
            navigate('/');
        } catch (error) {
            console.error('Error saving data:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); // Display backend error message
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    

    return (
        <React.Fragment>
            <Navbar />
            <div className="AccountManagement">
                <div className="container">
                    <div className="card">
                        <div className="cardInner">
                            <h3 data-aos="fade-down" data-aos-duration="1000">Account Management</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-12">
                                        {/* <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                id="email"
                                                placeholder="Stefania@gmail.com"
                                                value={accountData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div> */}
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                placeholder="Lorem Ipsum dolor sit"
                                                value={accountData.address}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="unit">Apt/Unit/Suite (Optional)</label>
                                            <input
                                                type="text"
                                                id="unit"
                                                placeholder="Doe"
                                                value={accountData.unit}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="zip">Zip Code</label>
                                            <input
                                                type="text"
                                                id="zip"
                                                placeholder="Lorem Ipsum dolor sit"
                                                value={accountData.zip}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                placeholder="Lorem Ipsum dolor sit"
                                                value={accountData.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="state">State</label>
                                            <input
                                                type="text"
                                                id="state"
                                                placeholder="Lorem Ipsum dolor sit"
                                                value={accountData.state}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="country">Country</label>
                                            <input
                                                type="text"
                                                id="country"
                                                placeholder="Lorem Ipsum dolor sit"
                                                value={accountData.country}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h2 data-aos="fade-down" data-aos-duration="1000">Plan Information</h2>
                                <div className="cards" data-aos="fade-down" data-aos-duration="1000">
                                    <div className="card">
                                        <div className="block">
                                            <p>Next Invoice Issue date</p>
                                            <h4>{accountData.planInfo.nextInvoiceDate}</h4>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="block">
                                            <p>Current Plan</p>
                                            <h4>{accountData.planInfo.currentPlan}</h4>
                                        </div>
                                    </div>
                                    {accountData.planInfo.plans.map((plan, index) => (
                                        <div className="card" key={index}>
                                            <div className="block">
                                                <p>{plan.name}</p>
                                                <h4>{plan.price}</h4>
                                            </div>
                                            <img src="/images/upgrade.svg" alt="upgrade" />
                                        </div>
                                    ))}
                                    <div className="card">
                                        <div className="block">
                                            <p>Invoice Total</p>
                                            <h4>${accountData.planInfo.invoiceTotal} <span>See Cost Breakdown</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <h2 data-aos="fade-down" data-aos-duration="1000">Invoice</h2>
                                <div data-aos="fade-down" data-aos-duration="1000">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Invoice Total</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {accountData.invoices.map((invoice, index) => (
                                                <tr key={index}>
                                                    <td>{invoice.date}</td>
                                                    <td>{invoice.description}</td>
                                                    <td>{invoice.total}</td>
                                                    <td>{invoice.status} <a href=''>View Invoice</a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                
                                <div className="text-end" data-aos="fade-down" data-aos-duration="1000">
                                    <button type="submit" className="seeAll">Save <img src="/images/arrowRight.svg" alt="arrowRight" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default AccountManagement;
