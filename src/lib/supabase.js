import { createClient } from '@supabase/supabase-js';

// Read Vite environment variables
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Resilient URL validation to prevent unhandled runtime exceptions
const isValidHttpUrl = (string) => {
  if (!string || typeof string !== 'string' || string.trim() === '') return false;
  try {
    const url = new URL(string.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

const hasValidUrl = isValidHttpUrl(rawSupabaseUrl);
const hasValidKey = Boolean(
  rawSupabaseAnonKey &&
  typeof rawSupabaseAnonKey === 'string' &&
  rawSupabaseAnonKey.trim().length > 10 &&
  !rawSupabaseAnonKey.includes('placeholder') &&
  !rawSupabaseAnonKey.includes('your-anon-key')
);

export const isSupabaseConfigured = Boolean(
  hasValidUrl &&
  hasValidKey &&
  !rawSupabaseUrl.includes('placeholder') &&
  !rawSupabaseUrl.includes('your-project-id')
);

// Safe client creation wrapped in try-catch to prevent blank screen crashes
let clientInstance = null;
if (isSupabaseConfigured) {
  try {
    clientInstance = createClient(rawSupabaseUrl.trim(), rawSupabaseAnonKey.trim(), {
      auth: {
        persistSession: false
      }
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    clientInstance = null;
  }
}

export const supabase = clientInstance;

// Clean storage key for genuine user submissions (version 2 clears any previously cached mock reviews)
const STORAGE_KEY = 'ev_cyber_academy_genuine_reviews_v2';

export const getLocalReviews = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read from localStorage:', err);
  }
  return [];
};

export const saveLocalReview = (newReview) => {
  try {
    const existing = getLocalReviews();
    const updated = [newReview, ...existing.filter((r) => r.id !== newReview.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
    return [newReview];
  }
};
