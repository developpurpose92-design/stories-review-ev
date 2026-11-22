# 🛡️ EV Cyber Academy: Student Real Stories & Reviews Portal

A mobile-first, high-contrast cybersecurity aesthetic portal designed for **EV Cyber Academy** to showcase genuine student reviews, build trust for new learners, and convert admissions via WhatsApp.

---

## 🚀 Key Features

1. **Clean Cybersecurity SaaS Aesthetic**:
   - Deep Black (`#0A0A0F`), Dark Navy (`#0F172A`), Electric Blue (`#3B82F6`), and Neon Green (`#10B981`).
   - Strict negative rule enforced: No cartoon characters, skulls, or mask clichés. Clean, high-tech EdTech look.

2. **Instant Zero-Delay Live Post**:
   - When a student fills the review form and clicks **"Post My Story"**, the review appears **instantly live** on the wall with zero delay or manual approval block.
   - Includes celebration confetti and auto-scroll to the newly submitted story.

3. **Supabase Real-Time Integration**:
   - Connects to Supabase PostgreSQL table `student_reviews`.
   - Listens to real-time `INSERT` broadcasts so when any student submits, everyone sees it live!
   - Resilient offline & local persistence fallback included.
   - **Zero Fake Reviews**: Starts completely clean; genuine student reviews appear live as they are submitted.

4. **Dynamic Stats Bar**:
   - Auto-calculates total verified stories count.
   - Computes average star rating dynamically from real student feedback.
   - Shows live category badges and counts.

5. **Direct WhatsApp Conversion Funnel**:
   - Pre-configured WhatsApp link to EV Cyber Academy admissions line (`+91 97894 59354`).
   - Floating pulse WhatsApp widget and full bottom conversion banner.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
- **Celebration Effects**: Canvas Confetti
- **Database & Realtime**: Supabase (`@supabase/supabase-js`)
- **Hosting Target**: Vercel

---

## ⚡ 1-Minute Setup & Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🗄️ Supabase 1-Click Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com).
2. Create a new project or select an existing one.
3. Open the **SQL Editor** in Supabase.
4. Copy and paste the entire contents of [`supabase_schema.sql`](./supabase_schema.sql) and click **Run**.
5. Copy your **Project URL** and **anon public key** from `Project Settings` > `API`.
6. Add them to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
7. That's it! All submissions will now persist directly into your live Supabase database with instant real-time broadcast.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import your repository.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will automatically build and publish your high-performance portal!
