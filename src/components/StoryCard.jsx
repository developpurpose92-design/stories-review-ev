import React, { useState } from 'react';
import { Star, ShieldCheck, ExternalLink, Calendar, MapPin, Trash2 } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function StoryCard({ story, isNewlyAdded, isAdmin, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Formatting date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Recent';
      const diffMs = Date.now() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  // Program badge colors
  const getProgramBadge = (program) => {
    switch (program) {
      case 'LFHP':
        return 'bg-blue-950/90 text-blue-300 border-blue-500/40';
      case 'EHF':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40';
      case '2-Day Live Workshop':
        return 'bg-purple-950/90 text-purple-300 border-purple-500/40';
      default:
        return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40';
    }
  };

  // Student Initials
  const getInitials = (name) => {
    if (!name) return 'EV';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Delete review from "${story.full_name}" permanently?`)) {
      setIsDeleting(true);
      await onDelete(story.id);
      setIsDeleting(false);
    }
  };

  const isLongText = story.review_text && story.review_text.length > 240;
  const displayText = isLongText && !isExpanded
    ? `${story.review_text.substring(0, 240)}...`
    : story.review_text;

  return (
    <div
      className={`relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border transition-all duration-300 backdrop-blur-md ${
        isNewlyAdded
          ? 'border-emerald-400 ring-2 ring-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse-slow'
          : 'border-slate-800 hover:border-blue-500/50 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)]'
      }`}
    >
      {/* Top Bar: Program Badge & Verified Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider border ${getProgramBadge(
                story.program
              )}`}
              title={story.program === 'LFHP' ? 'LFHP - Learn the Fundamentals of Hacking Program' : story.program}
            >
              {story.program}
            </span>

            {isNewlyAdded && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                New
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Verified EV Learner Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px] font-semibold whitespace-nowrap">✓ Verified EV Learner</span>
            </div>

            {/* Admin Delete Action Button */}
            {isAdmin && (
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                title="Admin Delete"
                className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold uppercase hidden sm:inline">Delete</span>
              </button>
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < story.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-700'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-mono font-bold text-amber-300">
            {story.rating}.0
          </span>
        </div>

        {/* Review / Story Text */}
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line font-normal">
          "{displayText}"
        </p>

        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 mb-4 inline-block underline underline-offset-4 cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'Read full story →'}
          </button>
        )}
      </div>

      {/* Footer: Student Profile & Social Proof Links */}
      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
        {/* Student Identity & Location */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-mono font-bold text-blue-300">
              {getInitials(story.full_name)}
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">
              {story.full_name}
            </h4>
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span className="truncate">{story.college_or_role}</span>
              {story.location && (
                <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {story.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Social Proof Links (Optional GitHub / Portfolio) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {story.github_url && (
            <a
              href={story.github_url.startsWith('http') ? story.github_url : `https://${story.github_url}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View Student GitHub"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {story.portfolio_url && (
            <a
              href={story.portfolio_url.startsWith('http') ? story.portfolio_url : `https://${story.portfolio_url}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View Portfolio / Profile"
              className="p-2 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 hover:text-white border border-blue-700/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <div className="hidden sm:flex items-center text-[10px] text-slate-500 font-mono ml-1">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(story.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}
