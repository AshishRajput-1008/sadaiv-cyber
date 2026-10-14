'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import s1 from "@/public/images/Animal2.png"
import s2 from "@/public/images/camp.png"
import s3 from "@/public/images/family2.png"
import s4 from "@/public/images/plant2.png"
import s5 from "@/public/images/serving2.png"
import s6 from "@/public/images/pactice.png"

const stories = [
  {
    tag: 'Cyber Awareness',
    year: '2024',
    headline: 'Safe Screens, Safer Lives',
    body: 'Our "CyberSafe India" campaign reached 62,000 students through school assemblies, street plays, and social media workshops — covering phishing, UPI frauds, OTP scams, and deepfake awareness. We documented 340 cases where awareness directly prevented online fraud or harassment.',
    stat: '62,000',
    statLabel: 'Students reached',
    image: s2.src,
    imageAlt: 'Cyber awareness program',
    reverse: false,
    accent: '#14532D',
  },
  {
    tag: 'Community Welfare',
    year: '2022–24',
    headline: 'Dignity, One Drive at a Time',
    body: 'From food and clothing distribution to free medical check-up camps and disaster relief, our community welfare programs have touched thousands of families across urban and rural India — ensuring no one is left without basic necessities or dignity.',
    stat: '15,000+',
    statLabel: 'Lives reached',
    image: s5.src,
    imageAlt: 'Community welfare and food distribution drive',
    reverse: true,
    accent: '#B45309',
  },
  {
    tag: 'Education',
    year: '2023',
    headline: 'Where Classrooms Have No Walls',
    body: 'In 23 villages across Madhya Pradesh, Sadaiv Yuva volunteers set up open-air learning centers — bringing government school dropouts back into structured learning through school enrollment drives, free tuition, STEM sessions, and career counselling.',
    stat: '2,000+',
    statLabel: 'Students educated',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80&fit=crop',
    imageAlt: 'Children learning outdoors',
    reverse: false,
    accent: '#14532D',
  },
  {
    tag: 'Digital Literacy',
    year: '2024',
    headline: 'The First Tap Changes Everything',
    body: 'In collaboration with state e-governance cells, we deployed 42 digital literacy labs across rural Bihar and Jharkhand — training youth in computer basics, internet safety, and digital banking. For thousands, this was their first meaningful interaction with a computer.',
    stat: '42',
    statLabel: 'Digital labs deployed',
   image: s6.src,
    imageAlt: 'Digital literacy session',
    reverse: true,
    accent: '#B45309',
  },
  {
    tag: 'Underprivileged Families',
    year: '2023–24',
    headline: 'Every Family Deserves a Foundation',
    body: 'Through nutritious food distribution, educational scholarships, school uniform drives, healthcare assistance, and clean drinking water initiatives, we have supported over 500 families in building a more stable and hopeful future for their children.',
    stat: '500+',
    statLabel: 'Families supported',
    image: s3.src,
    imageAlt: 'Family support and welfare program',
    reverse: false,
    accent: '#14532D',
  },
  {
    tag: 'Animal Welfare',
    year: '2022–24',
    headline: 'Every Life Deserves Compassion',
    body: 'Our animal rescue operations cover emergency veterinary assistance, daily street feeding programs, vaccination and sterilisation drives, and disaster-time rescue. Over 300 animals have been treated, rehabilitated, and rehomed through our shelter network and adoption campaigns.',
    stat: '300+',
    statLabel: 'Animals rescued & treated',
    image: s1.src,
    imageAlt: 'Animal rescue and welfare initiative',
    reverse: true,
    accent: '#B45309',
  },
  {
    tag: 'Environment',
    year: '2022–24',
    headline: 'Roots Run Deeper Than Headlines',
    body: 'SYF planted 1.4 lakh saplings across degraded forest edges in MP, Uttarakhand, and Maharashtra — with a 78% survival rate. Each tree is community-owned, GPS-tagged, and maintained by local youth groups through plastic-free and clean-up drives.',
    stat: '1.4 Lakh',
    statLabel: 'Saplings planted',
  image: s4.src,
    imageAlt: 'Tree plantation drive',
    reverse: false,
    accent: '#14532D',
  },

];

function StoryBlock({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${story.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 min-h-[520px]`}
    >
      {/* Image side */}
      <div className="relative w-full md:w-[55%] overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full min-h-[340px] md:min-h-full"
          style={{
            backgroundImage: `url('${story.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Tag overlay */}
          <div className="absolute top-8 left-8">
            <span
              className="bg-white/95 text-[10px] tracking-[0.3em] uppercase px-3 py-1.5"
              style={{ fontFamily: 'var(--font-mono)', color: story.accent }}
            >
              {story.tag}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content side */}
      <div
        className={`w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 py-16 md:py-20 ${index % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-[#FCFCFA]'}`}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#888880] mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            {story.year}
          </p>
          <div className="w-10 h-[2px] bg-[#B45309] mb-8" />
          <h3
            className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-[#1a1a18]"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            {story.headline}
          </h3>
          <p className="text-[#4a4a42] leading-relaxed text-base mb-10" style={{ fontFamily: 'var(--font-body)' }}>
            {story.body}
          </p>
          <div className="flex items-baseline gap-3">
            <span
              className="text-5xl font-black"
              style={{ fontFamily: 'var(--font-heading)', color: story.accent, letterSpacing: '-0.03em' }}
            >
              {story.stat}
            </span>
            <span className="text-sm text-[#888880] max-w-[120px] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
              {story.statLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ImpactDocumentary() {
  return (
    <section className="py-24 bg-[#FCFCFA]">
      <div className="px-10 md:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Impact Documentary
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-[#1a1a18] leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            Eight fields.
            <br />
            <span className="text-[#14532D]">One mission.</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {stories.map((story, i) => (
          <StoryBlock key={story.tag} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}