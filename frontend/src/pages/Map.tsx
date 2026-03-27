import { useState, useMemo } from 'react';
import { useGetColleges } from '@/hooks/useQueries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Filter, X, DollarSign, Award, Globe } from 'lucide-react';
import type { College } from '../backend';
import { Stream } from '../backend';
import { formatFees } from '@/components/CollegeCard';
import { Link } from '@tanstack/react-router';

const streamLabel: Record<Stream, string> = {
  [Stream.science]: 'Science',
  [Stream.commerce]: 'Commerce',
  [Stream.arts]: 'Arts',
};

// Map college coordinates to SVG positions (simplified world map projection)
// Using a simple equirectangular projection
function latLonToSVG(lat: number, lon: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

const COUNTRIES = ['All', 'India', 'USA', 'UK', 'Canada', 'Australia'];
const STREAMS = ['All', 'Science', 'Commerce', 'Arts'];

export default function MapPage() {
  const { data: colleges, isLoading } = useGetColleges();
  const [countryFilter, setCountryFilter] = useState('All');
  const [streamFilter, setStreamFilter] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const filteredColleges = useMemo(() => {
    if (!colleges) return [];
    return colleges.filter(c => {
      const countryMatch = countryFilter === 'All' || c.country === countryFilter;
      const streamMatch = streamFilter === 'All' || streamLabel[c.stream] === streamFilter;
      return countryMatch && streamMatch;
    });
  }, [colleges, countryFilter, streamFilter]);

  const SVG_W = 1000;
  const SVG_H = 500;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">College Map</h1>
          <p className="text-muted-foreground">
            Explore college locations worldwide. Click a marker to see details.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-card border border-border rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter size={14} />
            Filters:
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <Globe size={13} className="mr-1.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c === 'All' ? 'All Countries' : c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={streamFilter} onValueChange={setStreamFilter}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STREAMS.map(s => <SelectItem key={s} value={s}>{s === 'All' ? 'All Streams' : s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="text-xs ml-auto">
            {filteredColleges.length} colleges shown
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs" style={{ minHeight: 420 }}>
              {isLoading ? (
                <Skeleton className="w-full h-96" />
              ) : (
                <div className="relative w-full" style={{ paddingBottom: '50%' }}>
                  <svg
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: 'oklch(0.93 0.03 210)' }}
                  >
                    {/* Simple world map background */}
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="oklch(0.85 0.03 210)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

                    {/* Continent outlines (simplified) */}
                    {/* North America */}
                    <path d="M 80 80 L 200 70 L 230 120 L 220 180 L 180 200 L 150 220 L 120 200 L 90 160 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* South America */}
                    <path d="M 160 230 L 200 220 L 220 280 L 210 360 L 180 380 L 155 340 L 145 280 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* Europe */}
                    <path d="M 430 60 L 510 55 L 530 90 L 510 110 L 470 115 L 440 100 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* Africa */}
                    <path d="M 450 130 L 530 120 L 560 200 L 540 310 L 490 340 L 450 300 L 430 220 L 440 160 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* Asia */}
                    <path d="M 530 50 L 750 40 L 820 80 L 800 160 L 720 180 L 650 170 L 580 150 L 540 120 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* India subcontinent */}
                    <path d="M 640 150 L 680 145 L 700 200 L 680 240 L 650 230 L 630 190 Z" fill="oklch(0.75 0.06 155)" stroke="oklch(0.65 0.07 155)" strokeWidth="1" opacity="0.9" />
                    {/* Australia */}
                    <path d="M 750 280 L 860 270 L 880 340 L 840 390 L 770 390 L 730 340 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="1" opacity="0.7" />
                    {/* UK */}
                    <path d="M 450 65 L 465 60 L 470 80 L 455 85 Z" fill="oklch(0.75 0.06 155)" stroke="oklch(0.65 0.07 155)" strokeWidth="1" opacity="0.9" />

                    {/* Equator line */}
                    <line x1="0" y1="250" x2={SVG_W} y2="250" stroke="oklch(0.75 0.04 210)" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.5" />

                    {/* College Markers */}
                    {filteredColleges.map(college => {
                      const { x, y } = latLonToSVG(college.latitude, college.longitude, SVG_W, SVG_H);
                      const isSelected = selectedCollege?.id === college.id;
                      return (
                        <g
                          key={String(college.id)}
                          transform={`translate(${x}, ${y})`}
                          onClick={() => setSelectedCollege(isSelected ? null : college)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            r={isSelected ? 10 : 7}
                            fill={isSelected ? 'oklch(0.75 0.16 75)' : 'oklch(0.45 0.11 190)'}
                            stroke="white"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                          {isSelected && (
                            <circle r="14" fill="none" stroke="oklch(0.75 0.16 75)" strokeWidth="2" opacity="0.5" />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
              <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>College Location</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Selected</span>
                </div>
                <span className="ml-auto">Click a marker to view details</span>
              </div>
            </div>
          </div>

          {/* Sidebar: Selected College or College List */}
          <div className="space-y-4">
            {selectedCollege ? (
              <Card className="border-border shadow-xs">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold text-base text-foreground leading-tight">
                      {selectedCollege.name}
                    </h3>
                    <button
                      onClick={() => setSelectedCollege(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin size={13} />
                    {selectedCollege.city}, {selectedCollege.country}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-secondary/50 text-center">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                        <DollarSign size={11} /> Fees
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {formatFees(selectedCollege.annualFees, selectedCollege.country)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50 text-center">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                        <Award size={11} /> Rank
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        #{Number(selectedCollege.rankingNational)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedCollege.coursesOffered.slice(0, 3).map(c => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                  <Link to="/college/$id" params={{ id: String(selectedCollege.id) }}>
                    <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                      View Full Details
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
                <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  Colleges ({filteredColleges.length})
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)
                  ) : filteredColleges.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No colleges match the filters</p>
                  ) : (
                    filteredColleges.map(c => (
                      <button
                        key={String(c.id)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-secondary transition-colors"
                        onClick={() => setSelectedCollege(c)}
                      >
                        <div className="font-medium text-sm text-foreground truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.city}, {c.country}</div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
