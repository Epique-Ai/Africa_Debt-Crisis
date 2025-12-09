import { BarChart3, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span>AfricaDebt Analytics</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              A comprehensive analytical framework for understanding Africa's sovereign debt crisis 
              and identifying paths to fiscal sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Sections</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/scenarios" className="hover:text-foreground transition-colors">Scenarios</Link></li>
              <li><Link to="/methodology" className="hover:text-foreground transition-colors">Methodology</Link></li>
              <li><Link to="/report" className="hover:text-foreground transition-colors">Report</Link></li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>IMF World Economic Outlook</li>
              <li>World Bank IDS</li>
              <li>African Development Bank</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 AfricaDebt Analytics. Built for analytical purposes.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
