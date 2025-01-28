import { useEffect, useState } from 'react';
import './Steps.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StepIndicator from './StepIndicator';
import Navbar from '../../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Steps() {
    const [selectedFunction, setSelectedFunction] = useState('Sleep');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const NavigateTo = (function_name, size, style) => {
        navigate('/SelectedProducts', {
            state: { function_name, size, style }
        });
    };

    const categories = {
        Sleep: {
            sizes: ['King Size', 'Queen Size', 'Full Size', 'Twin Size'],
            styles: ['Natural Tones', 'Color Pop', 'Grey Tones', 'Light Tones']
        },
        Entertainment: {
            sizes: ['Sectional', 'Sofa', 'Loveseat', 'Chair'],
            styles: ['Natural Tones', 'Color Pop', 'Grey Tones', 'Light Tones']
        },
        Bath: {
            sizes: ['Mastery', 'Secondary', 'Three-Quarters', 'Powder'],
            styles: ['Natural Tones', 'Color Pop', 'Grey Tones', 'Light Tones']
        },
        Dining: {
            sizes: ['XL Table', 'L Table', 'M Table', 'S Table'],
            styles: ['Natural Tones', 'Color Pop', 'Grey Tones', 'Light Tones']
        }
    };

    const CategorySelector = ({ title, options, selectedOption, onOptionSelect }) => {
        return (
            <div className="category-selector">
                <div className="category-title">{title}</div>
                {options.map((option) => (
                    <div
                        key={option}
                        className={`option ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => onOptionSelect(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        AOS.init();
    }, []);

    const handleOptionSelect = (option) => {
        if (currentStep === 1) {
            setSelectedFunction(option);
            setSelectedSize('');
            setSelectedStyle('');
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setSelectedSize(option);
            setCurrentStep(3);
        } else if (currentStep === 3) {
            setSelectedStyle(option);
            NavigateTo(selectedFunction, selectedSize, option);
        }
    };

    return (
        <>
            <Navbar />
            <div className="Steps">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <h2>Space Purpose</h2>
                        <p>Your new space in just <b style={{ color: "#000" }}>3 steps</b>. What? Yes, 3 steps and we will do the rest.</p>
                    </div>

                    <div className='make-card'>
                        <StepIndicator currentStep={currentStep} />
                        <p style={{ textAlign: "center" }}>Select</p>

                        <div className="selectors-container" data-aos="fade-up" data-aos-duration="1000">
                            {currentStep === 1 && (
                                <CategorySelector
                                    title="Choose a function:"
                                    options={Object.keys(categories)}
                                    selectedOption={selectedFunction}
                                    onOptionSelect={handleOptionSelect}
                                />
                            )}

                            {currentStep === 2 && (
                                <CategorySelector
                                    title="Choose a size:"
                                    options={categories[selectedFunction].sizes}
                                    selectedOption={selectedSize}
                                    onOptionSelect={handleOptionSelect}
                                />
                            )}

                            {currentStep === 3 && (
                                <CategorySelector
                                    title="Choose a style:"
                                    options={categories[selectedFunction].styles}
                                    selectedOption={selectedStyle}
                                    onOptionSelect={handleOptionSelect}
                                />
                            )}
                        </div>

                        <div className="navigation-buttons">
                            <button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className="nav-button">
                                <img src="/images/back.svg" alt="BackArrow" />Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Steps;
