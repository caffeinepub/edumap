import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, TrendingDown, TrendingUp } from 'lucide-react';
import type { College } from '../backend';
import { CollegeType, Stream } from '../backend';
import { formatFees } from './CollegeCard';

interface ComparisonTableProps {
  colleges: College[];
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

function formatDeadline(ts: bigint): string {
  if (!ts || ts === 0n) return 'N/A';
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ComparisonTable({ colleges }: ComparisonTableProps) {
  if (colleges.length === 0) return null;

  const minFees = Math.min(...colleges.map(c => Number(c.annualFees)));
  const minNational = Math.min(...colleges.map(c => Number(c.rankingNational)));
  const minGlobal = Math.min(...colleges.map(c => Number(c.rankingGlobal)));
  const minEligibility = Math.min(...colleges.map(c => c.eligibilityCriteria));
  const bestValueIdx = colleges.findIndex(c => Number(c.annualFees) === minFees);

  const rows = [
    {
      label: 'Annual Fees',
      render: (c: College) => formatFees(c.annualFees, c.country),
      compare: (c: College) => {
        const v = Number(c.annualFees);
        if (v === minFees) return 'best';
        if (v > minFees * 1.5) return 'worst';
        return 'neutral';
      },
    },
    {
      label: 'National Ranking',
      render: (c: College) => `#${Number(c.rankingNational)}`,
      compare: (c: College) => {
        const v = Number(c.rankingNational);
        if (v === minNational) return 'best';
        if (v > minNational * 2) return 'worst';
        return 'neutral';
      },
    },
    {
      label: 'Global Ranking',
      render: (c: College) => `#${Number(c.rankingGlobal)}`,
      compare: (c: College) => {
        const v = Number(c.rankingGlobal);
        if (v === minGlobal) return 'best';
        if (v > minGlobal * 2) return 'worst';
        return 'neutral';
      },
    },
    {
      label: 'Min. Eligibility',
      render: (c: College) => `${c.eligibilityCriteria}%`,
      compare: (c: College) => {
        if (c.eligibilityCriteria === minEligibility) return 'best';
        if (c.eligibilityCriteria > minEligibility + 10) return 'worst';
        return 'neutral';
      },
    },
    {
      label: 'Stream',
      render: (c: College) => streamLabel[c.stream],
      compare: () => 'neutral' as const,
    },
    {
      label: 'College Type',
      render: (c: College) => typeLabel[c.collegeType],
      compare: () => 'neutral' as const,
    },
    {
      label: 'Location',
      render: (c: College) => `${c.city}, ${c.country}`,
      compare: () => 'neutral' as const,
    },
    {
      label: 'Courses Offered',
      render: (c: College) => (
        <div className="flex flex-wrap gap-1">
          {c.coursesOffered.slice(0, 3).map(course => (
            <Badge key={course} variant="secondary" className="text-xs">{course}</Badge>
          ))}
          {c.coursesOffered.length > 3 && (
            <Badge variant="outline" className="text-xs">+{c.coursesOffered.length - 3}</Badge>
          )}
        </div>
      ),
      compare: () => 'neutral' as const,
    },
    {
      label: 'Admission Deadline',
      render: (c: College) => formatDeadline(c.applicationDeadline),
      compare: () => 'neutral' as const,
    },
    {
      label: 'Required Documents',
      render: (c: College) => (
        <ul className="text-xs space-y-0.5">
          {c.admissionRequirements.slice(0, 3).map(req => (
            <li key={req} className="flex items-center gap-1">
              <CheckCircle size={10} className="text-success flex-shrink-0" />
              {req}
            </li>
          ))}
          {c.admissionRequirements.length > 3 && (
            <li className="text-muted-foreground">+{c.admissionRequirements.length - 3} more</li>
          )}
        </ul>
      ),
      compare: () => 'neutral' as const,
    },
  ];

  const cellClass = (status: 'best' | 'worst' | 'neutral') => {
    if (status === 'best') return 'bg-success/5 text-success font-semibold';
    if (status === 'worst') return 'bg-destructive/5 text-destructive';
    return '';
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead className="w-36 font-semibold text-foreground sticky left-0 bg-secondary/50 z-10">Parameter</TableHead>
            {colleges.map((c, i) => (
              <TableHead key={String(c.id)} className="min-w-44 font-semibold text-foreground">
                <div className="flex flex-col gap-1">
                  <span className="text-sm leading-tight">{c.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">{c.city}, {c.country}</span>
                  {i === bestValueIdx && (
                    <Badge className="w-fit text-[10px] bg-success/20 text-success border-success/30">
                      🏆 Best Value
                    </Badge>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ label, render, compare }) => (
            <TableRow key={label} className="hover:bg-secondary/20">
              <TableCell className="font-medium text-sm text-muted-foreground sticky left-0 bg-card z-10 border-r border-border">
                {label}
              </TableCell>
              {colleges.map(c => {
                const status = compare(c);
                return (
                  <TableCell key={String(c.id)} className={`text-sm ${cellClass(status)}`}>
                    <div className="flex items-center gap-1.5">
                      {status === 'best' && <TrendingDown size={12} className="text-success flex-shrink-0" />}
                      {status === 'worst' && <TrendingUp size={12} className="text-destructive flex-shrink-0" />}
                      {render(c)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
