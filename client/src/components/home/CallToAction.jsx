import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="cta-section section-padding">
      <div className="container text-center">
        <div className="cta-content">
          <h2>Ready to pack like a pro?</h2>
          <p className="cta-subtitle">Join thousands of travelers who have eliminated packing anxiety.</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-primary btn-large">Create Free Account</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
