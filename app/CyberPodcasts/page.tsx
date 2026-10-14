// app/page.tsx
import Hero from '@/app/components/CyberPodcasts2/components/Hero'
import FeaturedEpisode from '@/app/components/CyberPodcasts2/components/FeaturedEpisode'
import JourneyTimeline from '@/app/components/CyberPodcasts2/components/JourneyTimeline'
import RealStories from '@/app/components/CyberPodcasts2/components/RealStories'
import ExpertVoices from '@/app/components/CyberPodcasts2/components/ExpertVoices'
import StudioGallery from '@/app/components/CyberPodcasts2/components/StudioGallery'
import LatestEpisodes from '@/app/components/CyberPodcasts2/components/LatestEpisodes'
import ImpactNumbers from '@/app/components/CyberPodcasts2/components/ImpactNumbers'
import JoinMovement from '@/app/components/CyberPodcasts2/components/JoinMovement'
import PodcastSeries from '@/app/components/CyberPodcasts2/components/PodcstSeries'
import LiveAndComing from '@/app/components/CyberPodcasts2/components/LiveAndComing'
import CYberHub from '@/app/components/CyberPodcasts2/components/CyberHub'
import Testimonials from '@/app/components/CyberPodcasts2/components/Testimonials'

export default function Home() { 
  return (
    <main className="bg-paper">
      <Hero />
      <FeaturedEpisode />

      {/* <JourneyTimeline /> */}
      <RealStories />
       <PodcastSeries/>
      <ExpertVoices />
      <StudioGallery />
      <LatestEpisodes />
      <LiveAndComing/>
      <CYberHub/>
<Testimonials/>
      <ImpactNumbers />
      <JoinMovement />
    </main>
  )
}
