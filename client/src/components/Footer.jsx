import React from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiTwitter, FiInstagram, FiMail, FiGithub } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            <FiBriefcase className="footer-brand-icon" />
            CarryTravel
          </Link>
          <p className="footer-tagline">
            Your personal travel assistant. Stop forgetting essentials and pack perfectly for every journey.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Github"><FiGithub /></a>
            <a href="mailto:hello@carrytravel.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
        
        <div className="footer-links-section">
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/planner">Trip Planner</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up Free</Link></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4>Legal & Support</h4>
            <ul>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CarryTravel. Built with care for travelers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
