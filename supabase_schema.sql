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

-- 4. Policy: Anyone can submit a genuine student review (Instant live without delay)
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
