import React, { useState } from 'react';
import { Star, Send, ShieldCheck, CheckCircle2, AlertCircle, Link, User, School, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function ReviewForm({ onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    fullName: '',
    collegeOrRole: '',
    program: 'LFHP',
    customProgram: '',
    rating: 5,
    reviewText: '',
    githubUrl: '',
    portfolioUrl: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  // Rating labels for helpful feedback
  const ratingLabels = {
    1: '1 Star - Needs Improvement',
    2: '2 Stars - Fair Experience',
    3: '3 Stars - Good Practical Session',
    4: '4 Stars - Very Impressive & Practical',
    5: '5 Stars - Exceptional & Transformative!',
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.collegeOrRole.trim()) {
      errs.collegeOrRole = 'College / Current Role is required (e.g. 3rd Year IT / St. Josephs)';
    }

    if (formData.program === 'Other' && !formData.customProgram.trim()) {
      errs.customProgram = 'Please specify your program name';
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errs.rating = 'Please provide a star rating';
    }

    if (!formData.reviewText.trim()) {
      errs.reviewText = 'Your story / review text is required';
    } else if (formData.reviewText.trim().length < 15) {
      errs.reviewText = 'Please share at least 15 characters describing what you learned or achieved';
    }

    // Optional URL checks
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (formData.githubUrl.trim() && !urlPattern.test(formData.githubUrl.trim())) {
      errs.githubUrl = 'Please enter a valid GitHub URL (e.g. https://github.com/username)';
    }
    if (formData.portfolioUrl.trim() && !urlPattern.test(formData.portfolioUrl.trim())) {
      errs.portfolioUrl = 'Please enter a valid URL (e.g. https://linkedin.com/in/username)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const chosenProgram = formData.program === 'Other' 
      ? formData.customProgram.trim() 
      : formData.program;

    const newStory = {
      id: 'rev-' + Date.now(),
      full_name: formData.fullName.trim(),
      college_or_role: formData.collegeOrRole.trim(),
      program: chosenProgram,
      rating: Number(formData.rating),
      review_text: formData.reviewText.trim(),
      github_url: formData.githubUrl.trim() || null,
      portfolio_url: formData.portfolioUrl.trim() || null,
      is_verified: true,
      created_at: new Date().toISOString(),
    };

    try {
      // Trigger instant optimistic display & database insert via parent handler
      await onReviewSubmitted(newStory);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#10B981', '#06B6D4', '#F59E0B']
        });
      } catch (err) {
        // silent catch if confetti canvas is unavailable
      }

      // Reset form
      setFormData({
        fullName: '',
        collegeOrRole: '',
        program: 'LFHP',
        customProgram: '',
        rating: 5,
        reviewText: '',
        githubUrl: '',
        portfolioUrl: '',
      });
      setErrors({});
      setShowSuccessBadge(true);

      setTimeout(() => {
        setShowSuccessBadge(false);
      }, 6000);

    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="review-form-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      <div className="relative rounded-3xl bg-slate-900/90 border border-blue-500/30 p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)]">
        
        {/* Glow ambient background element */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-mono font-medium mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>COMMUNITY FEEDBACK DESK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Share Your <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Real Story</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Your review inspires future cybersecurity defenders. Once submitted, your review appears <strong>instantly live</strong> on the wall.
          </p>
        </div>

        {/* Success Alert Banner */}
        {showSuccessBadge && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center gap-3 animate-fade-in shadow-lg shadow-emerald-900/40">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="font-bold text-white">Your story is live!</strong> Thank you for sharing your genuine experience with EV Cyber Academy. Check the Stories Wall above!
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Vigneshwaran R"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border ${
                  errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500'
                } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. College / Current Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-blue-400" />
                College / Current Role <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 3rd Year B.Tech IT / St. Joseph's"
                value={formData.collegeOrRole}
                onChange={(e) => setFormData({ ...formData, collegeOrRole: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border ${
                  errors.collegeOrRole ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500'
                } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all`}
              />
              {errors.collegeOrRole && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.collegeOrRole}
                </p>
              )}
            </div>
          </div>

          {/* 3. Program Taken (Dropdown + Custom input if 'Other') */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                Program Taken <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-blue-500 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="LFHP">LFHP (Linux & Forensics Hands-on Program)</option>
                <option value="EHF">EHF (Ethical Hacking Fundamentals)</option>
                <option value="2-Day Live Workshop">2-Day Live Workshop</option>
                <option value="Other">Other (Type Manually)</option>
              </select>
            </div>

            {formData.program === 'Other' ? (
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Specify Program Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bug Bounty Masterclass / SOC Bootcamp"
                  value={formData.customProgram}
                  onChange={(e) => setFormData({ ...formData, customProgram: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border ${
                    errors.customProgram ? 'border-red-500' : 'border-emerald-500/60 focus:border-emerald-400'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all`}
                />
                {errors.customProgram && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customProgram}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 flex flex-col justify-center h-full">
                <span className="font-semibold text-slate-300">Selected Program:</span>
                <span className="text-blue-400 font-mono text-sm mt-0.5">{formData.program}</span>
              </div>
            )}
          </div>

          {/* 4. Interactive Star Rating (1 to 5 Stars) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Star Rating <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || formData.rating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-slate-700 hover:text-slate-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs sm:text-sm font-semibold font-mono text-amber-300">
                {ratingLabels[hoverRating || formData.rating]}
              </span>
            </div>
            {errors.rating && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.rating}
              </p>
            )}
          </div>

          {/* 5. Your Real Story / Review */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Your Real Story / Review <span className="text-red-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {formData.reviewText.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Tell other students what you learned, how the mentors guided you, hands-on lab experience, and how it helped your career or skills..."
              value={formData.reviewText}
              onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border ${
                errors.reviewText ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500'
              } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all leading-relaxed`}
            />
            {errors.reviewText && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.reviewText}
              </p>
            )}
          </div>

          {/* 6 & 7. GitHub and Portfolio / LinkedIn (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                GitHub Profile Link <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://github.com/your-username"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none transition-all"
              />
              {errors.githubUrl && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.githubUrl}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-slate-400" />
                Portfolio / LinkedIn Link <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none transition-all"
              />
              {errors.portfolioUrl && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.portfolioUrl}
                </p>
              )}
            </div>
          </div>

          {/* 8. Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-[0_0_30px_rgba(59,130,246,0.35)] border border-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Posting Real Story to Live Wall...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Post My Story 🚀</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              🔒 No login or delay needed. Your review goes live immediately on the wall.
            </p>
          </div>
        </form>

      </div>
    </section>
  );
}
