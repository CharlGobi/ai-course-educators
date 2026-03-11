# AI as Your Teaching Superpower

A self-paced course webapp for South African school educators, teaching practical use of AI tools (Gemini and NotebookLM) as a daily teaching assistant.

**8 modules · 31 lessons · Certificate of Completion**

---

## What this is

A Next.js 14 web application delivering a full online course. All content is written in MDX files, progress is tracked in the browser via `localStorage`, and a PDF certificate is generated entirely client-side — no backend or database required.

The course is localised for the South African context: CAPS curriculum, Grade 1–12 terminology, SA cultural examples, POPIA compliance guidance, and load-shedding strategies.

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Run locally

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build for production

```bash
npm run build
npm start
```

Or deploy directly to Vercel (see below).

---

## Project structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── modules/[moduleSlug]/     # Module overview page
│   │   └── [lessonSlug]/         # Lesson page (renders MDX)
│   ├── glossary/                 # Searchable AI glossary
│   ├── prompt-library/           # Filterable SA educator prompts
│   ├── resources/                # Downloadable files
│   └── certificate/              # Certificate generator
├── components/
│   ├── layout/                   # Header, Sidebar, LessonLayout, MobileNav
│   ├── course/                   # ModuleCard, LessonCard, ProgressBar
│   ├── interactive/              # PromptBox, Quiz, Checklist, ReflectionInput
│   └── content/                  # KeyPoint, SAExample, TryItNow
├── content/
│   ├── course-manifest.json      # Single source of truth for all modules/lessons
│   ├── glossary.json             # 25+ AI terms
│   ├── prompt-library.json       # 50+ SA educator prompts
│   └── modules/                  # MDX lesson files (one folder per module)
│       ├── 01-hello-ai/
│       ├── 02-art-of-the-ask/
│       ├── 03-save-your-sundays/
│       ├── 04-bring-lessons-alive/
│       ├── 05-ai-in-your-pocket/
│       ├── 06-trust-but-verify/
│       ├── 07-prompt-toolkit/
│       └── 08-you-did-it/
├── lib/
│   ├── course.ts                 # Manifest parsing, navigation helpers
│   ├── types.ts                  # TypeScript interfaces
│   └── certificate.ts            # PDF generation (html2canvas + jspdf)
└── store/
    └── progressStore.ts          # Zustand progress store (persisted to localStorage)
```

---

## Editing content

All lesson content lives in `src/content/modules/`. Each lesson is an `.mdx` file that can use standard Markdown plus these custom components:

| Component | Usage |
|---|---|
| `<PromptBox />` | Interactive PARTS prompt builder with copy-to-clipboard |
| `<Quiz />` | Multiple-choice quiz with scoring |
| `<Checklist />` | Interactive checklist (state saved in memory) |
| `<ReflectionInput />` | Free-text journal (saved to localStorage) |
| `<TryItNow>` | Callout box for hands-on activities |
| `<KeyPoint type="tip\|warning\|info">` | Highlighted callout |
| `<SAExample>` | South African context example box |

To add a new lesson, add an entry to `src/content/course-manifest.json` and create the corresponding `.mdx` file.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Content | MDX |
| State | Zustand + localStorage |
| Certificate | html2canvas + jspdf |
| Deployment | Vercel |

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Select the repo — Vercel auto-detects Next.js, no config needed
4. Click **Deploy**

The site will be live at `https://<project-name>.vercel.app`.
