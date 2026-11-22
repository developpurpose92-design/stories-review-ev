import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Trash2, X, AlertTriangle, Search, Star, MapPin } from 'lucide-react';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  isAdmin, 
  onLogin, 
  onLogout, 
  stories, 
  onDeleteReview 
}) {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default admin passcode: evcyberadmin
    if (pin.trim() === 'evcyberadmin' || pin.trim() === 'admin123') {
      onLogin();
      setPin('');
      setPinError('');
    } else {
      setPinError('Incorrect Admin Passcode. Try: evcyberadmin');
    }
  };

  const filteredStories = stories.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.full_name?.toLowerCase().includes(q) ||
      s.college_or_role?.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q) ||
      s.review_text?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-blue-500/40 p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isAdmin 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' 
                : 'bg-red-950/80 border-red-500/50 text-red-400'
            }`}>
              {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                EV Cyber Academy Admin Panel
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                {isAdmin 
                  ? 'Manage genuine reviews. Direct delete enabled (No approval delays on submissions).'
                  : 'Enter security passcode to manage/delete reviews.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-6">
          {!isAdmin ? (
            /* PIN Login Form */
            <form onSubmit={handlePinSubmit} className="max-w-md mx-auto space-y-4 py-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Enter Admin Passcode</h4>
              <p className="text-xs text-slate-400">
                Use your EV Cyber Academy admin credentials to delete spam or invalid reviews.
              </p>

              <div>
                <input
                  type="password"
                  placeholder="Enter Passcode (default: evcyberadmin)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-blue-500 text-white text-center font-mono text-base outline-none tracking-widest"
                  autoFocus
                />
                {pinError && (
                  <p className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Authenticate as Admin
              </button>
            </form>
          ) : (
            /* Admin Review Management View */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter stories to manage..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Total Reviews: <strong className="text-white">{stories.length}</strong>
                </div>
              </div>

              {filteredStories.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No reviews match your query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredStories.map((story) => (
                    <div
                      key={story.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <strong className="text-sm text-white">{story.full_name}</strong>
                          <span className="text-xs text-slate-400">• {story.college_or_role}</span>
                          {story.location && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              <MapPin className="w-2.5 h-2.5" />
                              {story.location}
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                            {story.program}
                          </span>
                          <span className="text-xs text-amber-400 font-mono flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {story.rating}.0
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          "{story.review_text}"
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Permanently delete review by "${story.full_name}"?`)) {
                            onDeleteReview(story.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {isAdmin && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-mono">
              ✓ Admin session authorized
            </span>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Exit Admin Mode
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
