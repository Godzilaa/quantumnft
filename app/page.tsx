import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NFTListings from "@/components/NFTListings";
import FeaturedCollectibles from "@/components/FeaturedCollectibles";
import ReserveSection from "@/components/ReserveSection";
import DiscoverNFTs from "@/components/DiscoverNFTs";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "white" }}>
      <Navbar />
      <Hero />
      <NFTListings />
      <FeaturedCollectibles />
      <ReserveSection />
      <DiscoverNFTs />
      <VideoSection />
      <Footer />
    </main>
  );
}
