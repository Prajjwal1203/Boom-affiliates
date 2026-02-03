import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Publishers", href: "#publishers" },
    { name: "Advertisers", href: "#advertisers" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
  verticals: [
    { name: "Games", href: "#" },
    { name: "Finance", href: "#" },
    { name: "Health & Beauty", href: "#" },
    { name: "Insurance", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:business@adaffgrow.com", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">B</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Adaff<span className="text-gradient">Grow</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Your gateway to high-quality affiliate marketing. Performance-driven solutions since 2018.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticals */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Verticals</h4>
            <ul className="space-y-3">
              {footerLinks.verticals.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AdaffGrow. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Based in Tel-Aviv & Estonia 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};
