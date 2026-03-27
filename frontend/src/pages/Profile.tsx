import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useAddStudentProfile } from '@/hooks/useQueries';
import { Stream, Interest, PreferredRegion, CollegeType } from '../backend';
import { CheckCircle, User, BookOpen, DollarSign, Globe, Building, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const interestOptions: { value: Interest; label: string }[] = [
  { value: Interest.engineering, label: 'Engineering' },
  { value: Interest.medicine, label: 'Medicine' },
  { value: Interest.management, label: 'Management' },
  { value: Interest.law, label: 'Law' },
  { value: Interest.arts, label: 'Arts' },
];

const PROFILE_STORAGE_KEY = 'edumap_student_profile';

interface ProfileFormData {
  stream: Stream | '';
  percentage: string;
  budgetMin: string;
  budgetMax: string;
  interests: Interest[];
  preferredRegion: PreferredRegion | '';
  preferredCollegeType: CollegeType | '';
  currency: 'INR' | 'USD';
}

const defaultForm: ProfileFormData = {
  stream: '',
  percentage: '',
  budgetMin: '',
  budgetMax: '',
  interests: [],
  preferredRegion: '',
  preferredCollegeType: '',
  currency: 'INR',
};

export default function Profile() {
  const navigate = useNavigate();
  const addProfile = useAddStudentProfile();
  const [form, setForm] = useState<ProfileFormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  const [saved, setSaved] = useState(false);

  // Load saved profile from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setForm(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
    if (!form.stream) newErrors.stream = 'Please select your stream';
    const pct = parseFloat(form.percentage);
    if (!form.percentage || isNaN(pct) || pct < 0 || pct > 100) {
      newErrors.percentage = 'Enter a valid percentage (0–100)';
    }
    const bMin = parseFloat(form.budgetMin);
    const bMax = parseFloat(form.budgetMax);
    if (!form.budgetMin || isNaN(bMin) || bMin < 0) newErrors.budgetMin = 'Enter a valid minimum budget';
    if (!form.budgetMax || isNaN(bMax) || bMax < 0) newErrors.budgetMax = 'Enter a valid maximum budget';
    if (!isNaN(bMin) && !isNaN(bMax) && bMax < bMin) newErrors.budgetMax = 'Max budget must be ≥ min budget';
    if (form.interests.length === 0) newErrors.interests = 'Select at least one interest';
    if (!form.preferredRegion) newErrors.preferredRegion = 'Please select a preferred region';
    if (!form.preferredCollegeType) newErrors.preferredCollegeType = 'Please select a college type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleInterest = (interest: Interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
    setErrors(prev => ({ ...prev, interests: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const multiplier = form.currency === 'USD' ? 83 : 1;
    const profile = {
      stream: form.stream as Stream,
      percentage: parseFloat(form.percentage),
      budgetMin: BigInt(Math.round(parseFloat(form.budgetMin) * multiplier)),
      budgetMax: BigInt(Math.round(parseFloat(form.budgetMax) * multiplier)),
      interests: form.interests,
      preferredRegion: form.preferredRegion as PreferredRegion,
      preferredCollegeType: form.preferredCollegeType as CollegeType,
    };

    try {
      await addProfile.mutateAsync(profile);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(form));
      setSaved(true);
      toast.success('Profile saved successfully!', {
        description: 'Your profile has been saved. Redirecting to recommendations...',
      });
      setTimeout(() => navigate({ to: '/recommendations' }), 1500);
    } catch (err) {
      toast.error('Failed to save profile', {
        description: 'Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Student Profile</h1>
          <p className="text-muted-foreground">
            Tell us about yourself so we can find the best college matches for you.
          </p>
        </div>

        {saved && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30 text-success">
            <CheckCircle size={20} />
            <span className="font-medium">Profile saved! Redirecting to recommendations...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Academic Details */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={16} className="text-primary" />
                </div>
                Academic Details
              </CardTitle>
              <CardDescription>Your current academic standing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stream">Stream <span className="text-destructive">*</span></Label>
                  <Select
                    value={form.stream}
                    onValueChange={(v) => { setForm(p => ({ ...p, stream: v as Stream })); setErrors(p => ({ ...p, stream: undefined })); }}
                  >
                    <SelectTrigger id="stream" className={errors.stream ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Stream.science}>Science</SelectItem>
                      <SelectItem value={Stream.commerce}>Commerce</SelectItem>
                      <SelectItem value={Stream.arts}>Arts</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.stream && <p className="text-xs text-destructive">{errors.stream}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage / Score <span className="text-destructive">*</span></Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g. 85.5"
                    value={form.percentage}
                    onChange={(e) => { setForm(p => ({ ...p, percentage: e.target.value })); setErrors(p => ({ ...p, percentage: undefined })); }}
                    className={errors.percentage ? 'border-destructive' : ''}
                  />
                  {errors.percentage && <p className="text-xs text-destructive">{errors.percentage}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <DollarSign size={16} className="text-amber-600" />
                </div>
                Budget Range
              </CardTitle>
              <CardDescription>Annual fee budget for college</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, currency: 'INR' }))}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${form.currency === 'INR' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, currency: 'USD' }))}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${form.currency === 'USD' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  $ USD
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Minimum Budget ({form.currency}) <span className="text-destructive">*</span></Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    min="0"
                    placeholder={form.currency === 'INR' ? 'e.g. 50000' : 'e.g. 5000'}
                    value={form.budgetMin}
                    onChange={(e) => { setForm(p => ({ ...p, budgetMin: e.target.value })); setErrors(p => ({ ...p, budgetMin: undefined })); }}
                    className={errors.budgetMin ? 'border-destructive' : ''}
                  />
                  {errors.budgetMin && <p className="text-xs text-destructive">{errors.budgetMin}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Maximum Budget ({form.currency}) <span className="text-destructive">*</span></Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    min="0"
                    placeholder={form.currency === 'INR' ? 'e.g. 500000' : 'e.g. 50000'}
                    value={form.budgetMax}
                    onChange={(e) => { setForm(p => ({ ...p, budgetMax: e.target.value })); setErrors(p => ({ ...p, budgetMax: undefined })); }}
                    className={errors.budgetMax ? 'border-destructive' : ''}
                  />
                  {errors.budgetMax && <p className="text-xs text-destructive">{errors.budgetMax}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                Areas of Interest
              </CardTitle>
              <CardDescription>Select all that apply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {interestOptions.map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                      form.interests.includes(value)
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    <Checkbox
                      checked={form.interests.includes(value)}
                      onCheckedChange={() => toggleInterest(value)}
                      className="hidden"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {errors.interests && <p className="text-xs text-destructive mt-2">{errors.interests}</p>}
              {form.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.interests.map(i => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {interestOptions.find(o => o.value === i)?.label}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Globe size={16} className="text-amber-600" />
                </div>
                Preferences
              </CardTitle>
              <CardDescription>Your location and institution preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Preferred Region <span className="text-destructive">*</span></Label>
                  <Select
                    value={form.preferredRegion}
                    onValueChange={(v) => { setForm(p => ({ ...p, preferredRegion: v as PreferredRegion })); setErrors(p => ({ ...p, preferredRegion: undefined })); }}
                  >
                    <SelectTrigger id="region" className={errors.preferredRegion ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PreferredRegion.india}>India</SelectItem>
                      <SelectItem value={PreferredRegion.usa}>USA</SelectItem>
                      <SelectItem value={PreferredRegion.uk}>UK</SelectItem>
                      <SelectItem value={PreferredRegion.canada}>Canada</SelectItem>
                      <SelectItem value={PreferredRegion.australia}>Australia</SelectItem>
                      <SelectItem value={PreferredRegion.other}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.preferredRegion && <p className="text-xs text-destructive">{errors.preferredRegion}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeType">College Type <span className="text-destructive">*</span></Label>
                  <Select
                    value={form.preferredCollegeType}
                    onValueChange={(v) => { setForm(p => ({ ...p, preferredCollegeType: v as CollegeType })); setErrors(p => ({ ...p, preferredCollegeType: undefined })); }}
                  >
                    <SelectTrigger id="collegeType" className={errors.preferredCollegeType ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CollegeType.government}>Government</SelectItem>
                      <SelectItem value={CollegeType.private_}>Private</SelectItem>
                      <SelectItem value={CollegeType.deemed}>Deemed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.preferredCollegeType && <p className="text-xs text-destructive">{errors.preferredCollegeType}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            disabled={addProfile.isPending || saved}
          >
            {addProfile.isPending ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Saving Profile...
              </>
            ) : saved ? (
              <>
                <CheckCircle size={18} className="mr-2" />
                Profile Saved!
              </>
            ) : (
              'Save Profile & Get Recommendations'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
