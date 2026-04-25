import React from 'react';
import { FiCheckSquare, FiList, FiSmile, FiShield } from 'react-icons/fi';

export default function WhyCarryTravel() {
  return (
    <section className="features-section section-padding bg-surface">
      <div className="container">
        <div className="section-header text-center">
          <h2>Why CarryTravel?</h2>
          <p className="section-description">We solve the chaos of packing so you can focus on the journey.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper"><FiCheckSquare className="feature-icon" /></div>
            <h3>Smart Logic</h3>
            <p>Our system suggests items you actually need based on your specific destination and travel purpose.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><FiList className="feature-icon" /></div>
            <h3>Organized Checklist</h3>
            <p>Your items are neatly categorized into clothes, gadgets, and documents so nothing gets left behind.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><FiSmile className="feature-icon" /></div>
            <h3>Stress-Free Departure</h3>
            <p>Enjoy peace of mind. Check items off as you pack them and confidently head out the door.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><FiShield className="feature-icon" /></div>
            <h3>Secure & Synced</h3>
            <p>All your packing lists are securely saved to your account and accessible from any device.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
