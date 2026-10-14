
"use client";

import Navigation from '../components/CyberLaw//components/Navigation';
import HeroSection from  '../components/CyberLaw//components/HeroSection';
import CrimeTimeline from  '../components/CyberLaw/components/CrimeTimeline';
import CyberLawsSection from '../components/CyberLaw/components/CyberLawsSection';
import DigitalRightsSection from '../components/CyberLaw/components/DigitalRightsSection';
import ReportSection from '../components/CyberLaw/components/ReportSection';
import GoldenRulesSection from '../components/CyberLaw/components/GoldenRulesSection';
import FAQSection from '../components/CyberLaw/components/FAQSection';
import Footer from '../components/CyberLaw/components//Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-body text-slate-900">
        {/* <Navigation /> */}
      <HeroSection />
      <CyberLawsSection />
      <DigitalRightsSection />
      <ReportSection />
      <GoldenRulesSection />
          
      <FAQSection />
        <CrimeTimeline />
      {/* <Footer /> */}
    </div>
  );
}
