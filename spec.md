# Anatomy Mastery

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Educational website for NEET and medical entrance exam students covering Human Anatomy
- Home/landing page with navigation and overview
- Body system pages: Skeletal, Muscular, Nervous, Cardiovascular, Respiratory, Digestive, Endocrine, Urinary, Reproductive, Integumentary
- Each system page has: Structure, Function, NEET Points, Common Disorders sections
- Labeled diagram placeholders for each system
- MCQ (Multiple Choice Question) practice section per system
- Blog page with medical/anatomy articles
- Contact page
- Admin content management: ability to add/edit body system content, blog posts, MCQs

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Body systems CRUD (name, description, structure, function, neet_points, disorders), MCQ CRUD (question, options, correct answer, system), Blog posts CRUD (title, content, author, date), Contact form submission storage
2. Frontend: Landing page with hero and system navigation cards, System detail pages with tabbed sections and MCQ section, Blog listing and detail pages, Contact form, Admin panel for content management
3. Authorization: Admin role for content management, public read access
