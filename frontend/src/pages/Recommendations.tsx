import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetRecommendations } from '@/hooks/useQueries';
import CollegeCard from '@/components/CollegeCard';
import { RefreshCw, User, AlertCircle, Trophy, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Recommendations() {
  const navigate = useNavigate();
  const { data: recommendations, isLoading, error, refetch, isRefetching } = useGetRecommendations();
  const [compareList, setCompareList] = useState<bigint[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'fees' | 'ranking'>('score');

  const handleAddToCompare = (id: bigint) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const sortedRecs = recommendations ? [...recommendations].sort((a, b) => {
    if (sortBy === 'score') return Number(b.matchScore) - Number(a.matchScore);
    if (sortBy === 'fees') return Number(a.college.annualFees) - Number(b.college.annualFees);
    if (sortBy === 'ranking') return Number(a.college.rankingNational) - Number(b.college.rankingNational);
    return 0;
  }) : [];

  const isNoProfile = error?.message?.includes('No profile found');

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Your Recommendations
            </h1>
            <p className="text-muted-foreground">
              {recommendations ? `${recommendations.length} colleges matched to your profile` : 'AI-powered college matches based on your profile'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="font-medium"
            >
              <RefreshCw size={14} className={`mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="font-medium">
                <User size={14} className="mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* No Profile Error */}
        {isNoProfile && (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <User size={36} className="text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">No Profile Found</h2>
            <p className="text-muted-foreground mb-6">
              Please create your student profile first to get personalized college recommendations.
            </p>
            <Link to="/profile">
              <Button size="lg" className="bg-primary text-primary-foreground font-semibold">
                Create Your Profile
              </Button>
            </Link>
          </div>
        )}

        {/* Other Error */}
        {error && !isNoProfile && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle size={16} />
            <AlertDescription>
              Failed to load recommendations. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full" />
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-12 rounded-lg" />
                  <Skeleton className="h-12 rounded-lg" />
                  <Skeleton className="h-12 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && sortedRecs.length > 0 && (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                <span className="font-medium text-foreground">
                  Top {sortedRecs.length} matches found
                </span>
                {compareList.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    · {compareList.length} selected for comparison
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-muted-foreground" />
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                  <SelectTrigger className="w-40 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Sort by Match</SelectItem>
                    <SelectItem value="fees">Sort by Fees</SelectItem>
                    <SelectItem value="ranking">Sort by Ranking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {compareList.length >= 2 && (
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {compareList.length} colleges selected for comparison
                </span>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground font-semibold"
                  onClick={() => navigate({ to: '/compare', search: { ids: compareList.map(String).join(',') } })}
                >
                  Compare Now
                </Button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRecs.map(({ college, matchScore }) => (
                <CollegeCard
                  key={String(college.id)}
                  college={college}
                  matchScore={Number(matchScore)}
                  onAddToCompare={handleAddToCompare}
                  inCompare={compareList.includes(college.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && sortedRecs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <Trophy size={36} className="text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">No Matches Yet</h2>
            <p className="text-muted-foreground mb-6">
              No colleges matched your profile criteria. Try adjusting your preferences.
            </p>
            <Link to="/profile">
              <Button size="lg" className="bg-primary text-primary-foreground font-semibold">
                Update Profile
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
