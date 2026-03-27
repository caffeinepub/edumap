# Specification

## Summary
**Goal:** Build EduMap Navigator — an AI/ML-powered global college admission navigator website with student profiling, personalized recommendations, college comparison, interactive map, admission guidelines, and an AI chatbot.

**Planned changes:**

### Visual Theme
- Deep teal primary + amber accent color palette, modern sans-serif typography, card-based layouts, gradient hero sections applied consistently across all pages

### Navigation
- Responsive top nav bar with EduMap logo, links to Home, Profile, Recommendations, Compare, Map, Guidelines; mobile hamburger menu; active route highlighting

### Landing Page
- Hero section with headline "EduMap: AI-ML Powered Global Admission Navigator" and CTA button
- Six feature highlight cards (Profile, Recommendations, Comparison, Maps, Guidelines, Chatbot)
- "How It Works" section with 3 steps: Enter Profile → Get Recommendations → Compare & Decide

### Student Profile Page
- Form with fields: stream (Science/Commerce/Arts), percentage/marks, budget range (INR/USD slider), areas of interest (multi-select), preferred region (India/USA/UK/Canada/Australia/Other), college type (Government/Private/Deemed)
- Form validation, backend save, confirmation message, profile pre-fill on revisit

### Backend Data Model & Seed Data
- College record type with: name, country, city, stream, courses, annual fees, national/global ranking, eligibility criteria, admission requirements, application deadline, college type, coordinates
- Functions to add, retrieve, and query/filter colleges (by stream, country, fee range, ranking)
- At least 20 seed college entries covering India, USA, UK, Canada, Australia

### Recommendations Page
- Backend content-based scoring algorithm weighing stream match, budget fit, marks eligibility, region preference
- Ranked college result cards showing: name, location, fees, ranking, percentage match score
- Re-run on profile edit; redirect to Profile if no profile exists

### College Comparison Page
- Searchable multi-select to pick 2–4 colleges
- Side-by-side comparison table: fees, national/global ranking, eligibility, courses, type, location, deadlines
- Visual indicators (green/red) for numeric fields; "Best Value" badge on lowest-fee eligible college
- Horizontally scrollable on mobile

### College Map Page
- Interactive world map (Leaflet.js + OpenStreetMap) with college location markers from backend data
- Marker popups showing name, location, fees, ranking
- Filter panel by country and stream; centered on India by default

### Admission Guidelines Page
- Tabbed or accordion layout for 5 destinations: India, USA, UK, Canada, Australia
- Each section: required documents checklist, numbered application steps, exam requirements with score thresholds, general timeline

### College Detail Page
- Route `/college/:id` showing all college fields in structured sections
- Mini map pin for geographic location
- "Add to Comparison" button; breadcrumb navigation

### AI Chatbot Widget
- Floating chat button (bottom-right) on all pages; opens/closes chat window
- Backend keyword/intent matching against college knowledge base
- Handles 6 intents: fees, eligibility, documents, deadlines, courses, rankings
- Fallback message for unrecognized queries; session chat history

**User-visible outcome:** Students can enter their academic profile, receive personalized ranked college recommendations, compare colleges side-by-side, explore college locations on an interactive map, read structured admission guidelines by country, view full college details, and ask questions via an AI chatbot — all in a cohesive academic-tech interface.
