import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users, BookOpen, BarChart2, Map, MapPin, MessageCircle,
  ArrowRight, CheckCircle, Star, Globe, TrendingUp, Zap
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Student Profile',
    description: 'Enter your academic scores, stream, budget, and preferences to build a personalized profile.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    link: '/profile',
  },
  {
    icon: BookOpen,
    title: 'AI Recommendations',
    description: 'Get ML-powered college suggestions ranked by match score based on your unique profile.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    link: '/recommendations',
  },
  {
    icon: BarChart2,
    title: 'College Comparison',
    description: 'Compare 2–4 colleges side-by-side on fees, rankings, eligibility, and more.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    link: '/compare',
  },
  {
    icon: Map,
    title: 'Interactive Map',
    description: 'Explore college locations worldwide with an interactive map and geographic insights.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    link: '/map',
  },
  {
    icon: MapPin,
    title: 'Admission Guidelines',
    description: 'Step-by-step admission guidance for India, USA, UK, Canada, and Australia.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    link: '/guidelines',
  },
  {
    icon: MessageCircle,
    title: 'AI Chatbot',
    description: 'Ask questions about fees, eligibility, documents, and deadlines — get instant answers.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    link: '/recommendations',
  },
];

const steps = [
  {
    number: '01',
    title: 'Enter Your Profile',
    description: 'Fill in your academic stream, percentage, budget range, interests, and preferred region.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Get Recommendations',
    description: 'Our ML algorithm analyzes your profile and ranks colleges by compatibility score.',
    icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Compare & Decide',
    description: 'Compare shortlisted colleges side-by-side and explore detailed admission guidelines.',
    icon: CheckCircle,
  },
];

const stats = [
  { value: '20+', label: 'Colleges Listed', icon: Globe },
  { value: '5', label: 'Countries Covered', icon: MapPin },
  { value: '6', label: 'AI Intents Handled', icon: Zap },
  { value: '100%', label: 'Free to Use', icon: Star },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/assets/generated/hero-bg.dim_1440x600.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Zap size={14} className="text-amber-300" />
                <span>AI-ML Powered Platform</span>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                EduMap: AI-ML Powered{' '}
                <span className="text-amber-300">Global Admission</span>{' '}
                Navigator
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                Simplify your college selection journey with personalized recommendations, real-time comparisons, and structured admission guidance — all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/profile">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold shadow-lg px-8">
                    Start Your Journey
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/recommendations">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                    View Recommendations
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-fade-in">
              <div className="relative">
                <div className="w-[480px] h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="/assets/generated/students-hero.dim_600x400.png"
                    alt="Students exploring college options"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Floating stat cards */}
                <div className="absolute -bottom-4 -left-6 bg-card text-card-foreground rounded-xl p-3 shadow-card-hover border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <TrendingUp size={16} className="text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Match Score</div>
                      <div className="font-bold text-sm text-foreground">95% Match</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-6 bg-card text-card-foreground rounded-xl p-3 shadow-card-hover border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Globe size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                      <div className="font-bold text-sm text-foreground">5 Regions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="oklch(0.98 0.005 200)" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center p-6 rounded-2xl bg-card border border-border shadow-xs card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-sm text-muted-foreground font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to{' '}
              <span className="teal-gradient-text">Choose Wisely</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Six powerful modules designed to guide you from confusion to clarity in your college admission journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color, bg, link }) => (
              <Link key={title} to={link}>
                <Card className="h-full card-hover cursor-pointer border-border hover:border-primary/30 group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={color} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                    <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight size={14} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three simple steps to find your perfect college match using AI-powered insights.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30" />
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <div key={number} className="relative text-center">
                <div className="relative inline-flex">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xs z-20">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/profile">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10">
                Get Started Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Dream College?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of students who have simplified their admission journey with EduMap's AI-powered platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/profile">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8">
                Create Your Profile
              </Button>
            </Link>
            <Link to="/guidelines">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                View Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
