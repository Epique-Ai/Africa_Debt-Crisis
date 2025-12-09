import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/live-feed', label: 'Live Feed' },
    { path: '/scenarios', label: 'Scenarios' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/report', label: 'Report' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-primary" />
            <span>AfricaDebt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    location.pathname === item.path && "text-foreground bg-secondary/50"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/dashboard">
              <Button variant="default" size="sm">
                Explore Data
              </Button>
            </Link>
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
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-foreground",
                      location.pathname === item.path && "text-foreground bg-secondary/50"
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full mt-2">
                  Explore Data
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
