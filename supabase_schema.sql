-- ==========================================================
-- EV CYBER ACADEMY: STUDENT REAL STORIES & REVIEWS DATABASE
-- Idempotent 1-Click Setup (Safe to run multiple times)
-- ==========================================================

-- 1. Create student_reviews table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.student_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    college_or_role TEXT NOT NULL,
    location TEXT,
    program TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    github_url TEXT,
    portfolio_url TEXT,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add location column if table already existed previously
ALTER TABLE public.student_reviews ADD COLUMN IF NOT EXISTS location TEXT;

-- 3. Grant table permissions to anon, authenticated, and service_role
GRANT ALL ON TABLE public.student_reviews TO anon;
GRANT ALL ON TABLE public.student_reviews TO authenticated;
GRANT ALL ON TABLE public.student_reviews TO service_role;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.student_reviews ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to prevent "already exists" errors
DROP POLICY IF EXISTS "Public reviews are viewable by everyone" ON public.student_reviews;
DROP POLICY IF EXISTS "Anyone can submit a genuine student review" ON public.student_reviews;
DROP POLICY IF EXISTS "Allow delete on student_reviews" ON public.student_reviews;

-- 6. Policy: Public reviews are viewable by everyone
CREATE POLICY "Public reviews are viewable by everyone" 
ON public.student_reviews
FOR SELECT 
TO public
USING (true);

-- 7. Policy: Anyone can submit a genuine student review (Instant live without delay)
CREATE POLICY "Anyone can submit a genuine student review" 
ON public.student_reviews 
FOR INSERT 
TO public
WITH CHECK (
    char_length(full_name) > 1 AND
    char_length(review_text) > 10 AND
    rating >= 1 AND rating <= 5
);

-- 8. Policy: Allow delete on student_reviews (Admin Delete Panel)
CREATE POLICY "Allow delete on student_reviews" 
ON public.student_reviews 
FOR DELETE 
TO public 
USING (true);

-- 9. Enable Supabase Realtime safely for INSERT and DELETE
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'student_reviews'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.student_reviews;
  END IF;
END $$;
