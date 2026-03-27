import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, DollarSign, Award, ArrowRight, BarChart2 } from 'lucide-react';
import type { College } from '../backend';
import { CollegeType, Stream } from '../backend';

interface CollegeCardProps {
  college: College;
  matchScore?: number;
  onAddToCompare?: (id: bigint) => void;
  inCompare?: boolean;
}

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

export function formatFees(fees: bigint, country: string): string {
  const num = Number(fees);
  if (country === 'India') {
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L/yr`;
    return `₹${num.toLocaleString('en-IN')}/yr`;
  }
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K/yr`;
  return `$${num.toLocaleString()}/yr`;
}

export default function CollegeCard({ college, matchScore, onAddToCompare, inCompare }: CollegeCardProps) {
  return (
    <Card className="border-border shadow-xs card-hover group overflow-hidden">
      <CardContent className="p-0">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-base text-foreground leading-tight truncate group-hover:text-primary transition-colors">
                {college.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                <MapPin size={13} />
                <span className="truncate">{college.city}, {college.country}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <Badge className={`text-xs font-medium ${typeColor[college.collegeType]}`}>
                {typeLabel[college.collegeType]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {streamLabel[college.stream]}
              </Badge>
            </div>
          </div>

          {/* Match Score */}
          {matchScore !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <TrendingUp size={12} /> Match Score
                </span>
                <span className={`text-sm font-bold ${matchScore >= 70 ? 'text-success' : matchScore >= 40 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                  {matchScore}%
                </span>
              </div>
              <div className="match-bar">
                <div
                  className="match-bar-fill"
                  style={{ width: `${Math.min(matchScore, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
                <DollarSign size={11} />
              </div>
              <div className="text-xs font-semibold text-foreground">{formatFees(college.annualFees, college.country)}</div>
              <div className="text-[10px] text-muted-foreground">Annual Fees</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
                <Award size={11} />
              </div>
              <div className="text-xs font-semibold text-foreground">#{Number(college.rankingNational)}</div>
              <div className="text-[10px] text-muted-foreground">National</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
                <TrendingUp size={11} />
              </div>
              <div className="text-xs font-semibold text-foreground">#{Number(college.rankingGlobal)}</div>
              <div className="text-[10px] text-muted-foreground">Global</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link to="/college/$id" params={{ id: String(college.id) }} className="flex-1">
              <Button size="sm" variant="outline" className="w-full text-xs font-medium group-hover:border-primary/50">
                View Details <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
            {onAddToCompare && (
              <Button
                size="sm"
                variant={inCompare ? 'default' : 'outline'}
                className={`text-xs font-medium ${inCompare ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => onAddToCompare(college.id)}
              >
                <BarChart2 size={12} className="mr-1" />
                {inCompare ? 'Added' : 'Compare'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
