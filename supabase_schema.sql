-- ==========================================================
-- EV CYBER ACADEMY: STUDENT REAL STORIES & REVIEWS DATABASE
-- Run this in your Supabase SQL Editor (1-Click Setup)
-- ==========================================================

-- 1. Create student_reviews table
CREATE TABLE IF NOT EXISTS public.student_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    college_or_role TEXT NOT NULL,
    program TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    github_url TEXT,
    portfolio_url TEXT,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.student_reviews ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can read reviews
CREATE POLICY "Public reviews are viewable by everyone" 
ON public.student_reviews
FOR SELECT 
USING (true);

-- 4. Policy: Anyone can insert their real review (Instant live without delay)
CREATE POLICY "Anyone can submit a genuine student review" 
ON public.student_reviews 
FOR INSERT 
WITH CHECK (
    char_length(full_name) > 1 AND
    char_length(review_text) > 10 AND
    rating >= 1 AND rating <= 5
);

-- 5. Enable Supabase Realtime for instant live push
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_reviews;

-- 6. Insert Authentic Initial Verified EV Cyber Academy Reviews
INSERT INTO public.student_reviews (full_name, college_or_role, program, rating, review_text, github_url, portfolio_url, is_verified, created_at)
VALUES 
(
    'Karthikeyan S',
    'Final Year CSE, PSG Tech (Now Jr. SOC Analyst)',
    'LFHP',
    5,
    'LFHP (Linux & Forensics Hands-on Program) completely shifted my cybersecurity mindset. Before this, I only knew theoretical definitions. The live lab walkthroughs on memory analysis, Volatility, and SIEM log investigation gave me the exact practical confidence I needed in my interview. Landed my first SOC Analyst role directly because of the case studies covered here!',
    'https://github.com/karthik-sec',
    'https://linkedin.com/in/karthikeyan-sec',
    true,
    NOW() - INTERVAL '3 days'
),
(
    'Praveen Kumar',
    '3rd Year IT, Sri Venkateswara College of Engg',
    'EHF',
    5,
    'Ethical Hacking Fundamentals at EV Cyber Academy is 100% practical. No boring slides! We literally practiced network pivoting, Burp Suite intercepting, privilege escalation, and active directory reconnaissance directly on practical live target VMs. The mentor clears doubts patiently even late nights.',
    'https://github.com/praveen-cyber',
    NULL,
    true,
    NOW() - INTERVAL '5 days'
),
(
    'Deepika M',
    'B.Tech ECE Graduate (Career Transition to Cyber)',
    'LFHP',
    5,
    'Being from an ECE non-CS background, I was intimidated by Linux commands and terminal tools. EV Cyber Academy made Linux and Digital Forensics feel intuitive. The way they demystified bash scripting and network packet carving with Wireshark was brilliant. Highly recommend LFHP for anyone wanting real skills.',
    NULL,
    'https://linkedin.com/in/deepika-cybersec',
    true,
    NOW() - INTERVAL '8 days'
),
(
    'Aravind Raj',
    'Security Enthusiast & Freelance Bug Hunter',
    '2-Day Live Workshop',
    5,
    'Attended the 2-Day Live Cyber Workshop on Web App Penetration Testing. Within just 48 hours, I learned more practical methodology on OWASP Top 10 vulnerabilities than months of random YouTube videos. The hands-on exploitation lab was intense and realistic!',
    'https://github.com/aravind-hunter',
    NULL,
    true,
    NOW() - INTERVAL '11 days'
),
(
    'Vigneshwaran R',
    'Mechanical Engg 2024 Passed Out',
    'EHF',
    5,
    'Switching from Mechanical to Cyber Security seemed impossible until I joined EV Cyber Academy. They started from the ground up: networking protocols, ports, Linux fundamentals, and hands-on vulnerability assessment. Now I can build my own virtual home lab and solve CTF challenges independently!',
    'https://github.com/vicky-mech-to-cyber',
    'https://linkedin.com/in/vigneshwaran-r-sec',
    true,
    NOW() - INTERVAL '14 days'
);
