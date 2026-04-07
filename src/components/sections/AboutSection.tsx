import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const expertiseAreas = [
  { name: "Strategy & Planning", percentage: 79 },
  { name: "Performance Marketing", percentage: 82 },
  { name: "Lead Generation", percentage: 88 },
  { name: "AI Fraud Detection", percentage: 61 },
];

const ProgressBar = ({ name, percentage, delay }: { name: string; percentage: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-primary font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-primary"
        />
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Full-Service <span className="text-gradient">Creative Agency</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Adaffgrow is your pass to the most advanced technological, creative agency in the advertising industry. 
              We aren't just your typical media agency. We are fully secure and offer only high-quality leads, 
              tons of traffic sources, and certified media partners.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Based in Singapore, we have the talent, creativity, and desire to take on any business task. 
              We specialize in customizing everything according to your needs, providing branding from the inside-out, 
              and pride ourselves on our expertise in consulting and marketing strategies on a global scale.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "AI-Based Tracking",
                "Global Reach",
                "24/7 Support",
                "Fraud Detection",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Expertise Bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-glass border border-border"
          >
            <h3 className="font-display text-2xl font-bold mb-8">Our Expertise</h3>
            {expertiseAreas.map((area, index) => (
              <ProgressBar
                key={area.name}
                name={area.name}
                percentage={area.percentage}
                delay={0.4 + index * 0.15}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
