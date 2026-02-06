import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default Home
