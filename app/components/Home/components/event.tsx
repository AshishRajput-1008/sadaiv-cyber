'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Users, Sparkles, BookOpenCheck, Lightbulb, Brain } from 'lucide-react';

type EventInfo = {
  title: string;
  whatWeDid: string;
  impact: string;
  outcome: string;
  badge: string;
};

const SparkingStepSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'overview'>('current');

  const events: Record<'current' | 'overview', EventInfo[]> = {
    current: [
      {
        title: 'Cyber Awareness Drive',
        whatWeDid: 'Hosted digital safety workshops across 10 colleges.',
        impact: 'Over 2,000 students trained in identifying phishing & scams.',
        outcome: '35% increase in digital hygiene and incident reporting.',
        badge: '🚀 Awareness Unleashed',
      },
      {
        title: 'AI for School Kids',
        whatWeDid: 'Simplified AI learning with hands-on games and sessions.',
        impact: 'Engaged 250+ students in practical ML projects.',
        outcome: 'Boosted creative confidence and future tech interest.',
        badge: '🤖 Minds Sparked',
      },
      {
        title: 'Digital Rights Explained',
        whatWeDid: 'Conducted an open session on privacy laws & rights.',
        impact: 'Helped 500+ participants understand cyber law basics.',
        outcome: '80% adopted new privacy habits and reported threats.',
        badge: '🛡️ Law & Liberty',
      },
      {
        title: 'Women in Cybersecurity',
        whatWeDid: 'Panel with women CISOs, developers, and founders.',
        impact: 'Motivated 120+ girls to take interest in cyber tech.',
        outcome: '15+ students enrolled in security bootcamps.',
        badge: '🌸 Empower Her',
      },
      {
        title: 'Village Digital Uplift',
        whatWeDid: 'Introduced internet safety for rural families and youth.',
        impact: 'Reached 400+ villagers in 3 districts.',
        outcome: 'Doubled safe digital use in those regions.',
        badge: '🌱 Grassroot Impact',
      },
      {
        title: 'HackShield Simulation',
        whatWeDid: 'Gamified cyber attacks & defense simulation with teams.',
        impact: 'Students simulated live phishing attacks & defenses.',
        outcome: 'Real-time learning led to stronger prevention mindsets.',
        badge: '🔥 Real Skills Built',
      },
    ],
    overview: [
      {
        title: 'Campaign: Think Before You Click',
        whatWeDid: 'Social media storytelling around real cybercrime cases.',
        impact: 'Reached 40K+ online users through reels & infographics.',
        outcome: 'Sparked 18K shares and boosted digital awareness.',
        badge: '📣 Viral Safety',
      },
      {
        title: 'Mobile Masterclass for Elders',
        whatWeDid: 'Taught seniors how to use phones safely.',
        impact: '100+ elderly citizens trained across 2 cities.',
        outcome: 'Built trust and safety in their digital life.',
        badge: '👵 Bridging the Gap',
      },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-orange-200 rounded-full blur-2xl opacity-40 -z-10" />

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-orange-600 mb-3">✨ Sparking Steps</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Discover how our actions shaped real impact in communities — empowering every generation with cyber safety.
        </p>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-10 space-x-4">
          <button
            className={`px-6 py-2 font-semibold rounded-full transition-all ${
              activeTab === 'current'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white border border-orange-300 text-orange-500'
            }`}
            onClick={() => setActiveTab('current')}
          >
            Current Sparking
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-full transition-all ${
              activeTab === 'overview'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white border border-orange-300 text-orange-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Sparking Overview
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events[activeTab].map((event, index) => (
            <div
              key={index}
              className="relative bg-white border border-orange-100 hover:border-orange-300 transition-all rounded-xl shadow-md p-6 hover:shadow-xl text-left"
            >
              <span className="absolute top-4 right-4 text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded-full font-medium">
                {event.badge}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold text-orange-500">💡 What We Did:</span> {event.whatWeDid}
                </p>
                <p>
                  <span className="font-semibold text-orange-500">🌟 Impact:</span> {event.impact}
                </p>
                <p>
                  <span className="font-semibold text-orange-500">🎯 Outcome:</span> {event.outcome}
                </p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 w-full mt-4 text-white">
                Know More
              </Button>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 max-w-3xl mx-auto bg-orange-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-700 text-lg italic">
            “We don’t just run events — we light digital futures. Every action is a spark toward a safer tomorrow.”
          </p>
          <p className="mt-2 text-sm font-semibold text-orange-500">— Cyber Foundation</p>
        </div>
      </div>
    </section>
  );
};

export default SparkingStepSection;
