import React from 'react';
import Hero from '../components/home/Hero';
import WhyCarryTravel from '../components/home/WhyCarryTravel';
import HowItWorks from '../components/home/HowItWorks';
import CallToAction from '../components/home/CallToAction';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <WhyCarryTravel />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}
