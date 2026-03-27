export interface GuidelineDocument {
  name: string;
  required: boolean;
}

export interface GuidelineStep {
  step: number;
  title: string;
  description: string;
}

export interface GuidelineExam {
  name: string;
  fullName: string;
  scoreThreshold: string;
  notes: string;
}

export interface GuidelineTimeline {
  phase: string;
  period: string;
}

export interface Guideline {
  destination: string;
  flag: string;
  overview: string;
  documents: GuidelineDocument[];
  steps: GuidelineStep[];
  exams: GuidelineExam[];
  timeline: GuidelineTimeline[];
}

export const guidelinesData: Guideline[] = [
  {
    destination: 'India',
    flag: '🇮🇳',
    overview:
      'India offers a diverse range of undergraduate and postgraduate programs through central, state, and deemed universities. Admissions are primarily entrance-exam based.',
    documents: [
      { name: 'Class 10 & 12 Mark Sheets', required: true },
      { name: 'Transfer Certificate (TC)', required: true },
      { name: 'Migration Certificate', required: true },
      { name: 'Aadhaar Card / Government ID', required: true },
      { name: 'Passport-size Photographs (6)', required: true },
      { name: 'Caste/Category Certificate (if applicable)', required: false },
      { name: 'Entrance Exam Scorecard (JEE/NEET/CAT)', required: true },
      { name: 'Character Certificate', required: false },
    ],
    steps: [
      {
        step: 1,
        title: 'Appear in Entrance Exams',
        description:
          'Register and appear for relevant entrance exams (JEE Main/Advanced for engineering, NEET for medicine, CAT/MAT for management).',
      },
      {
        step: 2,
        title: 'Check Eligibility & Cutoffs',
        description:
          'Review college-specific cutoffs and eligibility criteria based on your stream and percentage.',
      },
      {
        step: 3,
        title: 'Fill Application Forms',
        description:
          'Apply through centralized portals (JoSAA for IITs/NITs, state counseling portals) or directly on college websites.',
      },
      {
        step: 4,
        title: 'Document Verification',
        description:
          'Submit required documents for verification at the college or through online portals.',
      },
      {
        step: 5,
        title: 'Counseling & Seat Allotment',
        description:
          'Participate in counseling rounds and accept the allotted seat by paying the admission fee.',
      },
      {
        step: 6,
        title: 'Report to College',
        description:
          'Complete physical reporting, hostel allotment, and orientation formalities.',
      },
    ],
    exams: [
      {
        name: 'JEE Main',
        fullName: 'Joint Entrance Examination Main',
        scoreThreshold: '75% in PCM (General category)',
        notes: 'For NITs, IIITs, and other centrally funded institutions',
      },
      {
        name: 'JEE Advanced',
        fullName: 'Joint Entrance Examination Advanced',
        scoreThreshold: 'Top 2.5 lakh JEE Main qualifiers',
        notes: 'For IITs only',
      },
      {
        name: 'NEET-UG',
        fullName: 'National Eligibility cum Entrance Test',
        scoreThreshold: '50th percentile (General category)',
        notes: 'For MBBS, BDS, and allied health sciences',
      },
      {
        name: 'CAT',
        fullName: 'Common Admission Test',
        scoreThreshold: '85+ percentile for top IIMs',
        notes: 'For MBA/PGDM programs at IIMs and top B-schools',
      },
      {
        name: 'CLAT',
        fullName: 'Common Law Admission Test',
        scoreThreshold: '45+ marks out of 120',
        notes: 'For LLB programs at National Law Universities',
      },
    ],
    timeline: [
      { phase: 'Exam Registration', period: 'November – January' },
      { phase: 'Entrance Exams', period: 'January – May' },
      { phase: 'Results & Counseling', period: 'June – July' },
      { phase: 'Admission & Reporting', period: 'July – August' },
    ],
  },
  {
    destination: 'USA',
    flag: '🇺🇸',
    overview:
      'The USA offers world-class education with a holistic admissions process that considers academics, extracurriculars, essays, and recommendations. Applications are submitted through Common App or directly.',
    documents: [
      { name: 'High School Transcripts (Official)', required: true },
      { name: 'SAT / ACT Score Report', required: true },
      { name: 'TOEFL / IELTS Score (for international students)', required: true },
      { name: 'Letters of Recommendation (2–3)', required: true },
      { name: 'Statement of Purpose / Personal Essay', required: true },
      { name: 'Passport Copy', required: true },
      { name: 'Financial Proof / Bank Statement', required: true },
      { name: 'Extracurricular Activity List', required: false },
      { name: 'Portfolio (for arts/design programs)', required: false },
    ],
    steps: [
      {
        step: 1,
        title: 'Research & Shortlist Universities',
        description:
          'Research universities based on rankings, programs, location, and financial aid availability.',
      },
      {
        step: 2,
        title: 'Prepare for Standardized Tests',
        description:
          'Take SAT/ACT for undergraduate, GRE/GMAT for graduate programs, and TOEFL/IELTS for English proficiency.',
      },
      {
        step: 3,
        title: 'Write Application Essays',
        description:
          'Craft compelling personal statements and supplemental essays tailored to each university.',
      },
      {
        step: 4,
        title: 'Request Recommendations',
        description:
          'Ask teachers, counselors, or professors for strong letters of recommendation well in advance.',
      },
      {
        step: 5,
        title: 'Submit Applications',
        description:
          'Apply via Common App, Coalition App, or university-specific portals before deadlines.',
      },
      {
        step: 6,
        title: 'Apply for Financial Aid',
        description:
          'Submit FAFSA (for US citizens) or CSS Profile for need-based aid. International students apply separately.',
      },
      {
        step: 7,
        title: 'Accept Offer & Apply for Visa',
        description:
          'Accept admission offer, pay enrollment deposit, and apply for F-1 student visa.',
      },
    ],
    exams: [
      {
        name: 'SAT',
        fullName: 'Scholastic Assessment Test',
        scoreThreshold: '1400+ for top universities',
        notes: 'For undergraduate admissions; many schools are test-optional',
      },
      {
        name: 'ACT',
        fullName: 'American College Testing',
        scoreThreshold: '30+ for competitive schools',
        notes: 'Alternative to SAT; accepted by all US universities',
      },
      {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        scoreThreshold: '90+ iBT for most universities',
        notes: 'Required for non-native English speakers',
      },
      {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        scoreThreshold: '6.5+ band score',
        notes: 'Alternative to TOEFL; accepted by most US universities',
      },
      {
        name: 'GRE',
        fullName: 'Graduate Record Examination',
        scoreThreshold: '310+ for top grad programs',
        notes: 'For graduate school admissions (MS, PhD)',
      },
      {
        name: 'GMAT',
        fullName: 'Graduate Management Admission Test',
        scoreThreshold: '700+ for top MBA programs',
        notes: 'For MBA and business school admissions',
      },
    ],
    timeline: [
      { phase: 'Research & Test Prep', period: 'Grade 11 (Jan – Aug)' },
      { phase: 'Early Decision/Action Deadline', period: 'November 1–15' },
      { phase: 'Regular Decision Deadline', period: 'January 1–15' },
      { phase: 'Admission Decisions', period: 'March – April' },
      { phase: 'Enrollment Deadline', period: 'May 1' },
      { phase: 'Visa Application', period: 'May – July' },
    ],
  },
  {
    destination: 'UK',
    flag: '🇬🇧',
    overview:
      "UK universities offer 3-year undergraduate degrees and 1-year master's programs. Applications are centralized through UCAS for undergraduate admissions.",
    documents: [
      { name: 'Academic Transcripts / Mark Sheets', required: true },
      { name: 'IELTS / TOEFL Score Certificate', required: true },
      { name: 'Personal Statement (UCAS)', required: true },
      { name: 'Reference Letter (1 academic)', required: true },
      { name: 'Passport Copy', required: true },
      { name: 'Financial Evidence (CAS Sponsorship)', required: true },
      { name: 'CV / Resume (for postgraduate)', required: false },
      { name: 'Research Proposal (for PhD)', required: false },
    ],
    steps: [
      {
        step: 1,
        title: 'Choose Courses & Universities',
        description:
          'Select up to 5 courses/universities on UCAS. Research entry requirements and course content carefully.',
      },
      {
        step: 2,
        title: 'Take English Proficiency Tests',
        description:
          'Achieve required IELTS/TOEFL scores. Most universities require IELTS 6.0–7.0.',
      },
      {
        step: 3,
        title: 'Write Personal Statement',
        description:
          'Write a compelling 4,000-character personal statement explaining your motivation and suitability.',
      },
      {
        step: 4,
        title: 'Submit UCAS Application',
        description:
          'Complete and submit your UCAS application with all required documents before the deadline.',
      },
      {
        step: 5,
        title: 'Receive & Accept Offers',
        description:
          'Receive conditional/unconditional offers. Accept your firm and insurance choices by the deadline.',
      },
      {
        step: 6,
        title: 'Apply for Student Visa',
        description:
          'Once you have a CAS number from your university, apply for a UK Student Visa online.',
      },
    ],
    exams: [
      {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        scoreThreshold: '6.0–7.0 band (varies by university)',
        notes: 'Most widely accepted English test for UK universities',
      },
      {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        scoreThreshold: '90–100 iBT',
        notes: 'Accepted by most UK universities as alternative to IELTS',
      },
      {
        name: 'A-Levels',
        fullName: 'Advanced Level Qualifications',
        scoreThreshold: 'AAA–BBB depending on university',
        notes: 'UK equivalent; Indian students with 12th grade are considered',
      },
      {
        name: 'UCAT',
        fullName: 'University Clinical Aptitude Test',
        scoreThreshold: '2500+ for medicine',
        notes: 'Required for medicine and dentistry programs',
      },
    ],
    timeline: [
      { phase: 'UCAS Opens', period: 'September' },
      { phase: 'Oxford/Cambridge Deadline', period: 'October 15' },
      { phase: 'Main UCAS Deadline', period: 'January 31' },
      { phase: 'Offer Decisions', period: 'March – May' },
      { phase: 'Visa Application', period: 'June – August' },
      { phase: 'Term Starts', period: 'September – October' },
    ],
  },
  {
    destination: 'Canada',
    flag: '🇨🇦',
    overview:
      'Canada is a top destination for international students offering high-quality education, post-study work permits, and pathways to permanent residency.',
    documents: [
      { name: 'Academic Transcripts (Official)', required: true },
      { name: 'IELTS / TOEFL Score Certificate', required: true },
      { name: 'Statement of Purpose (SOP)', required: true },
      { name: 'Letters of Recommendation (2)', required: true },
      { name: 'Passport Copy', required: true },
      { name: 'Financial Proof (Bank Statement)', required: true },
      { name: 'Study Permit Application', required: true },
      { name: 'Medical Examination Certificate', required: false },
      { name: 'Police Clearance Certificate', required: false },
    ],
    steps: [
      {
        step: 1,
        title: 'Research Programs & Universities',
        description:
          'Explore DLI (Designated Learning Institutions) in Canada. Compare programs, tuition, and co-op opportunities.',
      },
      {
        step: 2,
        title: 'Prepare English Proficiency Tests',
        description:
          'Take IELTS or TOEFL. Most universities require IELTS 6.5+ overall.',
      },
      {
        step: 3,
        title: 'Apply to Universities',
        description:
          'Apply directly to universities or through provincial portals (e.g., OUAC for Ontario). Submit SOP and recommendations.',
      },
      {
        step: 4,
        title: 'Receive Letter of Acceptance',
        description:
          'Once accepted, receive a Letter of Acceptance (LOA) from the university.',
      },
      {
        step: 5,
        title: 'Apply for Study Permit',
        description:
          'Apply for a Canadian Study Permit online through IRCC using your LOA and financial documents.',
      },
      {
        step: 6,
        title: 'Arrange Accommodation & Travel',
        description:
          'Book accommodation, purchase health insurance, and plan your travel to Canada.',
      },
    ],
    exams: [
      {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        scoreThreshold: '6.5 overall (no band below 6.0)',
        notes: 'Most widely accepted; required for study permit',
      },
      {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        scoreThreshold: '88–100 iBT',
        notes: 'Accepted by most Canadian universities',
      },
      {
        name: 'GRE',
        fullName: 'Graduate Record Examination',
        scoreThreshold: '305+ for graduate programs',
        notes: 'Required for some graduate programs',
      },
      {
        name: 'GMAT',
        fullName: 'Graduate Management Admission Test',
        scoreThreshold: '650+ for top MBA programs',
        notes: 'For MBA programs at Canadian business schools',
      },
    ],
    timeline: [
      { phase: 'Application Opens', period: 'September – October' },
      { phase: 'Application Deadline', period: 'January – March' },
      { phase: 'Offer Letters', period: 'February – April' },
      { phase: 'Study Permit Application', period: 'March – May' },
      { phase: 'Visa & Travel Prep', period: 'June – August' },
      { phase: 'Semester Starts', period: 'September' },
    ],
  },
  {
    destination: 'Australia',
    flag: '🇦🇺',
    overview:
      'Australia is known for its high-quality universities, multicultural environment, and post-study work opportunities. Applications are made directly to universities.',
    documents: [
      { name: 'Academic Transcripts (Official)', required: true },
      { name: 'IELTS / TOEFL / PTE Score Certificate', required: true },
      { name: 'Statement of Purpose (SOP)', required: true },
      { name: 'Letters of Recommendation (2)', required: true },
      { name: 'Passport Copy', required: true },
      { name: 'Financial Proof (Bank Statement)', required: true },
      { name: 'Overseas Student Health Cover (OSHC)', required: true },
      { name: 'CV / Resume', required: false },
      { name: 'Portfolio (for creative programs)', required: false },
    ],
    steps: [
      {
        step: 1,
        title: 'Research Universities & Courses',
        description:
          'Explore Group of Eight (Go8) universities and other institutions. Check course requirements and tuition fees.',
      },
      {
        step: 2,
        title: 'Take English Proficiency Tests',
        description:
          'Achieve required IELTS/TOEFL/PTE scores. Most universities require IELTS 6.5+.',
      },
      {
        step: 3,
        title: 'Apply Directly to Universities',
        description:
          'Submit applications directly to universities or through agents. Include SOP, transcripts, and recommendations.',
      },
      {
        step: 4,
        title: 'Receive Offer Letter & CoE',
        description:
          'Accept the offer and receive a Confirmation of Enrolment (CoE) from the university.',
      },
      {
        step: 5,
        title: 'Apply for Student Visa (Subclass 500)',
        description:
          'Apply for an Australian Student Visa online using your CoE, financial proof, and health insurance.',
      },
      {
        step: 6,
        title: 'Arrange Pre-Departure Essentials',
        description:
          'Book accommodation, purchase OSHC health cover, and complete pre-departure orientation.',
      },
    ],
    exams: [
      {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        scoreThreshold: '6.5 overall (no band below 6.0)',
        notes: 'Most widely accepted English test for Australian universities',
      },
      {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        scoreThreshold: '79–100 iBT',
        notes: 'Accepted by most Australian universities',
      },
      {
        name: 'PTE Academic',
        fullName: 'Pearson Test of English Academic',
        scoreThreshold: '58+ overall',
        notes: 'Increasingly popular alternative to IELTS in Australia',
      },
      {
        name: 'GRE',
        fullName: 'Graduate Record Examination',
        scoreThreshold: '300+ for graduate programs',
        notes: 'Required for some postgraduate programs',
      },
    ],
    timeline: [
      { phase: 'Application Opens', period: 'March – April (Semester 2) / August – September (Semester 1)' },
      { phase: 'Application Deadline', period: 'May (Sem 2) / November (Sem 1)' },
      { phase: 'Offer & CoE Issued', period: '4–8 weeks after application' },
      { phase: 'Visa Application', period: 'At least 3 months before start' },
      { phase: 'Semester 1 Starts', period: 'February – March' },
      { phase: 'Semester 2 Starts', period: 'July – August' },
    ],
  },
];
