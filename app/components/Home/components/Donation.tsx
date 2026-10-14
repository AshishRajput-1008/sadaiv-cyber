'use client'; // Ensure this is a Client Component in Next.js

import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  Lock,
  Shield,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  TrendingUp,
  TrendingDown,  
  Users,
  Clock,
  MapPin,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  Target,
  Brain,
  Sparkles,
  Globe,
  Activity,
  Bell,
  CheckCircle,
} from 'lucide-react';

// Define interfaces for TypeScript
interface FraudItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  preventionTips: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Easy';
  affectedUsers: string;
  daysActive: number;
  location: string;
  trend: 'increasing' | 'stable' | 'decreasing' | 'seasonal';
  subtypes: string[];
  impactScore: number;
  detectionDifficulty: 'Very Hard' | 'Hard' | 'Medium';
}

interface FraudData {
  'All Frauds': FraudItem[];
}

interface CategoryIcons {
  [key: string]: React.ElementType;
}

interface RiskColors {
  [key: string]: string;
}

interface TrendIcons {
  [key: string]: React.ElementType;
}

// Enhanced fraud data
const fraudData: FraudData = {
  'All Frauds': [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Email Phishing Scam',
      description: 'Fraudsters send deceptive emails mimicking trusted organizations, such as banks or companies, to trick users into revealing sensitive personal information like passwords, credit card details, or social security numbers.',
      daysActive: 10,
      affectedUsers: '1.0M',
      riskLevel: 'High',
      category: 'Phishing',
      subtypes: ['Email Spoofing', 'Link Manipulation', 'Fake Login Pages'],
      preventionTips: 'Never click on suspicious links. Verify email sender. Use spam filters.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 85,
      detectionDifficulty: 'Hard',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'SMS Phishing (Smishing)',
      description: 'Scammers send fraudulent text messages posing as legitimate entities, like banks or delivery services, containing malicious links or urgent requests to steal personal data or financial information from unsuspecting victims.',
      daysActive: 12,
      affectedUsers: '0.5M',
      riskLevel: 'Medium',
      category: 'Phishing',
      subtypes: ['Smishing', 'Fake OTP Requests'],
      preventionTips: 'Avoid clicking unknown links. Report spam messages.',
      location: 'India, USA',
      trend: 'stable',
      impactScore: 70,
      detectionDifficulty: 'Medium',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Aadhaar Card Misuse',
      description: 'Criminals exploit stolen or misused Aadhaar card details to commit identity theft, fraudulently obtaining loans, opening bank accounts, or engaging in illegal activities under the victim’s name, causing significant financial and legal harm.',
      daysActive: 15,
      affectedUsers: '0.3M',
      riskLevel: 'High',
      category: 'Identity Theft',
      subtypes: ['Document Forgery', 'Loan Fraud'],
      preventionTips: 'Never share Aadhaar copy without masking. Lock Aadhaar biometrics.',
      location: 'India',
      trend: 'increasing',
      impactScore: 88,
      detectionDifficulty: 'Very Hard',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Online Loan Fraud',
      description: 'Fraudulent loan companies deceive victims by promising quick loans but demand upfront processing fees. These scams often target vulnerable individuals, leading to financial losses without delivering the promised loan funds.',
      daysActive: 20,
      affectedUsers: '0.8M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Loan Apps', 'Advance Fee Scam'],
      preventionTips: 'Verify company credentials. Avoid paying upfront fees.',
      location: 'India, Nigeria',
      trend: 'stable',
      impactScore: 75,
      detectionDifficulty: 'Medium',
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/5380792/pexels-photo-5380792.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Ransomware Attack',
      description: 'Malicious software encrypts victims’ files, rendering them inaccessible. Cybercriminals demand ransom payments, often in cryptocurrency, to unlock the data, targeting businesses and individuals, causing significant financial and operational disruptions.',
      daysActive: 25,
      affectedUsers: '0.2M',
      riskLevel: 'Critical',
      category: 'Malware',
      subtypes: ['Lockers', 'Encryptors', 'Scareware'],
      preventionTips: 'Backup data. Don’t click unknown attachments. Use strong antivirus.',
      location: 'USA, UK',
      trend: 'increasing',
      impactScore: 95,
      detectionDifficulty: 'Hard',
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Credential Stuffing Attacks',
      description: 'Cybercriminals use stolen usernames and passwords from data breaches to gain unauthorized access to user accounts on multiple platforms, exploiting password reuse to steal sensitive data or commit fraud.',
      daysActive: 30,
      affectedUsers: '0.7M',
      riskLevel: 'High',
      category: 'Identity Theft',
      subtypes: ['Account Takeover', 'Botnet Login Attempts', 'Password Reuse Exploits'],
      preventionTips: 'Use unique passwords, enable two-factor authentication, monitor login activity.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 90,
      detectionDifficulty: 'Very Hard',
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Deepfake Scams',
      description: 'Fraudsters use AI-generated deepfake videos or voice recordings to impersonate trusted individuals, like CEOs or family members, manipulating victims into sharing sensitive information or transferring money under false pretenses.',
      daysActive: 45,
      affectedUsers: '0.35M',
      riskLevel: 'Medium',
      category: 'Phishing',
      subtypes: ['CEO Fraud', 'Voice Phishing', 'Fake Video Evidence'],
      preventionTips: 'Verify through multiple channels, be skeptical of urgent requests, raise awareness.',
      location: 'USA, Europe',
      trend: 'increasing',
      impactScore: 80,
      detectionDifficulty: 'Very Hard',
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Business Email Compromise (BEC)',
      description: 'Hackers spoof or compromise business email accounts to deceive employees into transferring funds or sharing sensitive data, often posing as executives or vendors, leading to substantial financial losses for organizations.',
      daysActive: 40,
      affectedUsers: '0.5M',
      riskLevel: 'Critical',
      category: 'Phishing',
      subtypes: ['Email Spoofing', 'Vendor Email Compromise', 'Fake Invoice Scams'],
      preventionTips: 'Verify payment requests, educate staff, implement domain security protocols.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 92,
      detectionDifficulty: 'Hard',
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/5380774/pexels-photo-5380774.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Tech Support Scams',
      description: 'Scammers pose as tech support agents from reputable companies, using pop-up alerts or cold calls to trick users into granting remote access or paying for fake services, exploiting trust.',
      daysActive: 25,
      affectedUsers: '0.6M',
      riskLevel: 'High',
      category: 'Phishing',
      subtypes: ['Remote Access Scams', 'Browser Lock Scams', 'Fake Microsoft Support'],
      preventionTips: 'Never allow remote access, contact official support, avoid popup scare tactics.',
      location: 'India, UK',
      trend: 'stable',
      impactScore: 85,
      detectionDifficulty: 'Medium',
    },
    {
      id: 10,
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Investment Scams',
      description: 'Fraudsters promote fake investment opportunities promising high returns with low risk, often through social media or unsolicited calls, leading to significant financial losses for victims.',
      daysActive: 30,
      affectedUsers: '0.4M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['Ponzi Schemes', 'Pyramid Schemes', 'Fake Trading Platforms'],
      preventionTips: 'Research investments thoroughly, verify broker credentials, avoid high-pressure sales.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 82,
      detectionDifficulty: 'Medium',
    },
    {
      id: 11,
      image: 'https://images.pexels.com/photos/669454/pexels-photo-669454.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Cryptocurrency Scams',
      description: 'Scammers lure victims into fake cryptocurrency exchanges or wallets, stealing funds through phishing sites, fake apps, or fraudulent ICOs (Initial Coin Offerings).',
      daysActive: 35,
      affectedUsers: '0.25M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['Fake Exchanges', 'Wallet Phishing', 'ICO Fraud'],
      preventionTips: 'Use trusted exchanges, verify wallet addresses, avoid unsolicited offers.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 87,
      detectionDifficulty: 'Hard',
    },
    {
      id: 12,
      image: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Social Media Impersonation',
      description: 'Fraudsters create fake social media profiles mimicking celebrities, brands, or friends to trick users into sharing personal information or sending money.',
      daysActive: 20,
      affectedUsers: '0.9M',
      riskLevel: 'Medium',
      category: 'Identity Theft',
      subtypes: ['Fake Profiles', 'Impersonation Scams', 'Catfishing'],
      preventionTips: 'Verify profile authenticity, avoid sharing sensitive info, report suspicious accounts.',
      location: 'Global',
      trend: 'stable',
      impactScore: 78,
      detectionDifficulty: 'Medium',
    },
    {
      id: 13,
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Malicious Browser Extensions',
      description: 'Fraudulent browser extensions steal user data, such as browsing history, passwords, or cryptocurrency wallet keys, often disguised as legitimate tools.',
      daysActive: 18,
      affectedUsers: '0.3M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['Data Theft', 'Keylogging', 'Adware'],
      preventionTips: 'Install extensions from trusted sources, review permissions, use security software.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 83,
      detectionDifficulty: 'Hard',
    },
    {
      id: 14,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Gift Card Scams',
      description: 'Scammers trick victims into purchasing gift cards and sharing the codes, claiming they’re needed for payments or urgent situations, resulting in unrecoverable losses.',
      daysActive: 15,
      affectedUsers: '0.55M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Payment Requests', 'Impersonation Scams'],
      preventionTips: 'Never share gift card codes, verify recipient identity, report suspicious requests.',
      location: 'USA, Canada',
      trend: 'stable',
      impactScore: 70,
      detectionDifficulty: 'Medium',
    },
    {
      id: 15,
      image: 'https://images.pexels.com/photos/5380657/pexels-photo-5380657.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Charity Scams',
      description: 'Fraudsters set up fake charities, especially during crises, to collect donations through deceptive websites or crowdfunding campaigns, pocketing the funds.',
      daysActive: 22,
      affectedUsers: '0.4M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Crowdfunding Fraud', 'Disaster Relief Scams'],
      preventionTips: 'Donate to verified charities, research before contributing, avoid urgent appeals.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 72,
      detectionDifficulty: 'Medium',
    },
    {
      id: 16,
      image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Romance Scams',
      description: 'Scammers build fake romantic relationships online to exploit victims emotionally and financially, often requesting money for emergencies or travel expenses.',
      daysActive: 50,
      affectedUsers: '0.15M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['Catfishing', 'Fake Emergencies', 'Money Mule Scams'],
      preventionTips: 'Be cautious of online relationships, verify identities, avoid sending money.',
      location: 'Global',
      trend: 'stable',
      impactScore: 80,
      detectionDifficulty: 'Hard',
    },
    {
      id: 17,
      image: 'https://images.pexels.com/photos/5380648/pexels-photo-5380648.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Spyware Infections',
      description: 'Malicious software secretly monitors user activities, stealing sensitive data like passwords, banking details, or personal information without consent.',
      daysActive: 28,
      affectedUsers: '0.45M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['Keyloggers', 'Screen Scrapers', 'Data Exfiltration'],
      preventionTips: 'Use antivirus software, avoid suspicious downloads, update systems regularly.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 86,
      detectionDifficulty: 'Hard',
    },
    {
      id: 18,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Job Offer Scams',
      description: 'Fraudsters post fake job listings to collect personal information or demand upfront payments for training or equipment, targeting job seekers.',
      daysActive: 20,
      affectedUsers: '0.6M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Recruitment', 'Advance Fee Fraud'],
      preventionTips: 'Verify job offers, avoid paying for jobs, research employers.',
      location: 'India, USA',
      trend: 'stable',
      impactScore: 74,
      detectionDifficulty: 'Medium',
    },
    {
      id: 19,
      image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Lottery Scams',
      description: 'Scammers notify victims of fake lottery winnings, requiring payment of fees or taxes to claim prizes, leading to financial losses.',
      daysActive: 18,
      affectedUsers: '0.7M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Prize Notifications', 'Advance Fee Fraud'],
      preventionTips: 'Ignore unsolicited prize notifications, never pay to claim winnings, verify legitimacy.',
      location: 'Global',
      trend: 'stable',
      impactScore: 71,
      detectionDifficulty: 'Medium',
    },
    {
      id: 20,
      image: 'https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Adware Attacks',
      description: 'Malicious software displays unwanted ads, redirects browsers, or collects user data, often bundled with free software downloads.',
      daysActive: 15,
      affectedUsers: '1.2M',
      riskLevel: 'Low',
      category: 'Malware',
      subtypes: ['Browser Hijacking', 'Pop-up Ads', 'Data Tracking'],
      preventionTips: 'Download software from trusted sources, use ad-blockers, scan for malware.',
      location: 'Global',
      trend: 'stable',
      impactScore: 65,
      detectionDifficulty:"Medium"
    },
    {
      id: 21,
      image: 'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'SIM Swap Fraud',
      description: 'Criminals trick mobile carriers into transferring a victim’s phone number to a new SIM card, intercepting calls and texts to steal accounts or funds.',
      daysActive: 25,
      affectedUsers: '0.2M',
      riskLevel: 'High',
      category: 'Identity Theft',
      subtypes: ['Phone Number Hijacking', 'Two-Factor Bypass'],
      preventionTips: 'Use strong account security, monitor phone activity, contact carrier if suspicious.',
      location: 'USA, India',
      trend: 'increasing',
      impactScore: 89,
      detectionDifficulty: 'Very Hard',
    },
    {
      id: 22,
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake E-commerce Scams',
      description: 'Fraudulent online stores offer products at low prices, collecting payments without delivering goods or delivering counterfeit items.',
      daysActive: 30,
      affectedUsers: '0.8M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Non-delivery Scams', 'Counterfeit Goods'],
      preventionTips: 'Shop from reputable sites, check reviews, use secure payment methods.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 76,
      detectionDifficulty: 'Medium',
    },
    {
      id: 23,
      image: 'https://images.pexels.com/photos/5380670/pexels-photo-5380670.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Trojan Horse Malware',
      description: 'Malicious software disguised as legitimate programs steals data, provides backdoor access, or damages systems, often spread via email attachments.',
      daysActive: 22,
      affectedUsers: '0.4M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['Banking Trojans', 'Backdoor Access', 'Data Theft'],
      preventionTips: 'Avoid suspicious downloads, use antivirus, keep software updated.',
      location: 'Global',
      trend: 'stable',
      impactScore: 84,
      detectionDifficulty: 'Hard',
    },
    {
      id: 24,
      image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Survey Scams',
      description: 'Scammers offer rewards for completing online surveys, collecting personal information or installing malware instead of delivering promised rewards.',
      daysActive: 15,
      affectedUsers: '0.65M',
      riskLevel: 'Medium',
      category: 'Phishing',
      subtypes: ['Data Harvesting', 'Malware Distribution'],
      preventionTips: 'Avoid unsolicited surveys, verify sources, use security software.',
      location: 'Global',
      trend: 'stable',
      impactScore: 73,
      detectionDifficulty: 'Medium',
    },
    {
      id: 25,
      image: 'https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Credit Card Skimming',
      description: 'Criminals use devices or malware to capture credit card details at ATMs, POS terminals, or online, leading to unauthorized transactions.',
      daysActive: 20,
      affectedUsers: '0.5M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['ATM Skimming', 'Online Skimming', 'Card Cloning'],
      preventionTips: 'Check ATMs for tampering, use secure websites, monitor statements.',
      location: 'Global',
      trend: 'stable',
      impactScore: 81,
      detectionDifficulty: 'Hard',
    },
    {
      id: 26,
      image: 'https://images.pexels.com/photos/5380659/pexels-photo-5380659.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Formjacking Attacks',
      description: 'Hackers inject malicious code into website forms to steal payment details entered by users during online transactions.',
      daysActive: 18,
      affectedUsers: '0.3M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['Payment Data Theft', 'Website Compromise'],
      preventionTips: 'Shop on secure sites, use virtual cards, monitor transactions.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 82,
      detectionDifficulty: 'Hard',
    },
    {
      id: 27,
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Delivery Scams',
      description: 'Scammers send fake delivery notifications via email or SMS, prompting users to click links or provide details, leading to data theft or malware infection.',
      daysActive: 12,
      affectedUsers: '0.7M',
      riskLevel: 'Medium',
      category: 'Phishing',
      subtypes: ['Fake Tracking Links', 'Data Harvesting'],
      preventionTips: 'Verify delivery notices, avoid clicking links, contact official sources.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 74,
      detectionDifficulty: 'Medium',
    },
    {
      id: 28,
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Antivirus Scams',
      description: 'Fraudsters use fake antivirus alerts to trick users into downloading malware or paying for unnecessary software, exploiting fear of infections.',
      daysActive: 15,
      affectedUsers: '0.6M',
      riskLevel: 'Medium',
      category: 'Malware',
      subtypes: ['Scareware', 'Fake Software Downloads'],
      preventionTips: 'Use reputable antivirus, ignore pop-up warnings, verify software sources.',
      location: 'Global',
      trend: 'stable',
      impactScore: 70,
      detectionDifficulty: 'Medium',
    },
    {
      id: 29,
      image: 'https://images.pexels.com/photos/5380662/pexels-photo-5380662.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Wire Transfer Fraud',
      description: 'Scammers impersonate trusted contacts to request urgent wire transfers, often targeting businesses or individuals for large financial losses.',
      daysActive: 20,
      affectedUsers: '0.25M',
      riskLevel: 'Critical',
      category: 'Financial Scams',
      subtypes: ['Impersonation', 'Urgent Payment Requests'],
      preventionTips: 'Verify requests via trusted channels, implement approval processes, educate staff.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 90,
      detectionDifficulty: 'Hard',
    },
    {
      id: 30,
      image: 'https://images.pexels.com/photos/1181245/pexels-photo-1181245.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Vishing (Voice Phishing)',
      description: 'Scammers use phone calls to impersonate authorities or companies, tricking victims into revealing personal or financial information.',
      daysActive: 18,
      affectedUsers: '0.5M',
      riskLevel: 'High',
      category: 'Phishing',
      subtypes: ['Impersonation Calls', 'Fake Bank Alerts'],
      preventionTips: 'Don’t share info over phone, verify caller identity, block suspicious numbers.',
      location: 'USA, India',
      trend: 'stable',
      impactScore: 80,
      detectionDifficulty: 'Medium',
    },
    {
      id: 31,
      image: 'https://images.pexels.com/photos/3153205/pexels-photo-3153205.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Subscription Scams',
      description: 'Fraudsters trick users into signing up for fake subscriptions, charging recurring fees for nonexistent services or products.',
      daysActive: 22,
      affectedUsers: '0.4M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Recurring Billing Fraud', 'Fake Trials'],
      preventionTips: 'Review subscriptions, cancel unauthorized charges, monitor bank statements.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 73,
      detectionDifficulty: 'Medium',
    },
    {
      id: 32,
      image: 'https://images.pexels.com/photos/5380672/pexels-photo-5380672.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Cryptojacking',
      description: 'Hackers hijack devices to mine cryptocurrency without user consent, slowing systems and increasing energy costs.',
      daysActive: 30,
      affectedUsers: '0.3M',
      riskLevel: 'Medium',
      category: 'Malware',
      subtypes: ['Browser-based Mining', 'Malicious Scripts'],
      preventionTips: 'Use ad-blockers, monitor device performance, install security software.',
      location: 'Global',
      trend: 'stable',
      impactScore: 70,
      detectionDifficulty: 'Hard',
    },
    {
      id: 33,
      image: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Travel Scams',
      description: 'Scammers offer fake travel deals or vacation packages, collecting payments without delivering services or bookings.',
      daysActive: 15,
      affectedUsers: '0.5M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Booking Sites', 'Nonexistent Tours'],
      preventionTips: 'Book through reputable agencies, verify deals, use secure payments.',
      location: 'Global',
      trend: 'seasonal',
      impactScore: 72,
      detectionDifficulty: 'Medium',
    },
    {
      id: 34,
      image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Invoice Fraud',
      description: 'Fraudsters send fake invoices to businesses or individuals, mimicking legitimate vendors to trick them into making payments.',
      daysActive: 20,
      affectedUsers: '0.35M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['Vendor Impersonation', 'Fake Billing'],
      preventionTips: 'Verify invoices, confirm with vendors, use secure payment systems.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 80,
      detectionDifficulty: 'Hard',
    },
    {
      id: 35,
      image: 'https://images.pexels.com/photos/5380663/pexels-photo-5380663.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Botnet Attacks',
      description: 'Hackers use networks of infected devices to launch coordinated attacks, such as DDoS or spam campaigns, compromising user systems.',
      daysActive: 25,
      affectedUsers: '0.6M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['DDoS Attacks', 'Spam Botnets'],
      preventionTips: 'Use firewalls, update devices, monitor network activity.',
      location: 'Global',
      trend: 'stable',
      impactScore: 85,
      detectionDifficulty: 'Hard',
    },
    {
      id: 36,
      image: 'https://images.pexels.com/photos/1181246/pexels-photo-1181246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Government Notices',
      description: 'Scammers send fake notices claiming to be from government agencies, demanding payments or personal information for alleged violations or taxes.',
      daysActive: 18,
      affectedUsers: '0.4M',
      riskLevel: 'High',
      category: 'Phishing',
      subtypes: ['Impersonation', 'Fake Tax Demands'],
      preventionTips: 'Verify notices with official agencies, avoid sharing info, report scams.',
      location: 'USA, India',
      trend: 'increasing',
      impactScore: 82,
      detectionDifficulty: 'Medium',
    },
    {
      id: 37,
      image: 'https://images.pexels.com/photos/3153206/pexels-photo-3153206.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Pharming Attacks',
      description: 'Hackers redirect users from legitimate websites to fake ones to steal login credentials or financial information, often via DNS poisoning.',
      daysActive: 22,
      affectedUsers: '0.3M',
      riskLevel: 'High',
      category: 'Phishing',
      subtypes: ['DNS Spoofing', 'Website Redirection'],
      preventionTips: 'Use secure DNS, check website URLs, enable HTTPS.',
      location: 'Global',
      trend: 'stable',
      impactScore: 83,
      detectionDifficulty: 'Hard',
    },
    {
      id: 38,
      image: 'https://images.pexels.com/photos/5380673/pexels-photo-5380673.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Crowdfunding Scams',
      description: 'Fraudsters create fake crowdfunding campaigns to collect donations for nonexistent causes, exploiting sympathy for personal gain.',
      daysActive: 20,
      affectedUsers: '0.35M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Causes', 'Impersonation'],
      preventionTips: 'Verify campaigns, donate to trusted platforms, research organizers.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 74,
      detectionDifficulty: 'Medium',
    },
    {
      id: 39,
      image: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Rootkit Malware',
      description: 'Malicious software hides itself to gain unauthorized access to systems, stealing data or providing remote control to attackers.',
      daysActive: 28,
      affectedUsers: '0.2M',
      riskLevel: 'Critical',
      category: 'Malware',
      subtypes: ['System Compromise', 'Data Theft'],
      preventionTips: 'Use advanced antivirus, avoid suspicious downloads, monitor system behavior.',
      location: 'Global',
      trend: 'stable',
      impactScore: 90,
      detectionDifficulty: 'Very Hard',
    },
    {
      id: 40,
      image: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Utility Bill Scams',
      description: 'Scammers send fake utility bills demanding immediate payment, often threatening service disconnection to pressure victims.',
      daysActive: 15,
      affectedUsers: '0.5M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Impersonation', 'Fake Billing'],
      preventionTips: 'Verify bills with utility providers, avoid urgent payment demands, report scams.',
      location: 'USA, UK',
      trend: 'stable',
      impactScore: 73,
      detectionDifficulty: 'Medium',
    },
    {
      id: 41,
      image: 'https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Man-in-the-Middle Attacks',
      description: 'Hackers intercept communications between two parties to steal data or manipulate transactions, often on unsecured networks.',
      daysActive: 25,
      affectedUsers: '0.25M',
      riskLevel: 'High',
      category: 'Cyber Attacks',
      subtypes: ['Data Interception', 'Session Hijacking'],
      preventionTips: 'Use VPNs, avoid public Wi-Fi, ensure secure connections.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 88,
      detectionDifficulty: 'Hard',
    },
    {
      id: 42,
      image: 'https://images.pexels.com/photos/1181247/pexels-photo-1181247.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Rental Scams',
      description: 'Scammers list fake rental properties online, collecting deposits or rent payments without providing access to the property.',
      daysActive: 20,
      affectedUsers: '0.4M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Listings', 'Nonexistent Properties'],
      preventionTips: 'Visit properties in person, verify landlords, use trusted platforms.',
      location: 'USA, Canada',
      trend: 'stable',
      impactScore: 75,
      detectionDifficulty: 'Medium',
    },
    {
      id: 43,
      image: 'https://images.pexels.com/photos/3153208/pexels-photo-3153208.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Scholarship Scams',
      description: 'Fraudsters offer fake scholarships or grants, requiring upfront fees or personal information, targeting students and families.',
      daysActive: 18,
      affectedUsers: '0.3M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Grants', 'Application Fee Fraud'],
      preventionTips: 'Verify scholarships, avoid paying fees, use trusted sources.',
      location: 'USA, India',
      trend: 'seasonal',
      impactScore: 72,
      detectionDifficulty: 'Medium',
    },
    {
      id: 44,
      image: 'https://images.pexels.com/photos/5380674/pexels-photo-5380674.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Insurance Scams',
      description: 'Scammers offer fake insurance policies, collecting premiums without providing coverage, leaving victims unprotected.',
      daysActive: 22,
      affectedUsers: '0.35M',
      riskLevel: 'High',
      category: 'Financial Scams',
      subtypes: ['Fake Policies', 'Premium Fraud'],
      preventionTips: 'Verify insurers, check licenses, avoid unsolicited offers.',
      location: 'Global',
      trend: 'stable',
      impactScore: 80,
      detectionDifficulty: 'Hard',
    },
    {
      id: 45,
      image: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Clickjacking Attacks',
      description: 'Hackers trick users into clicking hidden or disguised links, leading to unintended actions like malware installation or data theft.',
      daysActive: 15,
      affectedUsers: '0.5M',
      riskLevel: 'Medium',
      category: 'Malware',
      subtypes: ['Hidden Clicks', 'UI Redressing'],
      preventionTips: 'Use browser security settings, avoid suspicious links, install ad-blockers.',
      location: 'Global',
      trend: 'stable',
      impactScore: 73,
      detectionDifficulty: 'Medium',
    },
    {
      id: 46,
      image: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Event Ticket Scams',
      description: 'Scammers sell fake tickets for concerts, sports events, or festivals, collecting payments without delivering valid tickets.',
      daysActive: 18,
      affectedUsers: '0.4M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Tickets', 'Event Fraud'],
      preventionTips: 'Buy from authorized sellers, verify ticket authenticity, use secure payments.',
      location: 'Global',
      trend: 'seasonal',
      impactScore: 74,
      detectionDifficulty: 'Medium',
    },
    {
      id: 47,
      image: 'https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Warranty Scams',
      description: 'Scammers offer fake extended warranties for products, collecting payments without providing legitimate coverage.',
      daysActive: 20,
      affectedUsers: '0.3M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Fake Warranties', 'Service Fraud'],
      preventionTips: 'Verify warranty providers, check with manufacturers, avoid unsolicited offers.',
      location: 'USA, UK',
      trend: 'stable',
      impactScore: 72,
      detectionDifficulty: 'Medium',
    },
    {
      id: 48,
      image: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Auction Scams',
      description: 'Fraudsters create fake online auctions, collecting payments for nonexistent items or delivering fake goods.',
      daysActive: 15,
      affectedUsers: '0.45M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Non-delivery', 'Counterfeit Items'],
      preventionTips: 'Use trusted auction platforms, verify sellers, avoid off-platform deals.',
      location: 'Global',
      trend: 'stable',
      impactScore: 73,
      detectionDifficulty: 'Medium',
    },
    {
      id: 49,
      image: 'https://images.pexels.com/photos/3153209/pexels-photo-3153209.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Donation Scams',
      description: 'Scammers solicit donations for fake causes or impersonate legitimate organizations, pocketing funds meant for charity.',
      daysActive: 18,
      affectedUsers: '0.35M',
      riskLevel: 'Medium',
      category: 'Financial Scams',
      subtypes: ['Impersonation', 'Fake Causes'],
      preventionTips: 'Donate to verified organizations, research causes, avoid unsolicited requests.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 74,
      detectionDifficulty: 'Medium',
    },
    {
      id: 50,
      image: 'https://images.pexels.com/photos/5380675/pexels-photo-5380675.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=300',
      title: 'Fake Mobile App Scams',
      description: 'Fraudulent apps mimic legitimate ones to steal data, install malware, or charge hidden fees, often distributed through unofficial app stores.',
      daysActive: 20,
      affectedUsers: '0.5M',
      riskLevel: 'High',
      category: 'Malware',
      subtypes: ['Data Theft', 'Malicious Apps'],
      preventionTips: 'Download apps from official stores, check reviews, monitor permissions.',
      location: 'Global',
      trend: 'increasing',
      impactScore: 82,
      detectionDifficulty: 'Hard',
    },
  ],
};

const categoryIcons: CategoryIcons = {
  Phishing: AlertCircle,
  'Identity Theft': Lock,
  'Financial Scams': Shield,
  Malware: AlertTriangle,
};

const riskColors: RiskColors = {
  Critical: 'from-red-500 to-red-700',
  High: 'from-orange-500 to-orange-700',
  Medium: 'from-yellow-500 to-yellow-700',
  Low: 'from-green-500 to-green-700',
};

const trendIcons: TrendIcons = {
  increasing: TrendingUp,
  stable: Activity,
  decreasing: TrendingDown, // Now properly defined
};

const NextGenCyberFraudPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Frauds');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<FraudItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'riskLevel' | 'affectedUsers' | 'daysActive'>('riskLevel');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);


  const carouselRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 100;

  const tabs = ['All Frauds', 'Phishing', 'Identity Theft', 'Financial Scams', 'Malware'];

  // Enhanced filtering and sorting
  const filteredData = fraudData['All Frauds']
    .filter((item) => {
      const matchesTab = activeTab === 'All Frauds' || item.category === activeTab;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = filterRisk === 'all' || item.riskLevel === filterRisk;
      return matchesTab && matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortBy === 'riskLevel') {
        const riskOrder: { [key: string]: number } = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      } else if (sortBy === 'affectedUsers') {
        return parseFloat(b.affectedUsers) - parseFloat(a.affectedUsers);
      } else {
        return b.daysActive - a.daysActive;
      }
    });

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(filteredData.length / itemsPerPage);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlay]);

  // Drag handlers
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setIsAutoPlay(false);
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsAutoPlay(true);

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }
    setDragOffset(0);
  };

  const openModal = (item: FraudItem) => {
    setSelectedCard(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
      </div>

      {/* Neural Network Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>



      {/* Header with Glass Morphism */}
      <div className="relative  border-b border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">

            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Cyber Fraud
              </h1>
              <p className="text-lg text-gray-300">Phishing, OTP scams, fake links se suraksha — Sadaiv Yuva fights digital frauds with awareness.</p>
            </div>
          </div>



          {/* Tab Navigation with Glow Effects */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tabs.map((tab) => {
              const IconComponent = categoryIcons[tab as keyof typeof categoryIcons];
              return (
                <button
                  key={tab}
                  className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-300 border border-white/20'
                    }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentSlide(0);
                  }}
                >
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-20 animate-pulse"></div>
                  )}
                  {IconComponent && <IconComponent className="w-4 h-4 relative z-10" />}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">


        {/* Threat Cards with Advanced Interactions */}
        <div className="relative ">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map((item) => (
                      <div
                        key={item.id}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => openModal(item)}
                      >
                        {/* Glow Effect */}
                        {hoveredCard === item.id && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        )}

                        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300 transform group-hover:scale-105">


                          {/* Threat Image */}
                          <div className="relative overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                         
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <p className="text-cyan-300 font-semibold text-sm">{item.category}</p>
                            </div>

                            <h3 className="font-bold text-lg text-white mb-3 leading-tight">{item.title}</h3>

                            <div className="h-32 flex items-center justify-center">
                              <p className="text-gray-300 text-center text-sm leading-relaxed">
                                {item.description}
                              </p>
                            </div>



                            {/* Detection Difficulty */}
                            {/* <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-400 text-xs">Detection Difficulty</span>
                                <span className="text-gray-300 text-xs">{item.detectionDifficulty}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    item.detectionDifficulty === 'Very Hard'
                                      ? 'bg-red-500 w-full'
                                      : item.detectionDifficulty === 'Hard'
                                      ? 'bg-orange-500 w-3/4'
                                      : 'bg-yellow-500 w-1/2'
                                  }`}
                                ></div>
                              </div>
                            </div> */}

                            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4" />
                              Analyze Threat
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
              className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Advanced Modal */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedCard.title}</h2>
                    <p className="text-cyan-300 font-semibold">{selectedCard.category}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image and Basic Info */}
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-6">
                    <img src={selectedCard.image} alt={selectedCard.title} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{selectedCard.location}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${riskColors[selectedCard.riskLevel]} text-white`}>
                          {selectedCard.riskLevel} Risk
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Subtypes */}
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Threat Variants
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.subtypes.map((subtype: string, index: number) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium"
                        >
                          {subtype}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Details and Actions */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      Threat Analysis
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{selectedCard.description}</p>

                    {/* AI Analysis */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-300 font-semibold text-sm">AI-Powered Analysis</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Sadaiv Yuva Cyber Foundation cyber safety par regular seminars organize karta hai aur cyber frauds se bachav ke liye awareness aur protection services provide karta hai.
                      </p>

                    </div>
                  </div>

                  {/* Prevention Section */}
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      Prevention Strategy
                    </h3>
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{selectedCard.preventionTips}</p>
                    </div>
                  </div>




                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextGenCyberFraudPlatform;