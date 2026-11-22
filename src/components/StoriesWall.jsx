import React from 'react';
import StoryCard from './StoryCard';
import { ShieldCheck, MessageSquarePlus, PenLine } from 'lucide-react';

export default function StoriesWall({ stories, newlyAddedId, onShareClick, hasActiveFilters }) {
  if (stories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-lg mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-blue-400 shadow-inner">
            <MessageSquarePlus className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold text-white mb-2 font-mono">
            {hasActiveFilters ? 'No Matching Stories Found' : 'Be the First to Share Your Real Story'}
          </h3>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            {hasActiveFilters
              ? 'No student stories matched your current search or program filter. Try selecting "All Stories" or clearing your search query.'
              : 'Real stories from real EV Cyber Academy learners will appear here live. Completed LFHP, EHF, or a live workshop? Share your genuine experience below!'}
          </p>

          <button
            onClick={onShareClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/30 transition-all hover:scale-105 active:scale-95"
          >
            <PenLine className="w-4 h-4" />
            <span>Share Your Real Story</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
            Learner Stories & Reviews ({stories.length})
          </h2>
        </div>
        <span className="text-xs text-emerald-400/90 font-mono hidden sm:inline flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live student submissions
        </span>
      </div>

      {/* Grid Wall of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            isNewlyAdded={newlyAddedId === story.id}
          />
        ))}
      </div>
    </section>
  );
}
