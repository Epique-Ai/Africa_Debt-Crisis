import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'stress-test', label: 'Scenarios' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'report', label: 'Report' },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-primary" />
            <span>AfricaDebt</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="default" size="sm" onClick={() => handleNavClick('dashboard')}>
              Explore Data
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className="justify-start text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Button>
              ))}
              <Button variant="default" className="mt-2" onClick={() => handleNavClick('dashboard')}>
                Explore Data
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
