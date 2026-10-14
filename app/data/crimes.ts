export interface Crime {
  name: string;
  icon: string;
  description: string;
  law: string;
  section: string;
  punishment: string;
  fine: string;
  protection: string;
}

export const crimes: Crime[] = [
  {
    name: 'Phishing Fraud',
    icon: 'ShieldAlert',
    description: 'Fraudulent attempts to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in electronic communication.',
    law: 'Information Technology Act, 2000',
    section: 'Section 66D',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Never click suspicious links. Verify sender identity. Report to CERT-In immediately.',
  },
  {
    name: 'Fake Customer Care Scam',
    icon: 'PhoneOff',
    description: 'Scammers pose as customer care representatives of banks, telecom companies, or e-commerce platforms to extract personal and financial information from victims.',
    law: 'Information Technology Act, 2000',
    section: 'Section 66D / BNS Section 318',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Always verify customer care numbers on official websites. Never share OTP or card details over phone.',
  },
  {
    name: 'OTP Fraud',
    icon: 'KeyRound',
    description: 'Tricking individuals into sharing their One-Time Passwords (OTPs) through fake calls, messages, or social engineering tactics to gain unauthorized access to accounts.',
    law: 'Information Technology Act, 2000',
    section: 'Section 66C / Section 66D',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Never share OTPs with anyone. Banks never ask for OTPs. Enable SIM lock on your mobile.',
  },
  {
    name: 'UPI Fraud',
    icon: 'Smartphone',
    description: 'Unauthorized transactions through UPI apps using social engineering, fake UPI IDs, QR code manipulation, or request-based fraud to deceive victims into transferring money.',
    law: 'Information Technology Act, 2000',
    section: 'Section 66D / BNS Section 318',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Verify UPI ID before transferring. Never scan unknown QR codes. Check transaction details carefully.',
  },
  {
    name: 'Identity Theft',
    icon: 'UserX',
    description: 'Dishonestly or fraudulently using another person\'s identity information including passwords, digital signatures, or other unique identifiers to impersonate them online.',
    law: 'Information Technology Act, 2000',
    section: 'Section 66C',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Use strong, unique passwords. Enable two-factor authentication. Monitor your credit reports regularly.',
  },
  {
    name: 'Hacking',
    icon: 'Terminal',
    description: 'Unauthorized access to computer systems, networks, or data by circumventing security measures. Includes accessing protected systems without permission.',
    law: 'Information Technology Act, 2000',
    section: 'Section 43 / Section 66',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Keep software updated. Use firewalls and antivirus. Secure your Wi-Fi with strong passwords.',
  },
  {
    name: 'Social Media Hacking',
    icon: 'Share2',
    description: 'Gaining unauthorized access to social media accounts through phishing, credential stuffing, or exploiting vulnerabilities to post unauthorized content or extract personal data.',
    law: 'Information Technology Act, 2000',
    section: 'Section 43 / Section 66 / Section 66C',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Enable 2FA on all social accounts. Don\'t click suspicious DM links. Review active sessions regularly.',
  },
  {
    name: 'Cyber Bullying',
    icon: 'MessageCircleWarning',
    description: 'Using electronic communication to bully, harass, threaten, or intimidate a person repeatedly. Includes posting hurtful content, spreading rumors, or creating fake profiles.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67 / BNS Section 351',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Block and report bullies. Save evidence of harassment. File complaint with cyber cell.',
  },
  {
    name: 'Cyber Stalking',
    icon: 'Eye',
    description: 'Persistent and unwanted online monitoring, tracking, or following of a person through social media, email, or other digital means, causing psychological distress.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67 / BNS Section 351D',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Set profiles to private. Document all stalking incidents. Report to police and cyber cell.',
  },
  {
    name: 'Online Harassment',
    icon: 'AlertTriangle',
    description: 'Systematic and repeated unwanted online behavior directed at an individual, including threats, abusive messages, doxxing, or inciting others to harass the victim.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67A / BNS Section 354',
    punishment: 'Imprisonment up to 5 years',
    fine: 'Up to ₹10,00,000',
    protection: 'Preserve all evidence. Report to platform and law enforcement. Seek legal counsel immediately.',
  },
  {
    name: 'Online Blackmail',
    icon: 'Lock',
    description: 'Threatening to reveal sensitive, private, or embarrassing information about a person online unless demands (usually monetary) are met. A severe form of cyber crime.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67A / BNS Section 308',
    punishment: 'Imprisonment up to 5 years',
    fine: 'Up to ₹10,00,000',
    protection: 'Do not comply with demands. Save all communications. Report immediately to cyber police.',
  },
  {
    name: 'Sextortion',
    icon: 'ShieldOff',
    description: 'Blackmail involving threats to distribute intimate or sexual images or videos of the victim unless money or further sexual content is provided. A grave cyber crime.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67A / BNS Section 308',
    punishment: 'Imprisonment up to 5 years',
    fine: 'Up to ₹10,00,000',
    protection: 'Never share intimate content online. Report to National Cyber Crime Portal. Seek legal help immediately.',
  },
  {
    name: 'Fake Loan App Scam',
    icon: 'Banknote',
    description: 'Fraudulent loan apps that lure victims with quick loans, then harvest personal data, contacts, and photos for blackmail. Often charge exorbitant hidden fees.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 66D / BNS Section 318',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Only use RBI-registered lending apps. Read reviews and permissions. Report fraudulent apps on Google Play Store.',
  },
  {
    name: 'Investment Scam',
    icon: 'TrendingDown',
    description: 'Fraudulent schemes promising high returns on investments through fake trading platforms, Ponzi schemes, or cryptocurrency scams that steal victims\' money.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 66D / BNS Section 318',
    punishment: 'Imprisonment up to 5 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Verify SEBI registration. Avoid unrealistic return promises. Research before investing.',
  },
  {
    name: 'Romance Scam',
    icon: 'HeartOff',
    description: 'Creating fake online identities on dating platforms or social media to form romantic relationships and then exploiting victims for money or personal information.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 66D / BNS Section 318',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹1,00,000',
    protection: 'Verify online identities. Never send money to people you haven\'t met. Be cautious with new connections.',
  },
  {
    name: 'Data Theft',
    icon: 'Database',
    description: 'Unauthorized copying, extraction, or transmission of confidential or proprietary data from an organization or individual, often for competitive advantage or sale.',
    law: 'Information Technology Act, 2000',
    section: 'Section 43 / Section 66 / Section 72',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Encrypt sensitive data. Use access controls. Monitor data transfers. Report breaches to CERT-In.',
  },
  {
    name: 'Deepfake Misuse',
    icon: 'ScanFace',
    description: 'Using AI-generated synthetic media to create realistic but fake videos or images of individuals, often for defamation, misinformation, or explicit content without consent.',
    law: 'Information Technology Act, 2000 / BNS',
    section: 'Section 67A / BNS Section 295',
    punishment: 'Imprisonment up to 5 years',
    fine: 'Up to ₹10,00,000',
    protection: 'Report deepfake content to platforms. File FIR with cyber cell. Use reverse image search to detect misuse.',
  },
  {
    name: 'Ransomware',
    icon: 'Bug',
    description: 'Malicious software that encrypts a victim\'s files or system and demands ransom payment for decryption. Can paralyze businesses and compromise personal data.',
    law: 'Information Technology Act, 2000',
    section: 'Section 43 / Section 66',
    punishment: 'Imprisonment up to 3 years',
    fine: 'Up to ₹5,00,000',
    protection: 'Maintain regular offline backups. Keep antivirus updated. Never pay ransom. Report to CERT-In.',
  },
];

export interface CyberLaw {
  name: string;
  year: string;
  description: string;
  keyProvision: string;
}

export const cyberLaws: CyberLaw[] = [
  {
    name: 'IT Act 2000',
    year: '2000',
    description: 'The foundational legislation governing cyber crime and electronic commerce in India. Provides legal recognition to electronic transactions and defines cyber offences.',
    keyProvision: 'Legal framework for electronic governance and cyber crime prosecution',
  },
  {
    name: 'Section 43',
    year: '2000',
    description: 'Covers unauthorized access, downloading data, introducing viruses, and damaging computer systems. Imposes penalty and compensation on the offender.',
    keyProvision: 'Penalty for unauthorized access and data damage — compensation to affected party',
  },
  {
    name: 'Section 65',
    year: '2000',
    description: 'Addresses tampering with computer source documents. Anyone who knowingly conceals, alters, or destroys source code faces imprisonment and fine.',
    keyProvision: 'Tampering with source code — imprisonment up to 3 years or fine up to ₹2,00,000',
  },
  {
    name: 'Section 66',
    year: '2000',
    description: 'Deals with computer-related offences including hacking. Dishonestly or fraudulently accessing a computer system without authorization constitutes hacking under this section.',
    keyProvision: 'Hacking and computer fraud — imprisonment up to 3 years and/or fine up to ₹5,00,000',
  },
  {
    name: 'Section 66C',
    year: '2000',
    description: 'Punishes identity theft — fraudulently using another person\'s electronic signature, password, or other unique identification feature.',
    keyProvision: 'Identity theft — imprisonment up to 3 years and fine up to ₹1,00,000',
  },
  {
    name: 'Section 66D',
    year: '2000',
    description: 'Covers cheating by personation using computer resources. Using someone else\'s identity to commit fraud through digital means.',
    keyProvision: 'Cheating by personation — imprisonment up to 3 years and fine up to ₹1,00,000',
  },
  {
    name: 'Section 67',
    year: '2000',
    description: 'Prohibits publishing or transmitting obscene material in electronic form. Covers vulgar, pornographic, or sexually explicit content distribution online.',
    keyProvision: 'Publishing obscene content — imprisonment up to 5 years and fine up to ₹10,00,000',
  },
  {
    name: 'Section 67A',
    year: '2000',
    description: 'Addresses publishing or transmitting material containing sexually explicit acts in electronic form. More severe than Section 67 for explicit sexual content.',
    keyProvision: 'Sexually explicit content — imprisonment up to 7 years and fine up to ₹10,00,000',
  },
  {
    name: 'Section 69',
    year: '2000',
    description: 'Empowers the government to issue directions for interception, monitoring, and decryption of information through computer resources for national security.',
    keyProvision: 'Government interception power for sovereignty, defense, and public order',
  },
  {
    name: 'Section 70',
    year: '2000',
    description: 'Protects critical information infrastructure. Unauthorized access to systems designated as protected by the government carries severe penalties.',
    keyProvision: 'Protected system access — imprisonment up to 10 years and fine',
  },
  {
    name: 'Section 72',
    year: '2000',
    description: 'Penalizes breach of confidentiality and privacy. Anyone accessing data without authorization and disclosing it to others faces punishment.',
    keyProvision: 'Privacy breach — imprisonment up to 2 years and/or fine up to ₹1,00,000',
  },
  {
    name: 'DPDP Act 2023',
    year: '2023',
    description: 'The Digital Personal Data Protection Act establishes comprehensive framework for processing digital personal data, ensuring consent-based processing and data principal rights.',
    keyProvision: 'Consent-based data processing, data principal rights, penalties up to ₹250 crore',
  },
  {
    name: 'BNS Cyber Provisions',
    year: '2023',
    description: 'The Bharatiya Nyaya Sanhita (Indian Penal Code replacement) includes specific provisions for cyber crimes including online fraud, identity theft, and digital harassment.',
    keyProvision: 'Sections 318, 351, 354, 351D — modernized criminal provisions for digital offences',
  },
];

export interface DigitalRight {
  title: string;
  description: string;
  icon: string;
}

export const digitalRights: DigitalRight[] = [
  {
    title: 'Right to Privacy',
    description: 'The Supreme Court of India recognized the Right to Privacy as a fundamental right under Article 21. Your personal data, communications, and digital activities are protected by constitutional guarantee.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Right to Data Protection',
    description: 'Under the Digital Personal Data Protection Act 2023, you have the right to know what data is collected, consent to its use, request deletion, and nominate someone to exercise these rights after your death.',
    icon: 'Lock',
  },
  {
    title: 'Right to Online Safety',
    description: 'Every citizen has the right to a safe online environment. The IT Act provides legal recourse against cyber harassment, stalking, and threats. Platforms must ensure user safety.',
    icon: 'Shield',
  },
  {
    title: 'Right to Digital Identity Protection',
    description: 'Section 66C of the IT Act protects your digital identity. Unauthorized use of your electronic signature, password, or identity is a punishable offence with up to 3 years imprisonment.',
    icon: 'Fingerprint',
  },
  {
    title: 'Right to Report Cyber Crime',
    description: 'Every citizen has the right to report cyber crimes through the National Cyber Crime Portal (cybercrime.gov.in) or by calling 1930. FIR registration is free and can be done online.',
    icon: 'FileWarning',
  },
  {
    title: 'Right to Legal Action',
    description: 'Victims of cyber crime have the right to seek legal remedy, claim compensation, and pursue criminal prosecution. The IT Act and BNS provide comprehensive legal remedies.',
    icon: 'Scale',
  },
];

export interface GoldenRule {
  title: string;
  description: string;
  icon: string;
}

export const goldenRules: GoldenRule[] = [
  {
    title: 'Never Share OTP',
    description: 'Your OTP is the last line of defense for your accounts. Banks, payment apps, and legitimate services will never ask for your OTP. Sharing it gives attackers full access to your financial accounts and personal data.',
    icon: 'KeyRound',
  },
  {
    title: 'Verify UPI Requests',
    description: 'Always double-check the UPI ID and amount before approving any payment request. Scammers create similar-looking UPI IDs and send collect requests. Verify the recipient name matches your expectation.',
    icon: 'CheckCircle',
  },
  {
    title: 'Avoid Unknown Links',
    description: 'Phishing links can look identical to legitimate websites. Never click links from unknown senders in email, SMS, or messaging apps. When in doubt, navigate directly by typing the URL in your browser.',
    icon: 'Unlink',
  },
  {
    title: 'Enable Two-Factor Authentication',
    description: '2FA adds a second layer of security beyond your password. Even if your password is compromised, attackers cannot access your account without the second factor. Enable it on every account that supports it.',
    icon: 'Smartphone',
  },
  {
    title: 'Use Strong Passwords',
    description: 'Use passwords with at least 12 characters mixing uppercase, lowercase, numbers, and symbols. Never reuse passwords across accounts. Consider using a password manager to generate and store unique passwords.',
    icon: 'Lock',
  },
  {
    title: 'Keep Software Updated',
    description: 'Software updates contain critical security patches that protect against known vulnerabilities. Enable automatic updates on your operating system, browser, and apps. Outdated software is an open door for hackers.',
    icon: 'RefreshCw',
  },
  {
    title: 'Report Suspicious Activity',
    description: 'Reporting cyber crime quickly increases the chances of recovery and prosecution. Use the National Cyber Crime Portal or call 1930. Your report could prevent others from becoming victims.',
    icon: 'Flag',
  },
  {
    title: 'Protect Personal Information',
    description: 'Limit the personal information you share online. Scammers use social media details to craft convincing phishing attacks and impersonate you. Review your privacy settings regularly on all platforms.',
    icon: 'UserCheck',
  },
  {
    title: 'Use Secure Networks',
    description: 'Avoid public Wi-Fi for financial transactions and sensitive activities. Use a VPN if you must connect to public networks. Hackers can intercept data on unsecured Wi-Fi connections through man-in-the-middle attacks.',
    icon: 'Wifi',
  },
  {
    title: 'Back Up Your Data',
    description: 'Maintain regular backups of important files to protect against ransomware, hardware failure, and accidental deletion. Use the 3-2-1 rule: 3 copies, 2 different media, 1 off-site backup.',
    icon: 'HardDrive',
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What should I do if my account is hacked?',
    answer: 'Immediately change your password from a secure device. Enable two-factor authentication. Check for unauthorized transactions or changes. Report the hack on the National Cyber Crime Portal (cybercrime.gov.in) or call 1930. Notify the platform (bank, social media, email provider). File an FIR at your nearest cyber crime police station. Preserve all evidence including screenshots of unauthorized access and communication logs.',
  },
  {
    question: 'Can I recover money lost in UPI fraud?',
    answer: 'Yes, recovery is possible if you act quickly. Immediately call your bank\'s fraud helpline and the UPI app\'s support. File a complaint on the National Cyber Crime Portal within 24 hours — this triggers the "critical hold" mechanism that can freeze the fraudster\'s account. File an FIR under Section 66D of the IT Act. The RBI has mandated that banks must credit reversed amounts within 10 working days for unauthorized electronic transactions. Document all transaction IDs and timestamps.',
  },
  {
    question: 'What law applies to phishing attacks?',
    answer: 'Phishing attacks fall under Section 66D of the Information Technology Act, 2000 (cheating by personation using computer resources), punishable with imprisonment up to 3 years and fine up to ₹1,00,000. If identity theft is involved, Section 66C also applies. Under the Bharatiya Nyaya Sanhita, Section 318 (cheating) may apply. Additionally, if banking credentials are stolen, RBI guidelines mandate investigation and potential compensation. CERT-In handles technical investigation of phishing incidents.',
  },
  {
    question: 'How do I report cyber bullying?',
    answer: 'You can report cyber bullying through multiple channels: (1) File an online complaint at cybercrime.gov.in, (2) Call the cyber crime helpline at 1930, (3) File an FIR at your local police station under Section 67 of the IT Act and Section 351 of BNS, (4) Report to the social media platform using their reporting tools, (5) If the bullying involves minors, contact the National Commission for Protection of Child Rights. Save all evidence — screenshots, URLs, timestamps, and witness statements before the content is deleted.',
  },
  {
    question: 'What is the punishment for identity theft?',
    answer: 'Under Section 66C of the Information Technology Act, 2000, identity theft is punishable with imprisonment of up to 3 years and a fine up to ₹1,00,000. The punishment applies to anyone who fraudulently or dishonestly uses another person\'s electronic signature, password, or any other unique identification feature. If the identity theft is used to commit further fraud (Section 66D), additional punishment applies. Under BNS Section 318, cheating by personation carries separate penalties. Courts may impose both imprisonment and fine simultaneously.',
  },
  {
    question: 'Can social media harassment lead to arrest?',
    answer: 'Yes, social media harassment can absolutely lead to arrest. Under Section 67 of the IT Act (publishing obscene material), offenders face up to 5 years imprisonment. Under Section 67A (sexually explicit content), punishment extends to 7 years. The BNS Sections 354 (sexual harassment), 351 (criminal intimidation), and 351D (stalking) also apply. Police can arrest without warrant for cognizable offences. Recent Supreme Court rulings have affirmed that online harassment carries the same legal consequences as offline harassment. Victims should file FIRs promptly.',
  },
];

export interface ReportStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const reportSteps: ReportStep[] = [
  {
    step: 1,
    title: 'Collect Evidence',
    description: 'Preserve all digital evidence — do not delete anything. Note dates, times, and details of the incident.',
    icon: 'FolderSearch',
  },
  {
    step: 2,
    title: 'Save Screenshots',
    description: 'Take screenshots of all relevant communications, web pages, messages, and suspicious activities.',
    icon: 'Camera',
  },
  {
    step: 3,
    title: 'Save Transaction Details',
    description: 'Record transaction IDs, bank statements, UPI references, and any financial trail related to the fraud.',
    icon: 'Receipt',
  },
  {
    step: 4,
    title: 'File Complaint',
    description: 'Report at cybercrime.gov.in or call 1930. File FIR at nearest cyber crime police station.',
    icon: 'FileText',
  },
  {
    step: 5,
    title: 'Investigation',
    description: 'Cyber cell investigates. Cooperate fully and provide additional evidence as requested. Track your complaint status online.',
    icon: 'Search',
  },
];
