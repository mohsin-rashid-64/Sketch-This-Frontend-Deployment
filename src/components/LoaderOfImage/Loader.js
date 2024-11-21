import React from 'react';
import './Loader.scss';

const Loader = () => {
    return (
        <div className="loading">
            <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <p className="loading-text">Creating Board</p>
        </div>
    );
};

export default Loader;
