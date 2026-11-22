import React from 'react';
import StoryCard from './StoryCard';
import { ShieldAlert, Sparkles } from 'lucide-react';

export default function StoriesWall({ stories, newlyAddedId }) {
  if (stories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Stories Match Your Filter</h3>
          <p className="text-sm text-slate-400 mb-6">
            Try adjusting your search query or selecting a different program category tab.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
            Learner Stories & Reviews ({stories.length})
          </h2>
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing real verified submissions
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
