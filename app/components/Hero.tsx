"use client"


import DonorShowcase from "@/app/components/Home/components/donor"
import DonationPlatform from "@/app/components/Home/components/Donation"
import CharityDonationPage from "@/app/components/Home/components/banner"
import CyberLawsSection from "@/app/components/Home/components/cyberlaws"
import BlogPage from "@/app/components/Home/components/blogs"
import CharitySlider from"@/app/components/Home/components/corporate"
import SparkingStep from "@/app/components/Home/components/sparkingstep"
import CyberTalks from "@/app/components/Home/components/benefits"

import CollaborationSection from "@/app/components/Home/components/collaboration"

export default function Home() {

  return (
    <div className="min-h-screen  ">


<SparkingStep />
      <CharityDonationPage />
      
      <CharitySlider />
      <DonationPlatform />
      <DonorShowcase />
      <CyberLawsSection />
      <CyberTalks />
      <CollaborationSection />
      <BlogPage />

    </div>
  )
}

























// "use client";

// import Image from "next/image";
// import s1 from "@/public/images/Animal2.png";
// import s2 from "@/public/images/camp.png";
// import s3 from "@/public/images/family2.png";
// import s4 from "@/public/images/plant2.png";
// import s5 from "@/public/images/serving2.png";
// import s6 from "@/public/images/pactice.png";

// import logo1 from "../../Assests/images/collab/sadavsatyalogo101.png";
// import logo2 from "../../Assests/images/collab/sadavsatyalogo101.png";
// import logo3 from "../../Assests/images/collab/sadavsatyalogo101.png";

// import i1 from "@/Assests/images/collab/int-1.png";
// import i2 from "@/Assests/images/collab/int-2.png";

// import { useState, useEffect, useRef } from "react";

// import heroImg1 from "../../Assests/images/Hero2/hero1111.png";
// import heroImg2 from "../../Assests/images/Hero2/heroWorkshop.png";
// import heroImg3 from "../../Assests/images/Hero2/HeroCertificate5.png";
// import heroImg4 from "../../Assests/images/Hero2/preventfrauds2.png";

// import StoriesSection from "@/app/components/Storiessection";
// import PartnersSection from "@/app/components/Partnerssection";
// import SiteFooter from "@/app/components/Sitefooter";
// import HeroCarousel, { CarouselSlide } from "@/app/components/HeroCarousel";

// import heroImg from "../../Assests/images/suf1212.png";
// import logoImg from "../../Assests/images/logo.png";
// import aboutImg1 from "../../Assests/images/aboutimg1.jpg";
// import aboutImg2 from "../../Assests/images/about2.jpg";
// import aboutImg3 from "../../Assests/images/about3.jpg";
// import aboutImg4 from "../../Assests/images/about4.jpg";
// import involvedImg from "../../Assests/images/getinvolvedimg.png";

// /* ─────────────────────────────────────────
//    CONSTANTS
// ───────────────────────────────────────── */
// const NAV_LINKS = [
//   { label: "Cyber Article", href: "/cyber-article" },
//   { label: "Sparking Step", href: "/sparking-step" },
//   { label: "Corporate Workshop", href: "/corporate-workshop" },
//   { label: "Cyber News", href: "/cyber-news" },
//   { label: "Cyber Fraud", href: "/cyber-frauds" },
//   { label: "Cyber Laws", href: "/laws" },
//   { label: "Media", href: "/laws" },
// ];

// const INTERVIEW = {
//   tags: ["FEATURED", "TRENDING"],
//   author: "Dr. Priya Singh",
//   date: "January 10, 2025",
//   title: "Cyber Warriors: Training India's Next Generation of Digital Defenders",
//   desc: "Our intensive cybersecurity program has trained over 5,000 youth in ethical hacking, digital forensics, and online safety protocols. Discover how we're building a secure digital future.",
// };

// const ABOUT_IMAGES = [
//   { src: aboutImg1, alt: "Hands holding a flower" },
//   { src: aboutImg2, alt: "Volunteers with donation boxes" },
//   { src: aboutImg3, alt: "Clothing donation drive" },
//   { src: aboutImg4, alt: "People exchanging goods" },
// ];

// const SLIDES: CarouselSlide[] = [
//   { img: heroImg3, alt: "Hero slide 3" },
//   { img: heroImg1, alt: "Hero slide 1" },
//   { img: heroImg2, alt: "Hero slide 2" },
//   { img: heroImg4, alt: "Hero slide 4" },
// ];

// const CARDS = [
//   { num: "01.", title: "Causes", desc: "We support education, healthcare, and poverty reduction.", link: "Know More", href: "/SocialWork" },
//   {
//     num: "02.",
//     title: "Cyber Workshop",
//     desc: "Join our expert-led workshops to learn cyber safety, online fraud prevention.",
//     link: "Explore Workshops",
//     href: "/cyber-workshop",
//   },
//   { num: "03.", title: "Donation", desc: "Contribute today and help us change lives and build a better future.", link: "Learn More", href: "/SocialWork" },
// ];

// const STATS = [
//   { value: 20, suffix: "K+", label: "People served worldwide" },
//   { value: 14, suffix: "M+", label: "Projects funded" },
//   { value: 1.8, suffix: "M", label: "People to take action" },
//   { value: 5246, suffix: "", label: "Partner organizations" },
// ];

// /* ─────────────────────────────────────────
//    ICON COMPONENTS
// ───────────────────────────────────────── */
// const ArrowIcon = () => (
//   <svg viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] shrink-0">
//     <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z" />
//   </svg>
// );

// /* ─────────────────────────────────────────
//    COUNTER HOOK
// ───────────────────────────────────────── */
// function useCountUp(target: number, duration = 2000, started = false) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!started) return;
//     let startTime: number | null = null;

//     const step = (timestamp: number) => {
//       if (startTime === null) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime!) / duration, 1);
//       setCount(progress * target);
//       if (progress < 1) requestAnimationFrame(step);
//     };

//     requestAnimationFrame(step);
//   }, [target, duration, started]);

//   return count;
// }

// /* ─────────────────────────────────────────
//    STAT ITEM
// ───────────────────────────────────────── */
// function StatItem({
//   value,
//   suffix,
//   label,
//   started,
//   borderRightClass,
// }: {
//   value: number;
//   suffix?: string;
//   label: string;
//   started?: boolean;
//   borderRightClass: string;
// }) {
//   const count = useCountUp(value, 2000, started);
//   const display =
//     value >= 1000
//       ? Math.floor(count).toLocaleString()
//       : count < 10
//       ? count.toFixed(1)
//       : Math.floor(count).toString();

//   return (
//     <div className={`px-6 py-9 text-center ${borderRightClass}`}>
//       <span className="mb-2.5 block font-sans text-[40px] font-bold leading-none text-[#2c3a04]">
//         {display}
//         {suffix}
//       </span>
//       <span className="text-sm leading-tight text-[#46512a]">{label}</span>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    OUR IMPACT SECTION
// ───────────────────────────────────────── */
// function OurImpact() {
//   const [started, setStarted] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStarted(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   // Mimics the original nth-child border logic for the 2-col mobile layout
//   const borderClasses = [
//     "border-r border-[#d8dfc8] max-[921px]:border-r-0",
//     "border-r border-[#d8dfc8] max-[921px]:border-r-0",
//     "border-r border-[#d8dfc8] max-[921px]:border-t max-[921px]:border-r",
//     "max-[921px]:border-t",
//   ];

//   return (
//     <section className="bg-[#f7f9f1] px-[60px] py-[36px] max-[921px]:px-7 max-[921px]:py-[72px] max-[544px]:px-5 max-[544px]:py-14" ref={ref}>
//       <div className="mx-auto max-w-[1280px]">
//         {/* Top: heading left + description right */}
//         <div className="mb-14 grid grid-cols-2 items-start gap-[60px] max-[921px]:grid-cols-1 max-[921px]:gap-6">
//           <div>
//             <p className="mb-[55px] font-sans text-xs font-bold uppercase tracking-[2px] text-[#46512a]">Our Impact</p>
//             <h2 className="font-sans text-[42px] font-bold leading-[1.12] text-[#2c3a04] max-[921px]:text-[32px] max-[544px]:text-[26px]">
//               The impact we have made in our community
//             </h2>
//           </div>
//           <p className="pt-[72px] text-[15px] leading-[1.75] text-[#46512a] max-[921px]:pt-0">
//             We have made a significant impact in our community through our
//             non-profit organization. By providing services and support to those
//             in need, we have created a positive change. Our efforts have helped
//             to improve the lives of many and we are committed to continuing to
//             make a difference.
//           </p>
//         </div>

//         {/* Stats row */}
//         <div className="mb-10 grid grid-cols-4 border-y border-[#d8dfc8] max-[921px]:grid-cols-2">
//           {STATS.map((s, i) => (
//             <StatItem key={s.label} {...s} started={started} borderRightClass={borderClasses[i]} />
//           ))}
//         </div>

//         {/* CTA banner */}
//         <div className="flex items-center justify-between gap-6 rounded-xl bg-[#66b40b] px-10 py-8 max-[921px]:flex-col max-[921px]:px-6 max-[921px]:py-7 max-[921px]:text-center">
//           <div className="flex flex-col gap-1.5">
//             <h3 className="font-sans text-2xl font-bold text-white max-[544px]:text-xl">We can create a better tomorrow</h3>
//             <p className="text-sm text-white/90">
//               Every rupees counts and helps us bring hope and essential resources to those in need.
//             </p>
//           </div>
//           <a
//             href="#donate"
//             className="inline-block shrink-0 whitespace-nowrap rounded-lg bg-white px-7 py-3.5 font-sans text-[15px] font-bold text-[#2c3a04] transition-colors duration-200 hover:bg-[#f0a500] hover:text-white"
//           >
//             Donate Now
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────────────────────────────────
//    GET INVOLVED SECTION
// ───────────────────────────────────────── */
// const INVOLVEMENT_OPTIONS = [
//   {
//     label: "Volunteer",
//     title: "Join hands as a Cyber Volunteer",
//     desc: "Be part of our on-ground and digital campaigns — conduct cyber awareness sessions, support workshops, and help us reach schools, colleges and rural communities.",
//     href: "/Volunteer",
//     cta: "Become a Volunteer",
//   },
//   {
//     label: "Donate",
//     title: "Support our mission with a donation",
//     desc: "Every contribution helps us run cyber fraud awareness drives, distribute essentials to families in need, and plant trees for a greener tomorrow. 80G tax benefits available.",
//     href: "/Donate",
//     cta: "Donate Now",
//   },
//   {
//     label: "Membership",
//     title: "Become a Sadaiv Cyber Member",
//     desc: "Get access to exclusive cyber safety resources, early workshop registrations, and be part of a growing community committed to a safer digital India.",
//     href: "/Membership",
//     cta: "Join Membership",
//   },
//   {
//     label: "Partner",
//     title: "Partner with us for CSR",
//     desc: "Collaborate with Sadaiv Yuva Foundation on CSR-funded programs in cyber education, community welfare, and environmental sustainability.",
//     href: "/Collaborations",
//     cta: "Explore Partnership",
//   },
// ];

// function GetInvolved() {
//   const [active, setActive] = useState(0);
//   const current = INVOLVEMENT_OPTIONS[active];

//   return (
//     <section className="bg-[#f7f9f1] px-[60px] pb-10 max-[921px]:px-7 max-[921px]:pb-[72px] max-[544px]:px-5 max-[544px]:pb-14">
//       <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center gap-20 max-[921px]:grid-cols-1 max-[921px]:gap-12">
//         {/* Left image */}
//         <div className="relative aspect-square w-full overflow-hidden rounded-[18px]">
//           <Image
//             src={i2.src}
//             alt={current.title}
//             fill
//             style={{ objectFit: "contain" }}
//             sizes="(max-width: 921px) 90vw, 44vw"
//           />
//         </div>

//         {/* Right text */}
//         <div className="flex flex-col gap-5">
//           <span className="font-sans text-xs font-bold uppercase tracking-[2px] text-[#46512a]">
//             Get Involved
//           </span>

//           {/* Option tabs */}
//           <div className="flex flex-wrap gap-2">
//             {INVOLVEMENT_OPTIONS.map((option, idx) => (
//               <button
//                 key={option.label}
//                 onClick={() => setActive(idx)}
//                 className={`rounded font-sans text-[11px] font-bold tracking-wide transition-colors duration-200 ${
//                   idx === active ? "text-white" : "text-[#2c3a04]"
//                 }`}
//                 style={{
//                   background: idx === active ? "#66b40b" : "#e7edd9",
//                   padding: "6px 14px",
//                 }}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>

//           <h2 className="font-sans text-[44px] font-bold leading-[1.12] text-[#2c3a04] max-[921px]:text-[34px] max-[544px]:text-[28px]">
//             {current.title}
//           </h2>

//           <p className="text-[15px] leading-[1.75] text-[#46512a]">{current.desc}</p>

//           <p className="text-sm leading-relaxed text-[#46512a] opacity-70">
//             Sadaiv Yuva Foundation · 12A / 80G / CSR Fund Approved
//           </p>

//           <a
//             href={current.href}
//             className="inline-flex w-fit items-center justify-center rounded-lg border-[1.5px] border-[#2c3a04] px-8 py-3.5 font-sans text-[15px] font-bold text-[#2c3a04] transition-colors duration-200 hover:bg-[#2c3a04] hover:text-white"
//           >
//             {current.cta}
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────────────────────────────────
//    MAIN PAGE COMPONENT
// ───────────────────────────────────────── */
// export default function NonProfitHome() {
//   return (
// <div id="page" className="mt-[170px] md:mt-[140px] mx-4 flex min-h-screen flex-col">
//   {/* ══ HERO ══ */}
//   <HeroCarousel slides={SLIDES} />

//   {/* ══ CARDS + ABOUT WRAPPER ══ */}
//   <div className="flex flex-col-reverse min-[922px]:flex-col">

//     {/* ══ CARDS SECTION ══ */}
//     <div className="relative z-[3] bg-[#fdf3ea] px-0 pb-5 pt-[22px] md:pt-[50px]">
//       <div className="mx-10 grid grid-cols-3 overflow-hidden rounded-2xl bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)] max-[921px]:mx-5 max-[921px]:grid-cols-1 max-[544px]:mx-4">
//         {CARDS.map(({ num, title, desc, link, href }, i) => (
//           <div
//             key={num}
//             className={`flex flex-col gap-3 px-10 pb-9 pt-10 max-[544px]:px-6 max-[544px]:py-7 ${
//               i < CARDS.length - 1
//                 ? "border-r border-[#e8e8e8] max-[921px]:border-b max-[921px]:border-r-0"
//                 : ""
//             }`}
//           >
//             <div className="mb-1 font-sans text-[42px] font-bold leading-none text-[#e8d5c8]">{num}</div>
//             <h5 className="font-sans text-xl font-bold text-[#111]">{title}</h5>
//             <p className="flex-1 text-[15px] leading-relaxed text-[#555]">{desc}</p>
//             <a
//               href={href}
//               className="mt-2 inline-flex items-center gap-2 font-sans text-[15px] font-bold text-[#111] transition-[gap] duration-200 hover:gap-3.5"
//             >
//               {link}
//               <ArrowIcon />
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* ══ ABOUT SECTION ══ */}
//   {/* ══ ABOUT SECTION ══ */}
// <section className="bg-[#fbf2e9] px-[60px] py-[100px] max-[921px]:px-7 max-[921px]:py-[72px] max-[544px]:px-5 max-[544px]:py-14">
//   <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center gap-20 max-[921px]:grid-cols-1 max-[921px]:gap-12 max-[544px]:gap-9">
//     {/* Left — text */}
//     <div className="flex flex-col gap-[22px]">
//       <span className="font-sans text-xs font-bold uppercase tracking-[2px] text-[#46512a]">About Us</span>

//       <h2 className="font-sans text-[44px] font-bold leading-[1.12] text-[#2c3a04] max-[921px]:text-[34px] max-[544px]:text-[28px]">
//         Our journey of compassion and hope
//       </h2>

//       <p className="text-[15px] leading-[1.75] text-[#46512a]">
//         Sadaiv Yuva Foundation is a 12A / 80G / CSR Fund approved non-profit
//         working at the intersection of{" "}
//         <span className="font-semibold text-[#2c3a04]">cyber safety</span> and{" "}
//         <span className="font-semibold text-[#2c3a04]">social good</span>.
//         From educating families on cyber fraud and digital rights to feeding
//         the hungry, supporting rural communities, and restoring green cover —
//         we build a safer, kinder India one step at a time.
//       </p>

//       <p className="text-sm leading-relaxed text-[#46512a] opacity-70">
//         A transformational journey towards bringing hope, awareness and
//         compassion to the world — online and offline.
//       </p>

//       {/* Focus areas */}
//       <ul className="mt-1 grid grid-cols-2 gap-x-6 gap-y-3 max-[380px]:grid-cols-1">
//         {[
//           "Cyber Fraud Awareness",
//           "Digital Rights Education",
//           "Community & Food Support",
//           "Environmental Action",
//         ].map((item) => (
//           <li key={item} className="flex items-center gap-2.5">
//             <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#2c3a04]">
//               <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                 <path
//                   d="M2 6.5L4.5 9L10 3"
//                   stroke="#fbf2e9"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//             <span className="text-[13.5px] font-semibold text-[#2c3a04]">{item}</span>
//           </li>
//         ))}
//       </ul>
// <a
      
//         href="/SocialWork"
//         className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border-[1.5px] border-[#2c3a04] px-8 py-3.5 font-sans text-[15px] font-bold text-[#2c3a04] transition-colors duration-200 hover:bg-[#2c3a04] hover:text-white"
//       >
//         Read More
//       </a>

//       {/* Stats strip */}
//       <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#2c3a04]/15 pt-6 max-[380px]:grid-cols-1 max-[380px]:gap-3">
//         {[
//           { value: "50K+", label: "Lives Impacted" },
//           { value: "300+", label: "Cyber Workshops" },
//           { value: "12A/80G", label: "CSR Approved" },
//         ].map((stat) => (
//           <div key={stat.label} className="flex flex-col gap-0.5">
//             <span className="font-sans text-2xl font-bold text-[#2c3a04] max-[544px]:text-xl">
//               {stat.value}
//             </span>
//             <span className="text-[12px] font-medium uppercase tracking-wide text-[#46512a] opacity-70">
//               {stat.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Right — staggered 2×2 image grid */}
//     <div className="grid grid-cols-2 items-start gap-3.5 max-[544px]:gap-2.5">
//       <div className="flex flex-col gap-3.5">
//         <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] max-[544px]:rounded-xl">
//           <Image src={s1.src} alt={ABOUT_IMAGES[0].alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 921px) 45vw, 22vw" />
//         </div>
//         <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[18px] max-[544px]:rounded-xl">
//           <Image src={s2.src} alt={ABOUT_IMAGES[1].alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 921px) 45vw, 22vw" />
//         </div>
//       </div>
//       <div className="flex flex-col gap-3.5">
//         <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[18px] max-[544px]:rounded-xl">
//           <Image src={s3.src} alt={ABOUT_IMAGES[2].alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 921px) 45vw, 22vw" />
//         </div>
//         <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] max-[544px]:rounded-xl">
//           <Image src={s4.src} alt={ABOUT_IMAGES[3].alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 921px) 45vw, 22vw" />
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//   </div>

//   {/* ══ GET INVOLVED SECTION ══ */}
//   <GetInvolved />

//   {/* ══ OUR IMPACT SECTION ══ */}
//   <OurImpact />

//   <StoriesSection />
//   {/* <PartnersSection /> */}
//   <SiteFooter />
// </div>
//   );
// }