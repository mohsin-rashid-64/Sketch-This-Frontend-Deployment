import React, { useState, useEffect, useContext } from 'react';
import './Products.scss';
import AOS from 'aos';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [generating, setGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { _auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const tabs = [
        { id: 'all', title: 'All' },
        { id: 'table', title: 'Table' },
        { id: 'sofa', title: 'Sofa' },
        { id: 'chair', title: 'Chair' },
        { id: 'loveseat', title: 'Loveseat' },
        { id: 'sectional', title: 'Sectional' },
        { id: 'bath', title: 'Bath' },
        { id: 'storage', title: 'Storage' },
        { id: 'bed', title: 'Bed' },
        { id: 'dining', title: 'Dining' },
        { id: 'entertainment', title: 'Entertainment' }
    ];

    useEffect(() => {
        fetchData();
        AOS.init();
    }, [selectedTab, page]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            let url = `${process.env.REACT_APP_API_URL}/products?page=${page}`;

            if (selectedTab !== 'all') {
                url += `&search=${encodeURIComponent(selectedTab)}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const productsWithDecodedImages = data.map(product => ({
                ...product,
                image: `data:image/jpeg;base64,${product.Image}`
            }));
            setProducts(prevProducts => (page === 1 ? productsWithDecodedImages : [...prevProducts, ...productsWithDecodedImages]));
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
        setPage(1); // Reset to the first page when the tab changes
        setProducts([]); // Clear current products
    };

    const loadMoreProducts = () => {
        setPage(prevPage => prevPage + 1);
    };

    const addToCart = (product) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(product)) {
                return prevSelected.filter(item => item !== product);
            } else {
                if (prevSelected.length >= 10) {
                    alert("You can't select more than 10 products.");
                    return prevSelected;
                } else {
                    return [...prevSelected, product];
                }
            }
        });
    };

    const isProductSelected = (product) => selectedProducts.includes(product);

    const goToCart = async () => {
        if (selectedProducts.length > 0) {
            if (_auth) {
                setGenerating(true);
                try {
                    const selections = selectedProducts.map(p => p.Title);
                    const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-image2/', {
                        email: 'email@example.com',
                        selections: selections,
                        selectedProducts: selectedProducts,
                    });

                    if (response.data.image_url) {
                        setImageUrl(response.data.image_url);
                        navigate('/BoardDetail', { 
                            state: { 
                                imageUrl: response.data.image_url, 
                                selectedProducts, 
                                background_removed_images: response.data.background_removed_images, 
                                description: response.data.description 
                            } 
                        });
                    } else {
                        throw new Error('Image URL is missing from the response.');
                    }
                } catch (error) {
                    console.error('Error generating image:', error.response?.data || error.message);
                    alert(`Error generating image: ${error.response?.data?.detail || error.message}`);
                } finally {
                    setGenerating(false);
                }
            } else {
                alert('Please login to proceed.');
                navigate('/');
            }
        } else {
            alert("Please select at least one product.");
        }
    };

    if (generating) {
        return <div className="loading-spinner"></div>;
    }

    if (loading && page === 1) {
        return <div className="loading-spinner"></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <React.Fragment>
            <div className="products">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <h2>Our Selections</h2>
                        <p>Just browsing. Search by product and make your own combinations.</p>
                    </div>
                    <div className="tab-buttons" data-aos="fade-down" data-aos-duration="1000">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={selectedTab === tab.id ? 'active' : ''}>
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    <div className="productsBlock">
                        {products.length > 0 ? (
                            <div className="row">
                                {products.map(product => (
                                    <div className="col-lg-4" data-aos="fade-up" data-aos-duration="1000" key={product.id}>
                                        <div className="card">
                                            <div className="head">
                                                <img src={product.image} className='blogImg' alt="Product" />
                                                <div className="date">
                                                    <p>$ <span>{product.Price}</span></p>
                                                </div>
                                            </div>

                                            <div className="content">
                                                <h3>{product.Title}</h3>
                                                <p><b>Available Colors:</b> {product.Color}</p>
                                                <button 
                                                    className={`readMore ${isProductSelected(product) ? 'selected' : ''}`}
                                                    onClick={() => addToCart(product)}
                                                >
                                                    {isProductSelected(product) ? 'Selected' : 'Select'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                    {products.length > 0 && (
                        <div className="load-more">
                            <button onClick={loadMoreProducts} disabled={loading}>
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                            {/* <button onClick={goToCart} className="cart-button-select">
                                Create Board
                            </button> */}
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Products;