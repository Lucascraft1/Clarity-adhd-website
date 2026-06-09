# Clarity ADHD — Patient-Facing Website

## Quick Start Options

---

### Option A — StackBlitz (Easiest, instant preview)

1. Go to **stackblitz.com/fork/vite-react**
2. In the file panel on the left, delete the existing `src/App.jsx`
3. Upload or paste the contents of `src/App.jsx` from this project
4. The site will live-preview instantly in the right panel
5. Click the "Open in new tab" button for full-browser view

---

### Option B — CodeSandbox

1. Go to **codesandbox.io/s/new** and select "Vite + React"
2. Replace `src/App.jsx` with the contents of this project's `src/App.jsx`
3. Replace `src/index.css` with this project's `src/index.css`
4. Click the preview panel — full navigation works

---

### Option C — Deploy to Vercel (Live public URL)

1. Install Node.js from nodejs.org if you haven't already
2. Open Terminal and run:
   ```
   cd clarity-site-project
   npm install
   npm run dev
   ```
3. Opens at http://localhost:5173 — full browser, everything works
4. To deploy live: `npm run build` then drag the `dist` folder to vercel.com/new

---

### Option D — GitHub + Vercel (Recommended for live site)

1. Create a free account at github.com and vercel.com
2. Upload this entire folder to a new GitHub repository
3. In Vercel: "Add New Project" → import your GitHub repo
4. Vercel auto-detects Vite and deploys in ~60 seconds
5. You get a free URL like `clarity-adhd.vercel.app`
6. Connect your custom domain `clarityadhdwa.com` in Vercel settings

---

## Project Structure

```
clarity-site-project/
├── index.html          ← Entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
└── src/
    ├── main.jsx        ← React entry
    ├── index.css       ← Global reset
    └── App.jsx         ← Full site (all pages)
```

## Pages Included

- **Home** — Hero, Process, Why Clarity, Pricing, About, Comparison, Booking, FAQ, Footer
- **Resources** — Blog articles on adult ADHD, medications, WA telehealth
- **Patient Guides** — Medication education guides
- **Referral Directory** — Private, accessed by clicking copyright text 5 times

## Secret Referral Directory

Click the copyright text at the bottom of the homepage **5 times** to open the private referral directory. Not linked anywhere patient-facing.

## Contact Info

- Email: lucas@clarityadhdwa.com
- Phone: (360) 453-7663
- Website: clarityadhdwa.com

Lucas Craft, MMS, PA-C — Clarity ADHD, PLLC
