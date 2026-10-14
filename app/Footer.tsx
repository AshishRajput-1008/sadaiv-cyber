// import React from "react";


// import { Phone } from "lucide-react";

// import {
//   FaFacebook,
//   FaXTwitter,
//   FaInstagram,
//   FaYoutube,
//   FaLinkedin,
//   FaWhatsapp,
// } from "react-icons/fa6";
// import Link from "next/link";
// import Image from "next/image";


// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-16 py-12">
//         {/* Top Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Logo + Address */}
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <Image 
//                 src="/Sadaiv_logo.png" 
//                 alt="Sadaiv Yuva Foundation Logo" 
//                 width={80} 
//                 height={80}
//                 className="object-contain"
//               />
//               <span className="text-orange-500 text-2xl font-bold uppercase">
//                 Sadaiv Yuva Foundation
//               </span>
//             </div>

//             <div className="space-y-2 text-sm text-gray-300">
//               <p>
//                 <strong>Address:</strong> B1, Patel Nagar, Raisen road
//               </p>
//               <p>Near HP Petrol Pump, Bhopal (MP) Pin: 462022</p>
//               <p className="flex items-center gap-2">
//                 <FaWhatsapp className="h-4 w-4 text-green-500" /> +91 92438 37546
//               </p>
//               <p className="flex items-center gap-2">
//                 <Phone className="h-4 w-4 text-blue-400" /> +91 755 485 9540
//               </p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Useful Navigation</h3>
//             <ul className="space-y-2 text-sm">
//               {[
//                 { name: "About Us", href: "/About-Us" },
//                 { name: "Cyber Tips", href: "/cybertips" },
//                 { name: "Sparking Steps", href: "/currentsparking" },
//                 { name: "Corporate Workshop", href: "/corporateworkshop" },
//                 { name: "Cyber Talks", href: "/cybertalks" },
//                 { name: "Testimonials", href: "/testimonials" },
//                 { name: "Cyber Frauds", href: "/cyberfraud" },
//                 { name: "Media", href: "/blog" },
//               ].map((item, i) => (
//                 <li key={i}>
//                   <Link
//                     href={item.href}
//                     className="text-gray-300 hover:text-orange-500 transition-colors"
//                   >
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Collaboration */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Our Collaboration</h3>
//             <ul className="space-y-2 text-sm">
//               {[
//                 { name: "Payzon India Pvt. Ltd.", href: "https://payzonindia.com" },
//                 { name: "Sadaiv Satya News", href: "#" },
//                 { name: "Smart Tax Idea", href: "#" },
//                 { name: "Ineffable Spark", href: "#" },
//               ].map((item, i) => (
//                 <li key={i}>
//                   <Link
//                     href={item.href}
//                     className="text-gray-300 hover:text-orange-500 transition-colors"
//                     target={item.href.startsWith('http') ? "_blank" : "_self"}
//                     rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
//                   >
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Connect + Social */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Connect</h3>
//             <ul className="space-y-2 text-sm mb-6">
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-gray-300 hover:text-orange-500 transition-colors"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>

//            <h4 className="text-base font-semibold mb-3">Follow Us</h4>

// <div className="flex space-x-3">
//   {[
//     {
//       icon: <FaFacebook className="h-4 w-4" />,
//       link: "https://www.facebook.com/SadaivYuvaFoundation",
//       label: "Facebook",
//     },
//     {
//       icon: <FaXTwitter className="h-4 w-4" />,
//       link: "https://x.com/sadaivyuvafoundation",
//       label: "X",
//     },
//     {
//       icon: <FaInstagram className="h-4 w-4" />,
//       link: "https://www.instagram.com/sadaivyuvafoundation",
//       label: "Instagram",
//     },
//     {
//       icon: <FaYoutube className="h-4 w-4" />,
//       link: "https://www.youtube.com/@sadaivyuvafoundation",
//       label: "YouTube",
//     },
//     {
//       icon: <FaLinkedin className="h-4 w-4" />,
//       link: "https://www.linkedin.com/company/110662452/admin/page-posts/published/",
//       label: "LinkedIn",
//     },
//   ].map((item, i) => (
//     <Link
//       key={i}
//       href={item.link}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={item.label}
//       className="w-9 h-9 rounded bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors"
//     >
//       {item.icon}
//     </Link>
//   ))}
// </div>
//           </div>
//         </div>

//         {/* Bottom Section with Policy Links */}
//         <div className="border-t border-gray-700 mt-10 pt-6">
//           {/* Policy Links */}
//           <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-sm">
//             <Link
//               href="/privacy-policy"
//               className="text-gray-400 hover:text-orange-500 transition-colors"
//             >
//               Privacy Policy
//             </Link>
//             <span className="text-gray-600">|</span>
//             <Link
//               href="/Terms&Condition"
//               className="text-gray-400 hover:text-orange-500 transition-colors"
//             >
//               Terms & Conditions
//             </Link>
//             <span className="text-gray-600">|</span>
//             <Link
//               href="/Refund&Cancellation"
//               className="text-gray-400 hover:text-orange-500 transition-colors"
//             >
//               Refund & Cancellation
//             </Link>
//             <span className="text-gray-600">|</span>
//             <Link
//               href="/Shippingpolicy"
//               className="text-gray-400 hover:text-orange-500 transition-colors"
//             >
//               Shipping Policy
//             </Link>
//           </div>

//           {/* Copyright */}
//           <p className="text-gray-400 text-sm text-center">
//             © {currentYear} Sadaiv Yuva Foundation — All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






'use client';

import Image from "next/image";
import logo from "@/Assests/images/logo.png"

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Cyber Article', href: '/CyberArticle' },
      { label: 'Sparking Step', href: '/SparkingStep' },
      { label: 'Workshop', href: '/CyberWorkshop' },
      { label: 'Cyber News', href: '/CyberNews' },
      { label: 'Inspiring Journeys', href: '/InspringJourneys' },
        { label: 'Social Work', href: '/SocialWork' },
 
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Cyber Fraud', href: '/CyberFraud' },
      { label: 'Our Profile', href: '/AboutUs' },
      { label: 'Cyber Law', href: '/CyberLaw' },
      { label: 'Collaborations', href: '/Collaborator' },
           { label: 'Podcasts', href: '/CyberPodcasts' },
           { label: 'Contact Us', href: '/ContactUs' },
    
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2017] py-16 px-10 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-28 h-36 rounded-full overflow-hidden flex items-center justify-center">
              <Image src={logo} alt="Sadaiv Yuva Foundation Logo" width={90} height={90} className="object-contain" />
            </div>
            <span className="text-white/80 text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Sadaiv Yuva Foundation
            </span>
          </div>
          <p className="text-white/30 text-[17px] leading-relaxed ml-4" style={{ fontFamily: 'var(--font-body)' }}>
            A youth-led national NGO committed to building an equitable India through community-driven action.
          </p>
        </div>
        <div className="flex flex-wrap gap-16">
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(l => (
                  <a key={l.label} href={l.href} className="text-white/50 hover:text-white text-sm transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between gap-4">
        <p className="text-white/20 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
          © 2026 Sadaiv Yuva Foundation. All rights reserved.
        </p>
        <p className="text-white/20 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
          Registered under Societies Registration Act · CIN: U85300MP2018SGC0XXXXX
        </p>
      </div>
    </footer>
  );
}