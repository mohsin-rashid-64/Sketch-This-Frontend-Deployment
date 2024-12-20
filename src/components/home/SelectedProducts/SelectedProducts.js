import React, { useState, useEffect, useContext } from 'react';
import './SelectedProducts.scss';
import AOS from 'aos';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Loader from '../../LoaderOfImage/Loader';
import Navbar from '../../navbar/Navbar';
import { AuthContext } from '../../../Context/AuthContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [generating, setGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { _auth, _setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const { function_name, style } = location.state || {};

    const categories = {
        "Sleep": ["mattress", "pillow", "comfort", "duvet", "sheet", "pillow", "curtain", "rug", "paint", "painted", "wallpaper", "plant", "furniture", "chair", "desk", "bed", "sectional"],
        "Entertainment": ["sofa", "sectional", "chair", "table", "side table", "nightstand", "lamp", "table lamp", "ottoman", "bar", "console", "curtain", "rug", "paint", "wallpaper", "painted", "plant", "furniture", "pillow", "entertainment center", "desk"],
        "Dining": ["dining chair", "chair", "furniture", "steamer", "pot", "pots", "teapot", "cabinets", "nightstand", "lamp", "stool", "console", "paint", "painted", "wallpaper", "plant", "dish", "dishes", "utensil", "glasses", "table", "plate", "napkin", "napkin ring", "bar", "curtain", "rug", "paint", "wallpaper", "painted", "sectional", "plant"],
        "Bath": ["medicine cabinet", "sconce", "lamp", "toilet", "sink", "towel", "holder", "showerhead", "handheld shower", "bench", "makeup vanity", "tile", "bath", "accessories", "window", "desk", "chair", "rug", "paint", "wallpaper", "painted", "small plant", "plant", "shower", "/shower"]
    };

    const tabs = [
        { title: 'Back', id: 'back' },
        { id: 'all', title: 'All' },
        ...(function_name && categories[function_name] ? categories[function_name].map(item => ({ id: item, title: item })) : [])
    ];

    const [selectedTabIndex, setSelectedTabIndex] = useState(tabs.length > 2 ? 2 : 1);

    useEffect(() => {
        fetchData();
        AOS.init();  // Initialize AOS animations only once on component mount.
    }, []);  // Empty dependency array ensures this runs once.

    useEffect(() => {
        fetchData();  // Fetch data when tab or page changes.
    }, [selectedTabIndex, page]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${process.env.REACT_APP_API_URL}/products?page=${page}`;
            const selectedTab = tabs[selectedTabIndex]?.id;
            if (selectedTab !== 'all') {
                url += `&search=${encodeURIComponent(selectedTab)}`;
            } else if (function_name) {
                url += `&search=${encodeURIComponent(function_name)}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('DATA',data)
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

    const handleTabClick = (tabIndex) => {
        if (tabs[tabIndex].id === 'back') {
            navigate('/Steps');
            return;
        }
        setSelectedTabIndex(tabIndex);
        setPage(1);
        setProducts([]); // Clear products when changing tab.
    };

    const loadMoreProducts = () => {
        setPage(prevPage => prevPage + 1); // Increment page for pagination.
    };

    const addToCart = (product) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(product)) {
                return prevSelected.filter(item => item !== product);
            } else if (prevSelected.length < 10) {
                return [...prevSelected, product];
            } else {
                alert("You can't select more than 10 products.");
                return prevSelected;
            }
        });
    };

    const goToCart = async () => {
        if (selectedProducts.length === 0) {
            alert("Please select at least one product");
            return;
        }
        if (!_auth) {
            alert('Please Login');
            navigate('/');
            return;
        }

        setGenerating(true);
        try {
            const selections = selectedProducts.map(p => p.Title);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-description/`, {
                email: 'email@example.com',
                selections,
                selectedProducts,
            });
            if (response.data.background_removed_images) {
                localStorage.setItem("isImageSave", true);
                localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
                navigate('/BoardDetail', { state: { selectedProducts, ...response.data, function_name, style } });
            } else {
                throw new Error('Image URL is missing from the response.');
            }
        } catch (error) {
            console.error('Error generating image:', error.response?.data || error.message);
            alert(`Error generating image: ${error.response?.data?.detail || error.message}`);
        } finally {
            setGenerating(false);
        }
    };

    const isProductSelected = (product) => selectedProducts.includes(product);

    if (generating) return <Loader />;

    if (loading && page === 1) return <div className="loading-spinner"></div>;

    if (error) return <p>{error}</p>;

    return (
        <React.Fragment>
            <Navbar />
            <div className="products">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <h2>Choose Your...</h2>
                        <p>Just browsing. Search by product and make your own combinations.</p>
                    </div>
                    <div className="tab-buttons" data-aos="fade-down" data-aos-duration="1000">
                        <button
                            onClick={() => handleTabClick(selectedTabIndex - 1)}
                            disabled={selectedTabIndex === 0}
                        >
                            Previous
                        </button>
                        <button className="active">
                            {tabs[selectedTabIndex]?.title}
                        </button>
                        <button
                            onClick={() => handleTabClick(selectedTabIndex + 1)}
                            disabled={selectedTabIndex === tabs.length - 1}
                        >
                            Next
                        </button>
                    </div>
                    <div className="productsBlock height-card">
                        {products.length > 0 ? (
                            <div className="row height-card">
                                {products.map((product) => (
                                    <div className="col-lg-4" data-aos="fade-up" data-aos-duration="1000" key={product.id}>
                                        <div className="card">
                                            <div className="head">
                                                <img src={product.image} className="blogImg" alt="Product" />
                                                <div className="date">
                                                    <p>$ <span>{product.Price}</span></p>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h3 className="product-title" title={product.Title}>{product.Title}</h3>
                                                <button
                                                    className={`readMore ${isProductSelected(product) ? "selected" : ""}`}
                                                    onClick={() => addToCart(product)}
                                                >
                                                    {isProductSelected(product) ? "Selected" : "Select"}
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
                        <div className="load-more-select">
                            <button onClick={loadMoreProducts} disabled={loading}>
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <button onClick={goToCart} className="generate-btn">Proceed to Next</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Products;
