import HeroSection from '@/app/components/SocialWork/components/HeroSection';
import ImpactDocumentary from '@/app/components/SocialWork/components/ImpactDocumentary';
import HumanStories from '@/app/components/SocialWork/components/HumanStories';
import PhotoEssay from '@/app/components/SocialWork/components/PhotoEssay';
import ImpactMap from '@/app/components/SocialWork/components/ImpactMap';
import AnnualStats from'@/app/components/SocialWork/components/AnnualStats';
import VolunteerTimeline from '@/app/components/SocialWork/components/VolunteerTimeline';
import CommunityMasonry from '@/app/components/SocialWork/components/CommunityMasonry';
import CTASection from '@/app/components/SocialWork/components/CTASection';
import Footer from '@/app/components/SocialWork/components/Footer';

export default function SocialImpactPage() {
  return (
    <main className="bg-[#FCFCFA]">
      {/* S1: Immersive Hero */}
      <HeroSection />

      {/* S2: Impact Documentary — alternating storytelling */}
      <ImpactDocumentary />

      {/* S3: Human Stories — magazine interview layout */}
      <HumanStories />

      {/* S4: Photo Essay — editorial newspaper style */}
      {/* <PhotoEssay /> */}

      {/* S5: Impact Map — interactive India map */}
      <ImpactMap />

      {/* S6: Annual Statistics — infographic style */}
      <AnnualStats />

      {/* S7: Volunteer Stories — timeline */}
      <VolunteerTimeline />

      {/* S8: Community Moments — masonry */}
      <CommunityMasonry />

      {/* S9: CTA — emotional */}
      <CTASection />

  
    </main>
  );
}
