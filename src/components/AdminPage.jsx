import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Trash2, Search, Star, MapPin, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function AdminPage({ stories, onDeleteReview, onNavigateHome }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem('ev_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin.trim() === 'evcyberacademy!@#') {
      setIsAdmin(true);
      try {
        sessionStorage.setItem('ev_is_admin', 'true');
      } catch {}
      setPin('');
      setPinError('');
    } else {
      setPinError('Incorrect Admin Passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('ev_is_admin');
    } catch {}
  };

  const handleDelete = async (story) => {
    if (window.confirm(`Are you sure you want to delete review from "${story.full_name}" permanently?`)) {
      setDeletingId(story.id);
      await onDeleteReview(story.id);
      setDeletingId(null);
    }
  };

  const filteredStories = stories.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.full_name?.toLowerCase().includes(q) ||
      s.college_or_role?.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q) ||
      s.program?.toLowerCase().includes(q) ||
      s.review_text?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#060609] text-slate-100 flex flex-col font-sans">
      {/* Admin Navbar */}
      <header className="border-b border-slate-800 bg-[#0A0A0F]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portal</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold font-mono tracking-tight text-white">
                EV <span className="text-blue-500">CYBER</span> ACADEMY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-red-950 text-red-400 border border-red-500/30">
                Admin Area (/admin)
              </span>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 hidden sm:inline flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Authenticated
              </span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAdmin ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-16">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-white font-mono">EV Cyber Admin Gate</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your admin security passcode to manage student reviews.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Admin Passcode"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-blue-500 text-white text-center font-mono text-sm outline-none tracking-widest focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  {pinError && (
                    <p className="mt-2 text-xs text-red-400">
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  Unlock Admin Dashboard
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                🔒 Only accessible via /admin URL
              </div>
            </div>
          </div>
        ) : (
          /* Admin Dashboard & Delete Controls */
          <div>
            {/* Top Stat Overview Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Total Stories in Database</div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">{stories.length}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                  LIVE
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Review Submission Mode</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-1">Instant (No Approval Delay)</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Admin Action Enabled</div>
                  <div className="text-base font-bold text-red-400 font-mono mt-1">Direct Review Deletion</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Trash2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Controls Bar: Search & Count */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews by name, college, city, or text..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-950 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div className="text-xs font-mono text-slate-400">
                Displaying <strong>{filteredStories.length}</strong> of {stories.length} reviews
              </div>
            </div>

            {/* Reviews List */}
            {filteredStories.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
                No reviews found matching your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Top Meta info */}
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="font-bold text-base text-white">{story.full_name}</span>
                        <span className="text-xs text-slate-400">• {story.college_or_role}</span>
                        {story.location && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            <MapPin className="w-3 h-3" />
                            {story.location}
                          </span>
                        )}
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/40">
                          {story.program}
                        </span>
                        <div className="flex items-center gap-0.5 text-xs text-amber-400 font-mono font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{story.rating}.0</span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                        "{story.review_text}"
                      </p>

                      {/* Social proof links & Date */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        {story.github_url && (
                          <a
                            href={story.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <GithubIcon className="w-3 h-3" /> GitHub
                          </a>
                        )}
                        {story.portfolio_url && (
                          <a
                            href={story.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Profile
                          </a>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(story.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Delete Action Button */}
                    <button
                      onClick={() => handleDelete(story)}
                      disabled={deletingId === story.id}
                      className="w-full md:w-auto px-4 py-2.5 rounded-xl font-semibold text-xs text-red-300 hover:text-white bg-red-950/80 hover:bg-red-900 border border-red-500/40 hover:border-red-500 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <span>{deletingId === story.id ? 'Deleting...' : 'Delete Review'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
