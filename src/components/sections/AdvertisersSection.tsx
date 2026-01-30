import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Gamepad2, Heart, Home, Wallet, Shield, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvertiserApplicationForm } from "@/components/forms/AdvertiserApplicationForm";
const verticals = [
  { icon: Gamepad2, name: "Games" },
  { icon: Heart, name: "Health & Beauty" },
  { icon: Trophy, name: "Sweepstakes" },
  { icon: Home, name: "Home/Mortgage" },
  { icon: Wallet, name: "Finance" },
  { icon: Shield, name: "Insurance" },
];

const features = [
  "High-quality lead generation",
  "AI-based fraud detection",
  "Real-time tracking & analytics",
  "Global traffic sources",
  "Branding & consulting",
  "Custom campaign optimization",
];

export const AdvertisersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="advertisers" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Verticals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="p-8 rounded-3xl bg-glass border border-border">
              <h3 className="font-display text-2xl font-bold mb-6">Our Verticals</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {verticals.map((vertical, index) => {
                  const Icon = vertical.icon;
                  return (
                    <motion.div
                      key={vertical.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex flex-col items-center p-4 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer group"
                    >
                      <Icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground text-center">{vertical.name}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Features List */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">What We Offer:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">For Advertisers</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Scale Your <span className="text-gradient">Campaigns</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Connect with premium traffic sources and scale your campaigns with confidence. 
              Our AI-powered fraud detection ensures only quality leads, while our real-time 
              tracking gives you complete visibility into performance.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We customize everything according to your needs, providing branding from the inside-out, 
              and pride ourselves on our expertise in consulting and marketing strategies on a global scale.
            </p>
            <Button variant="hero" size="xl" onClick={() => setIsFormOpen(true)}>
              Become an Advertiser
            </Button>
            <AdvertiserApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
