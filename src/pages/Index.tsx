import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PublishersSection } from "@/components/sections/PublishersSection";
import { AdvertisersSection } from "@/components/sections/AdvertisersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PublishersSection />
        <AdvertisersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;