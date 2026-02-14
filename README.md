# 🚀 RepurposeAI

### Intelligent Content Repurposing Engine

RepurposeAI is a production-ready AI tool that extracts blog content from any URL and instantly generates platform-optimized assets for:

* LinkedIn
* X (Twitter)
* SEO Meta Description
* YouTube Title & Description

Built using **Next.js 16 (App Router)** and **Google Gemini 2.5 Flash**, the app includes regeneration, editing, export, history tracking, and production deployment on Vercel.

---

## 🌐 Live Demo

👉 [https://repurposeai.vercel.app](https://repurposeai.vercel.app)
👉 GitHub Repository: [https://github.com/Shashank-Tomar-2004/repurpose-ai](https://github.com/Shashank-Tomar-2004/repurpose-ai)

---

# ✨ Features

### 🔄 Content Extraction

* Fetches blog content from any public URL
* Cleans HTML and extracts readable text
* Optimized for serverless deployment (no heavy DOM dependencies)

### 🤖 AI Content Generation

* Powered by Gemini 2.5 Flash
* Platform-specific formatting
* Adjustable:

  * Tone
  * Depth
  * CTA style
  * Hashtag toggle

### ♻ Regeneration Engine

* Re-generates variations without re-extracting content
* Fast UX improvement

### ✏ Editable Output

* Fully editable content cards
* Character counters
* SEO truncation warnings
* Real-time editing

### 📋 Copy Feedback System

* Copy button turns green
* “Copied” state shown for 2 seconds
* Clean UX feedback

### 📦 Export Options

* Copy All
* Download as .txt
* Per-section copy

### 🗂 History System

* Compact dropdown in navbar
* Click to reload previous generation
* Remove individual entries
* Stored in localStorage

### 🎨 UI/UX

* Wide SaaS layout
* Sticky controls
* Animated dropdown
* Clean spacing rhythm
* Responsive design
* Production-ready polish

---

# 🏗 Tech Stack

* Next.js 16 (App Router)
* TypeScript
* TailwindCSS
* Google Gemini 2.5 Flash API
* Vercel (Production Hosting)
* Lucide Icons

---

# 🧠 Architecture

```
src/
 ├─ app/
 │   ├─ page.tsx
 │   ├─ api/
 │   │   ├─ extract/route.ts
 │   │   └─ generate/route.ts
 ├─ components/
 │   ├─ Navbar.tsx
 │   ├─ LeftPanel.tsx
 │   ├─ EditableCard.tsx
 │   ├─ Tabs.tsx
 │   └─ EmptyState.tsx
```

* `extract` → Fetch + clean blog content
* `generate` → Calls Gemini API and safely parses structured JSON
* Frontend handles:

  * Editing
  * History
  * Regeneration
  * Export

---

# ⚙ Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

On Vercel:

Add `GEMINI_API_KEY` in:
Project → Settings → Environment Variables

---

# 🚀 Local Setup

```bash
git clone https://github.com/Shashank-Tomar-2004/repurpose-ai.git
cd repurpose-ai
npm install
npm run dev
```

Production build:

```bash
npm run build
```

---

# 🛠 Deployment

Hosted on **Vercel**

* Node runtime enabled for API routes
* Serverless compatible extraction logic
* Optimized for production

---

# 🧩 Improvements Implemented Beyond Basic Requirements

* Safe JSON parsing from AI responses
* Graceful error handling
* Strict production-safe API routes
* Dropdown history with removal
* ESC + click-outside closing
* Character limit warnings
* UX state transitions
* Reduced dependency footprint (removed jsdom for stability)

---

# 🎯 Why This Is Production-Ready

* No runtime crashes
* Works locally and in serverless production
* Clean architecture separation
* Optimized API handling
* Strong UX feedback mechanisms
* Stable AI JSON parsing

---

# 📌 Future Enhancements

* Authentication layer
* Database-backed history
* Multi-user workspace
* Custom domain & branding
* Advanced content templates
* Analytics integration

---

# 👤 Author

Shashank Tomar
AI-Driven Product Builder

---
