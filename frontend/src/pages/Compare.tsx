import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetColleges, useCompareColleges } from '@/hooks/useQueries';
import ComparisonTable from '@/components/ComparisonTable';
import { Search, X, BarChart2, AlertCircle, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Compare() {
  const { data: allColleges, isLoading: loadingColleges } = useGetColleges();
  const [selectedIds, setSelectedIds] = useState<bigint[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: comparedColleges, isLoading: loadingComparison } = useCompareColleges(selectedIds);

  const filteredColleges = useMemo(() => {
    if (!allColleges) return [];
    const q = search.toLowerCase();
    return allColleges.filter(c =>
      !selectedIds.includes(c.id) &&
      (c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [allColleges, search, selectedIds]);

  const selectedColleges = useMemo(() => {
    if (!allColleges) return [];
    return allColleges.filter(c => selectedIds.includes(c.id));
  }, [allColleges, selectedIds]);

  const addCollege = (id: bigint) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds(prev => [...prev, id]);
      setSearch('');
      setShowDropdown(false);
    }
  };

  const removeCollege = (id: bigint) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            College Comparison
          </h1>
          <p className="text-muted-foreground">
            Select 2–4 colleges to compare side-by-side across key parameters.
          </p>
        </div>

        {/* Search & Select */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-primary" />
            <h2 className="font-semibold text-foreground">Select Colleges</h2>
            <Badge variant="outline" className="text-xs ml-auto">
              {selectedIds.length}/4 selected
            </Badge>
          </div>

          {/* Selected Tags */}
          {selectedColleges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedColleges.map(c => (
                <div
                  key={String(c.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                >
                  <span>{c.name}</span>
                  <button
                    onClick={() => removeCollege(c.id)}
                    className="hover:text-destructive transition-colors"
                    aria-label={`Remove ${c.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search Input */}
          {selectedIds.length < 4 && (
            <div className="relative">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search colleges by name, city, or country..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  className="pl-9"
                />
              </div>
              {showDropdown && search && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  {loadingColleges ? (
                    <div className="p-3 text-sm text-muted-foreground">Loading colleges...</div>
                  ) : filteredColleges.length === 0 ? (
                    <div className="p-3 text-sm text-muted-foreground">No colleges found</div>
                  ) : (
                    filteredColleges.map(c => (
                      <button
                        key={String(c.id)}
                        className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors flex items-center justify-between group"
                        onClick={() => addCollege(c.id)}
                      >
                        <div>
                          <div className="font-medium text-sm text-foreground">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.city}, {c.country}</div>
                        </div>
                        <Badge variant="outline" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Add
                        </Badge>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {selectedIds.length < 2 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Info size={14} />
              <span>Select at least 2 colleges to start comparing</span>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selectedIds.length >= 2 && (
          <>
            {loadingComparison ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : comparedColleges && comparedColleges.length >= 2 ? (
              <ComparisonTable colleges={comparedColleges} />
            ) : (
              <Alert>
                <AlertCircle size={16} />
                <AlertDescription>Failed to load comparison data. Please try again.</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {/* Empty State */}
        {selectedIds.length === 0 && !loadingColleges && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <BarChart2 size={36} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">Start Comparing</h3>
            <p className="text-sm max-w-sm mx-auto">
              Search and select colleges above to see a detailed side-by-side comparison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
