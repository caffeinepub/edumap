import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, BookOpen, FileText, Clock, GraduationCap } from 'lucide-react';
import { guidelinesData } from '@/data/guidelinesData';

export default function Guidelines() {
  const [activeTab, setActiveTab] = useState('India');

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Admission Guidelines
          </h1>
          <p className="text-muted-foreground">
            Step-by-step admission guidance for top study destinations worldwide.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab List */}
          <TabsList className="flex flex-wrap h-auto gap-1 bg-secondary/50 p-1 rounded-xl mb-8">
            {guidelinesData.map((g) => (
              <TabsTrigger
                key={g.destination}
                value={g.destination}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-xs data-[state=active]:text-primary"
              >
                <span>{g.flag}</span>
                <span>{g.destination}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {guidelinesData.map((guideline) => (
            <TabsContent key={guideline.destination} value={guideline.destination} className="space-y-6 animate-fade-in">
              {/* Overview */}
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{guideline.flag}</span>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Studying in {guideline.destination}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{guideline.overview}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Required Documents */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">Required Documents</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {guideline.documents.map((doc) => (
                      <li key={doc.name} className="flex items-start gap-2.5">
                        {doc.required ? (
                          <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm text-foreground leading-snug">{doc.name}</span>
                        {!doc.required && (
                          <Badge variant="outline" className="text-[10px] ml-auto flex-shrink-0">Optional</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Clock size={16} className="text-amber-600" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">Key Timeline</h3>
                  </div>
                  <div className="space-y-3">
                    {guideline.timeline.map((item, idx) => (
                      <div key={item.phase} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-primary">{idx + 1}</span>
                          </div>
                          {idx < guideline.timeline.length - 1 && (
                            <div className="w-0.5 h-4 bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-1">
                          <div className="text-sm font-medium text-foreground">{item.phase}</div>
                          <div className="text-xs text-muted-foreground">{item.period}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Steps */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen size={16} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">Application Process</h3>
                </div>
                <div className="space-y-4">
                  {guideline.steps.map((step, idx) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary-foreground">{step.step}</span>
                        </div>
                        {idx < guideline.steps.length - 1 && (
                          <div className="w-0.5 flex-1 bg-border mt-2 mb-0 min-h-4" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Requirements */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <GraduationCap size={16} className="text-amber-600" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">Exam Requirements</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {guideline.exams.map((exam) => (
                    <div
                      key={exam.name}
                      className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-primary text-base">{exam.name}</span>
                        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                          {exam.scoreThreshold}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium mb-1">{exam.fullName}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{exam.notes}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
