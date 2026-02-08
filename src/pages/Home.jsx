import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import RealisationsSection from "@/components/RealisationsSection";
import FooterSection from "@/components/FooterSection";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <RealisationsSection />
        <ServicesSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default Home
