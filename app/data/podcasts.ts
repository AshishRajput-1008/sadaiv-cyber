// lib/data.ts
// Centralized editorial content for the Cyber Suraksha Katha podcast page.

export const stats = [
  { value: '50+', label: 'Episodes Aired' },
  { value: '100K+', label: 'Listeners Reached' },
  { value: '500+', label: 'Awareness Sessions' },
]

export const featuredEpisode = {
  number: 'EP. 47',
  title: 'The ₹40 Lakh WhatsApp Call: Inside a Digital Arrest Scam',
  guestName: 'IPS Ravi Shankar Mishra',
  guestRole: 'Cyber Crime IG, Madhya Pradesh Police',
  duration: '38 min',
  image:
    'https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=1600&auto=format&fit=crop',
  takeaways: [
    'How "digital arrest" scams impersonate law enforcement on video calls',
    'The 3 psychological triggers scammers use to induce panic',
    'What to do in the first 60 seconds of a suspicious call',
  ],
}

export type TimelineStage = {
  key: string
  index: string
  title: string
  description: string
  episodes: { title: string; duration: string }[]
  color: 'navy' | 'cyber' | 'emerald'
}

export const timelineStages: TimelineStage[] = [
  {
    key: 'awareness',
    index: '01',
    title: 'Awareness',
    description:
      'Understanding how scams begin — the messages, calls, and links designed to feel ordinary.',
    episodes: [
      { title: 'The Anatomy of a Phishing Message', duration: '24 min' },
      { title: 'Why OTP Fraud Still Works in 2026', duration: '31 min' },
    ],
    color: 'navy',
  },
  {
    key: 'investigation',
    index: '02',
    title: 'Investigation',
    description:
      'Inside the cybercrime cell — how officers trace digital footprints across states and borders.',
    episodes: [
      { title: 'Tracing a Mule Account Network', duration: '42 min' },
      { title: 'Cyber Forensics: Reading a Dead Phone', duration: '36 min' },
    ],
    color: 'cyber',
  },
  {
    key: 'prevention',
    index: '03',
    title: 'Prevention',
    description:
      'Practical digital hygiene from ethical hackers — built for families, not just engineers.',
    episodes: [
      { title: 'Securing a Parent\u2019s First Smartphone', duration: '28 min' },
      { title: 'Two-Factor Isn\u2019t Optional Anymore', duration: '22 min' },
    ],
    color: 'emerald',
  },
  {
    key: 'recovery',
    index: '04',
    title: 'Recovery',
    description:
      'What happens after the fraud — reporting, fund recovery, and rebuilding trust in technology.',
    episodes: [
      { title: 'Filing a Complaint on cybercrime.gov.in', duration: '19 min' },
      { title: 'Life After a ₹2 Lakh Loss: A Survivor Speaks', duration: '45 min' },
    ],
    color: 'cyber',
  },
]

export const victimStories = [
  {
    name: 'Sunita Verma',
    age: 52,
    location: 'Bhopal, Madhya Pradesh',
    image:
      'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=1200&auto=format&fit=crop',
    summary:
      'A retired schoolteacher who lost her pension savings to a fake "courier customs fee" call — and rebuilt her confidence by helping others recognise the same script.',
    whatHappened:
      'Received a call claiming a parcel in her name was seized at customs with illegal contents. The caller, posing as a "Mumbai Cyber Police officer," demanded a refundable security deposit and walked her through a fake video verification.',
    lessons:
      'Real police never demand payment over video calls. Legitimate agencies never ask you to install screen-sharing apps to "verify your identity."',
    episode: 'EP. 31 — The Parcel That Never Existed',
    flip: false,
  },
  {
    name: 'Arjun Thakur',
    age: 24,
    location: 'Indore, Madhya Pradesh',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    summary:
      'A final-year engineering student who fell for a fraudulent "internship task" job scam, and now leads peer-to-peer cyber literacy drives on his campus.',
    whatHappened:
      'Applied for a part-time data-entry role found via a sponsored social media ad. Was asked to pay a "registration deposit" to unlock the first task, then a series of escalating fees to "withdraw earnings."',
    lessons:
      'Genuine employers never ask candidates to pay to work. Escalating fee requests are the clearest signal of a task-based job scam.',
    episode: 'EP. 39 — The Job That Asked Me to Pay',
    flip: true,
  },
]

export type Expert = {
  name: string
  role: string
  category: 'Cyber Expert' | 'Police Officer' | 'Lawyer' | 'Ethical Hacker' | 'Educator'
  image: string
  size: 'tall' | 'wide' | 'square' | 'small'
}

export const experts: Expert[] = [
  {
    name: 'IPS Ravi Shankar Mishra',
    role: 'Cyber Crime IG, MP Police',
    category: 'Police Officer',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop',
    size: 'tall',
  },
  {
    name: 'Dr. Anjali Khare',
    role: 'Digital Forensics Researcher',
    category: 'Cyber Expert',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=900&auto=format&fit=crop',
    size: 'square',
  },
  {
    name: 'Adv. Rohit Saxena',
    role: 'IT Act Litigator, MP High Court',
    category: 'Lawyer',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop',
    size: 'small',
  },
  {
    name: 'Priya Deshmukh',
    role: 'Certified Ethical Hacker',
    category: 'Ethical Hacker',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop',
    size: 'wide',
  },
  {
    name: 'Manish Tiwari',
    role: 'Cyber Literacy Educator',
    category: 'Educator',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop',
    size: 'small',
  },
  {
    name: 'SI Kavita Rathore',
    role: 'Cyber Cell, Bhopal',
    category: 'Police Officer',
    image:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=900&auto=format&fit=crop',
    size: 'square',
  },
]

export const galleryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=900&auto=format&fit=crop',
    caption: 'Recording Ep. 44, 11:40 PM',
    rotate: -4,
  },
  {
    src: 'https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=900&auto=format&fit=crop',
    caption: 'Pre-show notes with IG Mishra',
    rotate: 3,
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop',
    caption: 'College workshop, Indore',
    rotate: -2,
  },
  {
    src: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=900&auto=format&fit=crop',
    caption: 'Green room, Studio 2',
    rotate: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop',
    caption: 'Listener mail, unsorted',
    rotate: -3,
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=900&auto=format&fit=crop',
    caption: 'Sound check before Ep. 50',
    rotate: 2,
  },
]

export const latestEpisodes = [
  {
    number: '50',
    title: 'Deepfake Voice Scams: When Your Mother\u2019s Voice Lies',
    guest: 'Dr. Anjali Khare',
    duration: '34:12',
    date: 'Jun 18, 2026',
  },
  {
    number: '49',
    title: 'Inside a Bhopal Cybercrime Raid',
    guest: 'SI Kavita Rathore',
    duration: '41:05',
    date: 'Jun 11, 2026',
  },
  {
    number: '48',
    title: 'The Lawyer\u2019s View: What IT Act Cases Actually Look Like',
    guest: 'Adv. Rohit Saxena',
    duration: '29:48',
    date: 'Jun 04, 2026',
  },
  {
    number: '47',
    title: 'The ₹40 Lakh WhatsApp Call: Inside a Digital Arrest Scam',
    guest: 'IPS Ravi Shankar Mishra',
    duration: '38:00',
    date: 'May 28, 2026',
  },
]

export const impactNumbers = [
  { value: 50, suffix: '+', label: 'Episodes produced since launch' },
  { value: 100000, suffix: '+', label: 'Listeners across India', abbreviated: '100K+' },
  { value: 500, suffix: '+', label: 'In-person awareness sessions' },
  { value: 32, suffix: '', label: 'Districts reached in Madhya Pradesh' },
]
