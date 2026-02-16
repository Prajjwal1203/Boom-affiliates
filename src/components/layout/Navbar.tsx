import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Publishers", href: "#publishers" },
  { name: "Advertisers", href: "#advertisers" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-glass shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="Adaffgrow Logo" className="h-24 w-auto object-contain" />
            <span className="text-xl font-bold">
              <span className="text-black">Adaff</span>
              <span className="text-pink-500">grow</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <span className="text-muted-foreground text-sm">
                      {user.email}
                    </span>
                    <Button variant="heroOutline" size="lg" onClick={signOut}>
                      <LogOut size={18} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="heroOutline" size="lg" onClick={() => navigate("/auth")}>
                      Login
                    </Button>
                    <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
                      Get Started
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <span className="text-muted-foreground text-sm text-center">
                          {user.email}
                        </span>
                        <Button variant="heroOutline" size="lg" className="w-full" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                          <LogOut size={18} />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="heroOutline" size="lg" className="w-full" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }}>
                          Login
                        </Button>
                        <Button variant="hero" size="lg" className="w-full" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }}>
                          Get Started
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
