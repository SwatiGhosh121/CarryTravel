import React from 'react';
import { FiMapPin, FiList, FiCheckCircle } from 'react-icons/fi';

export default function HowItWorks() {
  return (
    <section className="how-it-works-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>How It Works</h2>
          <p className="section-description">Three simple steps to a perfectly packed bag.</p>
        </div>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-icon"><FiMapPin /></div>
            <div className="step-number">01</div>
            <h4>Tell us about your trip</h4>
            <p>Enter your destination, duration, and whether it's for business or leisure.</p>
          </div>
          <div className="step-item">
            <div className="step-icon"><FiList /></div>
            <div className="step-number">02</div>
            <h4>Review your smart list</h4>
            <p>We generate a personalized checklist. You can add custom items or remove what you don't need.</p>
          </div>
          <div className="step-item">
            <div className="step-icon"><FiCheckCircle /></div>
            <div className="step-number">03</div>
            <h4>Pack and go</h4>
            <p>Check off items as they go into your suitcase. Travel with 100% confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
