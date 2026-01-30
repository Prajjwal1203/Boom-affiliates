import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, DollarSign, Clock, Users, TrendingUp, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublisherApplicationForm } from "@/components/forms/PublisherApplicationForm";
const benefits = [
  {
    icon: DollarSign,
    title: "Highest CPA Rates",
    description: "Competitive rate matching and increasing payouts as your volume grows.",
  },
  {
    icon: Clock,
    title: "Guaranteed Payments",
    description: "On-time automated payments you can always count on.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Increase volume anytime with our scalable infrastructure.",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    description: "Personal support to help you optimize and grow.",
  },
  {
    icon: Check,
    title: "Custom Campaigns",
    description: "Build-out custom campaigns tailored to your audience.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock US support team always available.",
  },
];

export const PublishersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section id="publishers" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">For Publishers</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Maximize Your <span className="text-gradient">Revenue</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Boom Affiliates knows what publishers want. We keep it simple: the highest CPA rates, 
              guaranteed payments, access to exclusive offers, and dedicated support to help you succeed.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our goal is to grow your bottom line and increase your reach. We want to be not just 
              a one-stop shop for all your performance-based marketing needs, but your ONLY stop.
            </p>
            <Button variant="hero" size="xl" onClick={() => setIsFormOpen(true)}>
              Become a Publisher
            </Button>
            <PublisherApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
          </motion.div>

          {/* Right - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-5 rounded-xl bg-glass border border-border hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
