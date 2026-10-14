'use client'
import Navbar from '@/app/components/CyberFraud/components/Navbar';
import HeroSection from '@/app/components/CyberFraud/components/HeroSection';
import WhatIsCyberSecurity from '@/app/components/CyberFraud/components/WhatIsCyberSecurity';
import WhatIsCyberCrime from '@/app/components/CyberFraud/components/WhatIsCyberCrime';
import CrimeCategories from '@/app/components/CyberFraud/components/CrimeCategories';
import AttackTimeline from '@/app/components/CyberFraud/components/AttackTimeline';
import ExpertInsights from '@/app/components/CyberFraud/components/ExpertInsights';
import GoldenRules from '@/app/components/CyberFraud/components/GoldenRules';
import SafetyToolkit from '@/app/components/CyberFraud/components/SafetyToolkit';
import FinalCTA from '@/app/components/CyberFraud/components/FinalCTA';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <WhatIsCyberSecurity />
      <WhatIsCyberCrime />
      <CrimeCategories />
      <AttackTimeline />
      <ExpertInsights />
      <GoldenRules />
      <SafetyToolkit />
      <FinalCTA />
    </div>
  );
}

export default App;
