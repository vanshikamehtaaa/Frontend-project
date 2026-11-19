# PropCapital.ai — High-Tech Dark Obsidian Frontend Redesign

> **Frontend Technical Round Assignment Submission**  
> **Candidate:** Vanshika Mehta  
> **Live Site Being Redesigned:** [PropCapital.ai](https://www.propcapital.ai) (NCR's AI Real Estate Platform)  
> **Tech Stack:** Semantic HTML5, Modern CSS3 (Grid/Flexbox/CSS Variables), Vanilla JavaScript (ES6)

---

## 💎 Design System & Aesthetic Overview

This redesign transforms PropCapital.ai into a world-class, futuristic, Silicon Valley-grade real estate tech ecosystem (inspired by Linear, Vercel, and Raycast):

- **Theme Palette:** **Premium Dark Obsidian & Midnight Slate** (`#07090e`, `#0e131d`, `#141b27`) — eliminating muddy greens for a razor-sharp, ultra-modern SaaS feel.
- **Electric Accents:** **Neon Electric Cyan** (`#00f2fe`) for primary CTAs and interactive highlights, paired with **Electric Mint** (`#00e599`) for verified badges.
- **Typography:** Google Fonts `Plus Jakarta Sans` for clean, geometric luxury reading.
- **Glassmorphism & Micro-Interactions:** Subtle translucent borders (`rgba(255, 255, 255, 0.08)`), glowing radial mesh lights, smooth card elevations, and hover transitions.

---

## 🔍 Audit of Original Website (Bugs Fixed)

| # | Existing Site Flaw | Problem Caused | Redesign Solution |
|---|---|---|---|
| 1 | **Muddy, Heavy Green Backgrounds** | Looked cluttered, oppressive, and visually tiring. | Replaced with **Deep Obsidian Black & Charcoal Slate** with plenty of breathing space. |
| 2 | **Overcrowded Desktop Navbar** | 10+ nav items jammed horizontally causing visual collisions on 13-inch displays. | Streamlined into a **Glassmorphic Floating Navbar** with 5 high-intent links + City Selector + 1 clear primary CTA. |
| 3 | **Ambiguous Hero Search Bar** | Only an empty input with generic "Ask PropCapital" text and no quick filter presets. | Added a **Sleek Tabbed Omnibar** (`Buy`, `Rent`, `Commercial`, `AI Smart Match`) with preset BHK/Budget filters and trending tags. |
| 4 | **Low Text Contrast & 10px Fonts** | Extremely small fonts (`text-[10px]`) with low opacity failing WCAG 2.1 AA accessibility. | Standardized base typography to **14px minimum**, using crisp high-contrast white and cyan on dark surfaces. |
| 5 | **Heavy Dark Gradients on Photos** | Dark overlays covered photos, making luxury properties look unappealing. | Designed **Razor-sharp Dark Card Surfaces** (`#0f1622`) with prominent HD image headers, verified badges, and transparent specs. |
| 6 | **No Real-Time Financial Tools** | Users were forced to navigate off the homepage to access calculators. | Embedded an **Interactive Real-Time EMI Calculator** directly on the landing page with instant Rupee formatting. |

---

## 🚀 Key Sections & Features

1. **Sticky Glassmorphic Navbar**: Logo with glowing cyan badge, city selector dropdown (Gurugram / Noida / Faridabad), and instant "List Property Free" CTA.
2. **Hero Section with Omnibar**:
   - High-impact headline: *"The Future of NCR Real Estate. Powered by AI Precision."*
   - Mode switching between Buy, Rent, Commercial, and AI Matchmaker modes.
   - Quick trending search pills with 1-click autofill.
3. **Trust Metrics Strip**: 12,000+ verified homes, ₹0 brokerage, 186+ builders, < 2 hr response time.
4. **Prime NCR Corridors**: Dedicated architectural cards for Gurugram, Noida, and Faridabad.
5. **Featured Properties with Dynamic Filtering**:
   - Filter tabs: `All Properties`, `Gurugram`, `Noida`, `Faridabad`.
   - Real-time card switching without page reloads.
6. **PropCapital AI "Smart Match" Spotlight**:
   - Interactive preview of **IRA (AI Real Estate Advisor)** with a live terminal UI finding a 98.6% match in seconds.
7. **NRI Investment Hub**: Special differentiator addressing the 450+ NRIs served with virtual walkthroughs & FEMA support.
8. **Interactive EMI & Loan Calculator**:
   - Live range sliders for Loan Amount, Interest Rate, and Tenure.
   - Dynamic real-time calculation of Monthly EMI, Total Interest, and Total Payable in Indian Currency format (`₹ 1,30,172`).
9. **Seller Callout Banner**: High-contrast banner offering ₹0 listing fee and 4K photography.
10. **Modern Footer**: RERA registration numbers (`HARERA-PKL-GGM-2023-PC`), legal links, and social channels.
11. **Inquiry / Lead Capture Modal**: Clean dialog for booking free site visits.

---

## 💻 How to Run Locally

1. Open Terminal and navigate to the project directory:
   ```bash
   cd /Users/vanshikamehta/Desktop/Frontend
   ```
2. Start the local HTTP server:
   ```bash
   python3 -m http.server 3000
   ```
3. Open in your browser:
   ```text
   http://localhost:3000
   ```

---

## 🎯 Technical Interview Cheatsheet (Quick Q&A)

### Q1: Why did you choose Vanilla HTML/CSS over a framework like React or Next.js?
> *"For a high-performance landing page, pure semantic HTML5 and modern CSS offer zero bundle overhead, near-instant First Contentful Paint (FCP), and no hydration latency. Moreover, using CSS Custom Properties (Variables), Flexbox, and CSS Grid demonstrates a solid grasp of core web fundamentals without relying on framework abstractions."*

### Q2: How did you implement responsiveness?
> *"I used a Mobile-First and Adaptive CSS strategy. For card grids, I used CSS Grid with responsive columns (`repeat(3, 1fr)` on desktop, `repeat(2, 1fr)` on tablets, and `1fr` on mobile). For navigation, I implemented an accessible slide-down drawer triggered by a CSS/JS hamburger toggle."*

### Q3: How does the EMI calculator work under the hood?
> *"It listens to the `input` event on the range sliders in real time and applies the standard reducing-balance loan formula:  
> $E = \frac{P \times r \times (1+r)^n}{(1+r)^n - 1}$  
> where $r$ is the monthly interest rate and $n$ is the total months. The result is formatted in real time using `toLocaleString('en-IN')` to display authentic Indian numbering (Lakhs and Crores)."*
