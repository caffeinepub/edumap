import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, GraduationCap, MapPin, BookOpen, Users, BarChart2, Map, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatbotWidget from './ChatbotWidget';

const navLinks = [
  { to: '/', label: 'Home', icon: GraduationCap },
  { to: '/profile', label: 'Profile', icon: Users },
  { to: '/recommendations', label: 'Recommendations', icon: BookOpen },
  { to: '/compare', label: 'Compare', icon: BarChart2 },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/guidelines', label: 'Guidelines', icon: MapPin },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) => {
    if (to === '/') return currentPath === '/';
    return currentPath.startsWith(to);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="/assets/generated/edumap-logo.dim_256x256.png"
                alt="EduMap Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><span class="text-primary-foreground font-bold text-sm">E</span></div>';
                  }
                }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg text-primary">EduMap</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide hidden sm:block">Global Admission Navigator</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link to="/profile" className="hidden sm:block">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Get Started
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-fade-in">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-1">
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img
                    src="/assets/generated/edumap-logo.dim_256x256.png"
                    alt="EduMap"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <span className="font-display font-bold text-primary">EduMap</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-ML Powered Global Admission Navigator helping students find their perfect college match.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-foreground">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Personalized Recommendations</li>
                <li>College Comparison</li>
                <li>Interactive Map</li>
                <li>AI Chatbot Support</li>
                <li>Admission Guidelines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} EduMap. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Built with <span className="text-red-500">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'edumap')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget - always visible */}
      <ChatbotWidget />
    </div>
  );
}
