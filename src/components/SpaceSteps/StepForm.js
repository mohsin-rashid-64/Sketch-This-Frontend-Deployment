import React, { useState } from 'react';
import './StepForm.scss';

function StepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({ step1: '', step2: '', step3: '' });

  const titles = [
    "Space purpose",
    "Space size",
    "Space Palette"
  ];

  const handleRadioChange = (step, value) => {
    setSelections(prev => ({ ...prev, [step]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
   console.log(selections);
  };

  return (
    <div className="StepBack">
      <div className="container">
        <div className="title" data-aos="fade-up"
          data-aos-duration="1000">
          <h2>{titles[currentStep - 1]}</h2>
          <p>Your new space in just <b style={{ color: "#000" }}>3 steps</b>. What? Yes, 3 steps and we will do the rest.</p>
        </div>
        <div className="card" data-aos="fade-up"
          data-aos-duration="1000">
          <div className="steps">
            <div className="step-indicators">
              {[1, 2, 3].map(step => (
                <div key={step} className={`step-indicator ${currentStep === step ? 'active' : currentStep + 1 === step ? 'next' : ''}`}>
                  {step}
                </div>
              ))}
            </div>
            <div className="step-connections">
              <div className={`connection ${currentStep > 1 ? 'active' : ''}`}></div>
              <div className={`connection ${currentStep > 2 ? 'active' : ''}`}></div>
            </div>
          </div>

          {currentStep === 1 && (
            <Step
              step="step1"
              selectedValue={selections.step1}
              onChange={handleRadioChange}
            />
          )}
          {currentStep === 2 && (
            <Step
              step="step2"
              selectedValue={selections.step2}
              onChange={handleRadioChange}
            />
          )}
          {currentStep === 3 && (
            <Step
              step="step3"
              selectedValue={selections.step3}
              onChange={handleRadioChange}
            />
          )}

          <div className="buttons">
            <button className={`back-button ${currentStep === 1 ? 'first-step' : ''}`} onClick={prevStep}><img src="/images/back.svg" alt="back" />Back</button>
            <div className="help">
              <img src="/images/help.svg" alt="help" />
              <span>Help</span>
            </div>
            {currentStep < 3 && <button className="next-button" onClick={nextStep}>Next Step <img src="/images/next.svg" alt="next" /></button>}
            {currentStep === 3 && <button className="submit-button" onClick={handleSubmit}>Next Step <img src="/images/next.svg" alt="next" /></button>}
          </div>
        </div>
      </div>
    </div>

  );
}


const optionsData = {
  step1: [
    { text: "Sleep", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Entertain", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Dining", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Bath", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" }
  ],
  step2: [
    { text: "Sectional", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Sofa", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Loveseat", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Chair", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" }
  ],
  step3: [
    { text: "Natural Tones", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Color Pop", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Grey Tones", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" },
    { text: "Light Tones", image: "/images/uncheck.svg", selectedImage: "/images/check.svg" }
  ]
};

function Step({ step, selectedValue, onChange }) {
  return (
    <div className="options">
      <p className="select">Select</p>
      <img className='chooseStyle' src="/images/chooseStyle.svg" alt="chooseStyle" />
      {optionsData[step].map((option, index) => (
        <button
          key={index}
          className={`option-button ${selectedValue === String(index + 1) ? 'selected' : ''}`}
          onClick={() => onChange(step, String(index + 1))}
        >
          <img src={selectedValue === String(index + 1) ? option.selectedImage : option.image} alt={`Option ${index + 1}`} />
          <span>{option.text}</span>
        </button>
      ))}
    </div>
  );
}


export default StepForm;
