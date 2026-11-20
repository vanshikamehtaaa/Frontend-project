# PropCapital.ai — React Frontend Application

Frontend Technical Assignment Submission  
Project: PropCapital.ai (NCR AI-Powered Real Estate Platform)  
Architecture: React.js Component-Based Architecture with Vite  
Styling: Custom Vanilla CSS3  

---

## 1. Project Overview

This project represents the upgrade and migration of the PropCapital.ai landing page from a vanilla HTML/CSS/JavaScript structure into a modular, production-ready React.js application.

The migration strictly preserves the visual identity, dark obsidian aesthetic, color palette, typography, responsive layouts, and content of the original website, while establishing clean state management, reusable component abstractions, and complete interactive functionality for every button, modal, drawer, filter, and calculator.

### Core Design Tokens Retained:
- Background Palette: Dark Obsidian (`#07090e`, `#0e131d`, `#141b27`)
- Primary Accent: Electric Cyan (`#00f2fe`) and Cyan Button Gradient (`linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)`)
- Trust Markers: Emerald Green (`#00e599`) for RERA verified tags
- Typography: Plus Jakarta Sans via Google Fonts
- Surface Glassmorphism: `backdrop-filter: blur(18px)` with translucent borders (`rgba(0, 242, 254, 0.2)`)

---

## 2. Technology Stack

- React 18: Declarative component architecture, functional components, hooks (`useState`, `useMemo`, `useEffect`, `useRef`).
- Vite 6: Fast modern frontend build tool and development server.
- JavaScript ES6+: Modern ES modular syntax, array manipulation, and asynchronous operations.
- HTML5: Accessible semantic structure (`header`, `nav`, `main`, `section`, `article`, `footer`, `dialog`).
- Custom CSS3: Vanilla CSS with custom properties (CSS variables), Flexbox, CSS Grid, keyframe animations, and multi-tier responsive media queries.
- Lucide React: Lightweight, tree-shakeable vector icons.
- Decoupled JSON Dataset: Stored in `src/data/data.json` and mirrored in `public/data.json` for offline resilience.

Strict Constraint Adherence:
- No Tailwind CSS
- No Bootstrap
- No Next.js
- No Vue / Angular
- No Heavy UI Component Libraries (Material UI, Ant Design, Chakra UI)

---

## 3. Project Folder Structure

```text
Frontend/
├── dist/                          # Compiled production build output
│   ├── index.html
│   └── assets/
│       ├── index-*.css
│       └── index-*.js
├── public/                        # Static assets served at root
│   └── data.json                  # Decoupled property dataset
├── src/
│   ├── components/                # Reusable React components
│   │   ├── AIEngine.jsx           # IRA intelligence terminal simulation
│   │   ├── AuthModal.jsx          # Client sign-in and consultation dialog
│   │   ├── CTA.jsx                # Seller onboarding and 4K photo banner
│   │   ├── EMICalculator.jsx      # Reactive home loan calculator
│   │   ├── FAQ.jsx                # Accessible accordion with ARIA attributes
│   │   ├── FloatingChatbot.jsx    # Interactive IRA assistant with quick prompts
│   │   ├── Footer.jsx             # Obsidian footer with sitemap & socials
│   │   ├── Hero.jsx               # Headline, Omnibar, and search filters
│   │   ├── HowItWorks.jsx         # 4-step transaction process cards
│   │   ├── Markets.jsx            # Gurugram, Noida, Faridabad market cards
│   │   ├── Navbar.jsx             # Sticky glassmorphic nav with mobile drawer
│   │   ├── NRIDesk.jsx            # NRI FEMA compliance & 4K tour showcase
│   │   ├── Properties.jsx         # Curated listings grid with city pills
│   │   ├── PropertyModal.jsx      # High-fidelity property detail dialog
│   │   ├── Toast.jsx              # Floating status notification system
│   │   └── TrustMetrics.jsx       # 5-column social proof counter strip
│   ├── data/
│   │   └── data.json              # Bundled dataset for fast local rendering
│   ├── styles/
│   │   └── style.css              # Custom design system and media queries
│   ├── App.jsx                    # Root state coordinator and filter engine
│   └── main.jsx                   # React 18 DOM mount entry point
├── vanilla_backup/                # Original HTML/CSS/JS backup archive
├── index.html                     # Root HTML template with Google Fonts
├── package.json                   # Dependency definitions and scripts
├── vite.config.js                 # Vite configuration
└── README.md                      # Project documentation
```

---

## 4. State Architecture and Component Data Flow

The application follows unidirectional data flow managed at the `App.jsx` level:

1. Search and Filter Engine (`App.jsx`):
   - Maintains `filters` state (`location`, `type`, `budget`, `bhk`) and `activeCityFilter`.
   - Uses `useMemo` to compute `filteredProperties` in real time without redundant recalculations.
   - Omnibar inputs, quick trending pills, and city filter pills immediately update filtered listings.

2. Interactive Overlays:
   - `isAuthModalOpen`: Triggers the unified consultation / sign-in dialog.
   - `selectedProperty`: Triggers the high-fidelity property detail dialog.
   - `isChatbotOpen`: Controls the expanded IRA neural assistant widget.
   - `toast`: Manages floating alerts for user feedback.

3. Reactive Calculation (`EMICalculator.jsx`):
   - Computes reducing balance compound interest from Loan Amount, Interest Rate, and Tenure sliders.
   - Dynamically updates monthly EMI, principal amount, total interest payable, and total amount.

---

## 5. Functional Testing Report

Every interactive button, link, form, modal, and drawer was tested in an automated headless Chrome environment via the Chrome DevTools Protocol (CDP):

| Test Item | Expected Result | Status | Notes |
| :--- | :--- | :--- | :--- |
| React Application | Mounts cleanly in `#root` | Pass | React 18 hydration complete with 0 runtime errors |
| Existing Design System | Obsidian and Cyan aesthetic preserved | Pass | Exact colors, glassmorphism, and fonts retained |
| Navigation Links | Smooth scroll to corresponding sections | Pass | All 8 nav links navigate to valid section IDs |
| City Selector Dropdown | Switches active city and filters properties | Pass | Gurugram, Noida, and Faridabad selections functional |
| Mobile Navigation Drawer | Opens and closes smoothly on mobile screens | Pass | Hamburger toggle animated with clean backdrop |
| Omnibar Search & Filter | Filters cards by query, type, budget, and BHK | Pass | "M3M" query isolated relevant listing in real time |
| City Filter Pills | Filters cards by city category | Pass | "Noida" pill filtered 10 properties down to 3 |
| Property Quick View Modal | Opens detail dialog with specifications | Pass | RERA details, amenities chips, and pricing display |
| Property Book Visit Action | Triggers confirmation toast and closes modal | Pass | Confirmed with 2-hour advisor callback notice |
| EMI Calculator Sliders | Reactively recalculates EMI on input | Pass | Adjusted from 1.5 Cr to 2.5 Cr with real-time update |
| FAQ Accordion | Expands clicked item and collapses others | Pass | Correct `aria-expanded` and CSS max-height transitions |
| Form Validation | Enforces 10-digit Indian phone regex | Pass | Invalid phone rejected; valid number accepted |
| Floating AI Chatbot | Opens window, sends messages, replies via AI | Pass | Preset chips and custom input handled by IRA |
| Desktop Responsiveness | No horizontal overflow (1024px, 1280px, 1440px) | Pass | Tested via automated viewport metrics |
| Mobile Responsiveness | No horizontal overflow (375px, 390px, 430px, 768px) | Pass | Tested via automated viewport metrics |
| Browser Console | Zero critical console errors or warnings | Pass | Checked via CDP `Runtime.consoleAPICalled` |
| Production Build | Compiles bundle without errors | Pass | `vite build` completed in under 500ms |

---

## 6. Responsive Viewport Audit

The application was tested across all required viewport widths to guarantee zero horizontal scroll (`scrollWidth === clientWidth`):

| Viewport Width | Client Width | Scroll Width | Horizontal Overflow | Result |
| :--- | :--- | :--- | :--- | :--- |
| 375px | 375px | 375px | None | Pass |
| 390px | 390px | 390px | None | Pass |
| 430px | 430px | 430px | None | Pass |
| 768px | 768px | 768px | None | Pass |
| 1024px | 1024px | 1024px | None | Pass |
| 1280px | 1280px | 1280px | None | Pass |
| 1440px | 1440px | 1440px | None | Pass |

---

## 7. Installation and Local Development

### Prerequisites:
- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)

### Steps to Run Locally:

1. Clone or extract the project directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The production-optimized bundle will be generated in the `dist/` directory.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 8. Deployment Instructions

### Vercel / Netlify:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Node Version: 18.x or 20.x

### Static Hosting:
The generated files in `dist/` can be served directly from any static web server (such as Nginx, Apache, AWS S3 + CloudFront, or GitHub Pages).
