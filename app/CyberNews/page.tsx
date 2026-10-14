"use client";

import Navbar from '@/app/components/CyberNews/components/Navbar';
import NewsroomHero from '@/app/components/CyberNews/components/NewsroomHero';
import FeaturedNews from '@/app/components/CyberNews/components/FeaturedNews';
import IndianNews from '@/app/components/CyberNews/components/IndianNews';
import GlobalNews from '@/app/components/CyberNews/components/GlobalNews';
import ThreatIntelligence from '@/app/components/CyberNews/components/ThreatIntelligence';
import PodcastHub from '@/app/components/CyberNews/components/PodcastHub';
import SadaivSatyaCollab from '@/app/components/CyberNews/components/SadaivSatyaCollab';
import KnowledgeCenter from '@/app/components/CyberNews/components/KnowledgeCenter';
import Newsletter from '@/app/components/CyberNews/components/Newsletter';
import FinalCTA from '@/app/components/CyberNews/components/FinalCTA';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      {/* <NewsroomHero /> */}
      <FeaturedNews />
      {/* <IndianNews /> */}
            {/* <PodcastHub /> */}
      {/* <GlobalNews /> */}
      {/* <ThreatIntelligence /> */}

      <SadaivSatyaCollab />

      
      {/* <KnowledgeCenter /> */}
      {/* <Newsletter /> */}
      <FinalCTA />
    </div>
  );
}

export default App;
