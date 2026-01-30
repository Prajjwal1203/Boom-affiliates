import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Users, Globe, Shield, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Lead Generation",
    description: "High-quality leads through targeted campaigns across multiple verticals including Games, Finance, Health & Beauty, and more.",
  },
  {
    icon: Rocket,
    title: "Performance Marketing",
    description: "Data-driven performance solutions optimized for maximum ROI with real-time tracking and AI-based analytics.",
  },
  {
    icon: Users,
    title: "Publisher Network",
    description: "Connect with premium publishers and monetize traffic with the highest CPA rates and guaranteed timely payments.",
  },
  {
    icon: Globe,
    title: "Global Campaigns",
    description: "Reach audiences worldwide with our international network of partners and localized marketing strategies.",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "AI-powered fraud detection algorithms ensure only quality traffic and protect your campaigns from invalid clicks.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards with real-time tracking, detailed reports, and actionable insights for optimization.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-primary shadow-button">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      {/* Content */}
      <h3 className="relative font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>
      <p className="relative text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      {/* Arrow indicator */}
      <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">What We Do</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive affiliate marketing solutions designed to maximize your revenue 
            and scale your business across multiple verticals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
