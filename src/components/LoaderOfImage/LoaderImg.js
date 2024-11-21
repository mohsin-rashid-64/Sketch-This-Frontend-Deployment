import React from 'react';
import './LoaderImg.scss';

const Loader = () => {
    return (
        <div className="loading">
            <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <p className="loading-text">Image Generating</p>
        </div>
    );
};

export default Loader;
