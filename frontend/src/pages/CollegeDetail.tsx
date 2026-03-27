import { useMemo } from 'react';
import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetColleges } from '@/hooks/useQueries';
import {
  MapPin, DollarSign, Award, BookOpen, FileText, CheckCircle,
  ArrowLeft, BarChart2, Globe, Building, Calendar, GraduationCap,
  TrendingUp
} from 'lucide-react';
import { CollegeType, Stream } from '../backend';
import { formatFees } from '@/components/CollegeCard';

const streamLabel: Record<Stream, string> = {
  [Stream.science]: 'Science',
  [Stream.commerce]: 'Commerce',
  [Stream.arts]: 'Arts',
};

const typeLabel: Record<CollegeType, string> = {
  [CollegeType.government]: 'Government',
  [CollegeType.private_]: 'Private',
  [CollegeType.deemed]: 'Deemed',
};

const typeColor: Record<CollegeType, string> = {
  [CollegeType.government]: 'bg-teal-100 text-teal-700',
  [CollegeType.private_]: 'bg-amber-100 text-amber-700',
  [CollegeType.deemed]: 'bg-secondary text-secondary-foreground',
};

function formatDeadline(ts: bigint): string {
  if (!ts || ts === 0n) return 'Not specified';
  const ms = Number(ts) / 1_000_000;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return 'Not specified';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Simple SVG mini-map showing a dot at the college's approximate location
function MiniMap({ lat, lon, name }: { lat: number; lon: number; name: string }) {
  const SVG_W = 400;
  const SVG_H = 200;
  const x = ((lon + 180) / 360) * SVG_W;
  const y = ((90 - lat) / 180) * SVG_H;

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-xs">
      <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
        <MapPin size={14} className="text-primary" />
        <span className="text-sm font-medium text-foreground">Location</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
        </span>
      </div>
      <div className="relative" style={{ paddingBottom: '50%' }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'oklch(0.93 0.03 210)' }}
        >
          <defs>
            <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.85 0.03 210)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#mini-grid)" />
          {/* Simplified continent shapes */}
          <path d="M 32 32 L 80 28 L 92 48 L 88 72 L 72 80 L 60 88 L 48 80 L 36 64 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          <path d="M 64 92 L 80 88 L 88 112 L 84 144 L 72 152 L 62 136 L 58 112 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          <path d="M 172 24 L 204 22 L 212 36 L 204 44 L 188 46 L 176 40 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          <path d="M 180 52 L 212 48 L 224 80 L 216 124 L 196 136 L 180 120 L 172 88 L 176 64 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          <path d="M 212 20 L 300 16 L 328 32 L 320 64 L 288 72 L 260 68 L 232 60 L 216 48 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          <path d="M 256 60 L 272 58 L 280 80 L 272 96 L 260 92 L 252 76 Z" fill="oklch(0.75 0.06 155)" stroke="oklch(0.65 0.07 155)" strokeWidth="0.5" opacity="0.9" />
          <path d="M 300 112 L 344 108 L 352 136 L 336 156 L 308 156 L 292 136 Z" fill="oklch(0.82 0.04 155)" stroke="oklch(0.7 0.05 155)" strokeWidth="0.5" opacity="0.7" />
          {/* Equator */}
          <line x1="0" y1="100" x2={SVG_W} y2="100" stroke="oklch(0.75 0.04 210)" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
          {/* College marker */}
          <circle cx={x} cy={y} r="8" fill="oklch(0.75 0.16 75)" stroke="white" strokeWidth="2" opacity="0.9" />
          <circle cx={x} cy={y} r="14" fill="none" stroke="oklch(0.75 0.16 75)" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>
      <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground text-center">
        📍 {name}
      </div>
    </div>
  );
}

export default function CollegeDetail() {
  const { id } = useParams({ from: '/college/$id' });
  const navigate = useNavigate();
  const { data: colleges, isLoading } = useGetColleges();

  const college = useMemo(() => {
    if (!colleges) return null;
    return colleges.find(c => String(c.id) === id) ?? null;
  }, [colleges, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="container mx-auto px-4 max-w-4xl text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Building size={36} className="text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">College Not Found</h2>
          <p className="text-muted-foreground mb-6">The college you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate({ to: '/recommendations' })} className="bg-primary text-primary-foreground">
            Back to Recommendations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/recommendations" className="hover:text-primary transition-colors">Recommendations</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{college.name}</span>
        </nav>

        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          className="mb-6 font-medium"
          onClick={() => navigate({ to: '/recommendations' })}
        >
          <ArrowLeft size={14} className="mr-2" />
          Back to Recommendations
        </Button>

        {/* Hero Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs mb-6">
          <div className="h-2 bg-gradient-to-r from-primary to-accent" />
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {college.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin size={15} />
                  <span className="text-base">{college.city}, {college.country}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${typeColor[college.collegeType]} font-medium`}>
                    <Building size={12} className="mr-1" />
                    {typeLabel[college.collegeType]}
                  </Badge>
                  <Badge variant="outline" className="font-medium">
                    <BookOpen size={12} className="mr-1" />
                    {streamLabel[college.stream]}
                  </Badge>
                  <Badge variant="outline" className="font-medium">
                    <Globe size={12} className="mr-1" />
                    {college.country}
                  </Badge>
                </div>
              </div>
              <Link to="/compare">
                <Button className="bg-primary text-primary-foreground font-semibold flex-shrink-0">
                  <BarChart2 size={15} className="mr-2" />
                  Add to Comparison
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: DollarSign,
              label: 'Annual Fees',
              value: formatFees(college.annualFees, college.country),
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
            {
              icon: Award,
              label: 'National Rank',
              value: `#${Number(college.rankingNational)}`,
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: TrendingUp,
              label: 'Global Rank',
              value: `#${Number(college.rankingGlobal)}`,
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: GraduationCap,
              label: 'Min. Eligibility',
              value: `${college.eligibilityCriteria}%`,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center shadow-xs">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} className={color} />
              </div>
              <div className="font-display font-bold text-lg text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Courses Offered */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen size={16} className="text-primary" />
              </div>
              <h2 className="font-display font-semibold text-foreground">Courses Offered</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {college.coursesOffered.map(course => (
                <Badge key={course} variant="secondary" className="text-sm font-medium">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Admission Deadline */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Calendar size={16} className="text-amber-600" />
              </div>
              <h2 className="font-display font-semibold text-foreground">Admission Deadline</h2>
            </div>
            <div className="text-2xl font-display font-bold text-foreground mb-1">
              {formatDeadline(college.applicationDeadline)}
            </div>
            <p className="text-sm text-muted-foreground">
              Ensure all documents are submitted before this date.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Required Documents */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText size={16} className="text-primary" />
              </div>
              <h2 className="font-display font-semibold text-foreground">Required Documents</h2>
            </div>
            {college.admissionRequirements.length > 0 ? (
              <ul className="space-y-2.5">
                {college.admissionRequirements.map(req => (
                  <li key={req} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No specific requirements listed.</p>
            )}
          </div>

          {/* Eligibility */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <GraduationCap size={16} className="text-amber-600" />
              </div>
              <h2 className="font-display font-semibold text-foreground">Eligibility Criteria</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-secondary/50">
                <div className="text-xs text-muted-foreground mb-1">Minimum Percentage Required</div>
                <div className="text-2xl font-display font-bold text-foreground">
                  {college.eligibilityCriteria}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50">
                <div className="text-xs text-muted-foreground mb-1">Stream</div>
                <div className="font-semibold text-foreground">{streamLabel[college.stream]}</div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50">
                <div className="text-xs text-muted-foreground mb-1">Institution Type</div>
                <div className="font-semibold text-foreground">{typeLabel[college.collegeType]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Map */}
        <div className="mb-6">
          <MiniMap lat={college.latitude} lon={college.longitude} name={`${college.name}, ${college.city}`} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link to="/compare" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold">
              <BarChart2 size={15} className="mr-2" />
              Add to Comparison
            </Button>
          </Link>
          <Link to="/recommendations" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto font-medium">
              <ArrowLeft size={15} className="mr-2" />
              Back to Recommendations
            </Button>
          </Link>
          <Link to="/guidelines" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto font-medium">
              <FileText size={15} className="mr-2" />
              View Admission Guidelines
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
