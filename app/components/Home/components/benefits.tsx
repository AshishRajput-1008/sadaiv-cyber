import React, { useState } from 'react';
import { User, ChevronRight } from 'lucide-react';

export default function CyberTalks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const expertInsights = [
    {
      id: 'apt-defense',
      question: 'How can organizations defend against Advanced Persistent Threats?',
      expert: 'Dr. Sarah Chen',
      role: 'Senior Security Researcher',
      answer: 'Dr. Chen emphasizes multi-layered defenses, including endpoint protection, network monitoring, and employee training to counter sophisticated APTs.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'ai-security',
      question: 'What role does AI play in modern cybersecurity?',
      expert: 'Marcus Rodriguez',
      role: 'AI Security Specialist',
      answer: 'AI enhances threat detection through real-time analytics and predictive modeling, enabling faster response to emerging threats, says Rodriguez.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'zero-trust',
      question: 'What is the core principle of Zero Trust Architecture?',
      expert: 'Emily Watson',
      role: 'Cloud Security Architect',
      answer: 'Watson explains that Zero Trust assumes no user or device is inherently trusted, requiring continuous verification for all access requests.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'threat-hunting',
      question: 'How effective is proactive threat hunting?',
      expert: 'David Kim',
      role: 'Threat Intelligence Lead',
      answer: 'Kim advocates proactive threat hunting using SIEM tools and behavioral analytics to identify threats before they cause significant damage.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'incident-response',
      question: 'What’s key to effective cyber incident response?',
      expert: 'Rachel Thompson',
      role: 'Incident Response Director',
      answer: 'Thompson stresses preparation, clear communication, and rapid containment as critical for minimizing the impact of cyber incidents.',
      gradient: 'from-yellow-500 to-red-600'
    },
    {
      id: 'human-factor',
      question: 'Why is the human element critical in cybersecurity?',
      expert: 'Prof. Michael Adams',
      role: 'Cybersecurity Psychologist',
      answer: 'Adams highlights that social engineering exploits human psychology, making ongoing training essential to strengthen the human firewall.',
      gradient: 'from-indigo-500 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-30"></div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            Cyber Talks
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Expert answers to critical cybersecurity questions, delivering actionable insights for a safer digital world.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertInsights.map((insight) => (
            <div
              key={insight.id}
              className={`relative bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20 ${
                hoveredCard === insight.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(insight.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Top Bar */}
              <div className={`h-1.5 bg-gradient-to-r ${insight.gradient} rounded-t-xl`}></div>

              {/* Card Content */}
              <div className="mt-4">
                {/* User Icon and Expert Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${insight.gradient} flex items-center justify-center`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{insight.expert}</h3>
                    <p className="text-xs text-gray-400">{insight.role}</p>
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {insight.question}
                </h2>

                {/* Answer */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {insight.answer}
                </p>

                {/* Read More */}
                <a
                  href="#"
                  className="flex justify-end items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${insight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <User className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Explore More Insights</span>
          </a>
        </div>
      </div>
    </div>
  );
}