import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import StoriesWall from './components/StoriesWall';
import ReviewForm from './components/ReviewForm';
import SalesBanner from './components/SalesBanner';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import { supabase, isSupabaseConfigured, getLocalReviews, saveLocalReview } from './lib/supabase';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  const storiesWallRef = useRef(null);

  // Listen to browser path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Initial Data Fetch (Supabase or Local Genuine Reviews)
  useEffect(() => {
    async function loadReviews() {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('student_reviews')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.warn('Supabase fetch error, using local storage:', error.message);
            setStories(getLocalReviews());
          } else if (data) {
            setStories(data);
          } else {
            setStories(getLocalReviews());
          }
        } else {
          setStories(getLocalReviews());
        }
      } catch (err) {
        console.warn('Error loading stories:', err);
        setStories(getLocalReviews());
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  // 2. Setup Supabase Realtime Listener (Instant Live Updates & Instant Delete across screens)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const channel = supabase
      .channel('realtime_student_reviews')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'student_reviews' },
        (payload) => {
          const newRow = payload.new;
          if (newRow) {
            setStories((prev) => {
              if (prev.some((s) => s.id === newRow.id)) return prev;
              return [newRow, ...prev];
            });
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'student_reviews' },
        (payload) => {
          const oldRow = payload.old;
          if (oldRow && oldRow.id) {
            setStories((prev) => prev.filter((s) => s.id !== oldRow.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 3. Handle Review Submission with Instant Zero-Delay Display
  const handleReviewSubmitted = async (newStory) => {
    // Instant Optimistic UI Update
    setStories((prev) => {
      if (prev.some((s) => s.id === newStory.id)) return prev;
      return [newStory, ...prev];
    });
    setNewlyAddedId(newStory.id);

    // Save to local storage for persistent zero-setup offline fallback
    saveLocalReview(newStory);

    // Insert into Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('student_reviews').insert([
          {
            id: newStory.id,
            full_name: newStory.full_name,
            college_or_role: newStory.college_or_role,
            location: newStory.location,
            program: newStory.program,
            rating: newStory.rating,
            review_text: newStory.review_text,
            github_url: newStory.github_url,
            portfolio_url: newStory.portfolio_url,
            is_verified: true,
          },
        ]);

        if (error) {
          console.error('Supabase insert failed:', error.message);
        }
      } catch (err) {
        console.error('Supabase connection error:', err);
      }
    }

    // Reset filter and search so user immediately sees their story
    setActiveFilter('all');
    setSearchQuery('');

    // Smooth scroll to the stories wall so user sees their new card
    setTimeout(() => {
      if (storiesWallRef.current) {
        storiesWallRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);

    // Clear highlight after 8 seconds
    setTimeout(() => {
      setNewlyAddedId(null);
    }, 8000);
  };

  // 4. Handle Review Deletion (Admin Route only - No approval delay on submissions)
  const handleDeleteReview = async (id) => {
    // Optimistic UI update
    setStories((prev) => prev.filter((s) => s.id !== id));

    // Remove from localStorage
    try {
      const STORAGE_KEY = 'ev_cyber_academy_genuine_reviews_v2';
      const existing = getLocalReviews();
      const updated = existing.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage delete error:', e);
    }

    // Remove from Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('student_reviews')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Supabase delete error:', error.message);
        }
      } catch (err) {
        console.error('Supabase delete exception:', err);
      }
    }
  };

  // 5. Calculate Dynamic Stats & Category Counts
  const { totalStories, averageRating, counts } = useMemo(() => {
    const total = stories.length;
    if (total === 0) {
      return {
        totalStories: 0,
        averageRating: '0.0',
        counts: { all: 0, LFHP: 0, EHF: 0, '2-Day Live Workshop': 0, other: 0 },
      };
    }

    const sumRating = stories.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0);
    const avg = (sumRating / total).toFixed(1);

    const countsMap = {
      all: total,
      LFHP: 0,
      EHF: 0,
      '2-Day Live Workshop': 0,
      other: 0,
    };

    stories.forEach((s) => {
      if (s.program === 'LFHP') countsMap.LFHP++;
      else if (s.program === 'EHF') countsMap.EHF++;
      else if (s.program === '2-Day Live Workshop') countsMap['2-Day Live Workshop']++;
      else countsMap.other++;
    });

    return { totalStories: total, averageRating: avg, counts: countsMap };
  }, [stories]);

  // 6. Filter & Search Logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      let matchesCategory = true;
      if (activeFilter === 'LFHP') matchesCategory = story.program === 'LFHP';
      else if (activeFilter === 'EHF') matchesCategory = story.program === 'EHF';
      else if (activeFilter === '2-Day Live Workshop')
        matchesCategory = story.program === '2-Day Live Workshop';
      else if (activeFilter === 'other')
        matchesCategory = !['LFHP', 'EHF', '2-Day Live Workshop'].includes(story.program);

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = story.full_name?.toLowerCase().includes(query);
        const collegeMatch = story.college_or_role?.toLowerCase().includes(query);
        const locationMatch = story.location?.toLowerCase().includes(query);
        const reviewMatch = story.review_text?.toLowerCase().includes(query);
        const programMatch = story.program?.toLowerCase().includes(query);
        matchesSearch = nameMatch || collegeMatch || locationMatch || reviewMatch || programMatch;
      }

      return matchesCategory && matchesSearch;
    });
  }, [stories, activeFilter, searchQuery]);

  const scrollToForm = () => {
    const el = document.getElementById('review-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = activeFilter !== 'all' || searchQuery.trim().length > 0;

  // ROUTE: /admin -> Render dedicated Admin Page
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return (
      <AdminPage
        stories={stories}
        onDeleteReview={handleDeleteReview}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // ROUTE: / -> 100% Clean Public Student Portal (Zero Admin UI Elements)
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation (100% Clean Public) */}
      <Navbar 
        totalStories={totalStories} 
        onShareClick={scrollToForm} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero Section with Auto-Calculated Stats */}
        <HeroSection
          totalStories={totalStories}
          averageRating={averageRating}
          onShareClick={scrollToForm}
        />

        {/* 3. Filter Bar & Search */}
        <div ref={storiesWallRef}>
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            counts={counts}
          />
        </div>

        {/* 4. Student Real Stories Wall */}
        <StoriesWall
          stories={filteredStories}
          newlyAddedId={newlyAddedId}
          onShareClick={scrollToForm}
          hasActiveFilters={hasActiveFilters}
        />

        {/* 5. "Share Your Experience" Form */}
        <ReviewForm onReviewSubmitted={handleReviewSubmitted} />

        {/* 6. WhatsApp Sales Conversion Banner */}
        <SalesBanner />
      </main>

      {/* 7. Sticky / Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 8. Modern Footer (100% Clean Public) */}
      <Footer onScrollTop={scrollToTop} />
    </div>
  );
}
