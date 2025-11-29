import { BarChart3, Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-lg font-bold mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span>AfricaDebt Analytics</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A comprehensive analytical framework for understanding Africa's sovereign debt crisis, 
              developed for the 10Alytics Global Hackathon 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Sections</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
              <li><a href="#methodology" className="hover:text-foreground transition-colors">Methodology</a></li>
              <li><a href="#report" className="hover:text-foreground transition-colors">Report</a></li>
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
            © 2024 10Alytics Global Hackathon. Built for analytical purposes.
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
