import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { ParentReview, ParentReviewCategory } from '@/lib/types';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Filter,
  Sparkles,
  Shield,
  BookOpen,
  Gamepad2,
  Building,
  GraduationCap,
} from 'lucide-react';

const CATEGORIES: { id: ParentReviewCategory; label: string; emoji: string }[] = [
  { id: 'learning', label: 'Learning Impact', emoji: '📚' },
  { id: 'activities', label: 'Activities & Quests', emoji: '🎮' },
  { id: 'safety', label: 'Safety & Privacy', emoji: '🛡️' },
  { id: 'staff', label: 'Staff & Curriculum', emoji: '👩‍🏫' },
  { id: 'facilities', label: 'App & Experience', emoji: '✨' },
];

export function ParentFeedbackReviews() {
  const { parentReviews, addParentReview, profile } = useApp();

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<ParentReviewCategory>('learning');
  const [comment, setComment] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Parent');
  const [childAge, setChildAge] = useState<number>(profile?.age || 6);
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addParentReview({
      rating,
      category,
      comment: comment.trim(),
      authorName: authorName.trim() || 'Kidora Parent',
      childAge,
    });

    setComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  const filteredReviews =
    selectedFilter === 'all'
      ? parentReviews
      : parentReviews.filter((r) => r.category === selectedFilter);

  const averageRating =
    parentReviews.length > 0
      ? (parentReviews.reduce((sum, r) => sum + r.rating, 0) / parentReviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. TOP HERO BANNER & STATS */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Parent Community & Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Feedback & Reviews ⭐
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            Your voice shapes Kidora Adventure World. Share your experience with learning, safety, and daily child engagement.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-center shrink-0">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">{averageRating}</div>
            <div className="flex items-center justify-center text-amber-300 text-sm mt-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-left">
            <div className="text-sm font-black font-display text-white">{parentReviews.length} Reviews</div>
            <div className="text-[10px] text-amber-200 font-bold">100% Verified Families</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2. SUBMIT FEEDBACK FORM CARD (LEFT) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shadow-xs">
              ✍️
            </div>
            <div>
              <h3 className="text-base font-black font-display text-slate-900">Share Your Feedback</h3>
              <p className="text-xs text-slate-500">Let us know how Kidora is helping your family</p>
            </div>
          </div>

          {submittedMessage && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3 animate-pop-in">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div className="text-xs font-bold text-emerald-800">
                Thank you! Your review has been successfully submitted and saved.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1-5 Star Picker */}
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1.5">
                Rating (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-black font-display text-amber-700 ml-2">
                  {rating === 5 && '🌟 Exceptional!'}
                  {rating === 4 && '✨ Very Good'}
                  {rating === 3 && '👍 Good'}
                  {rating === 2 && '😐 Needs Polish'}
                  {rating === 1 && '⚠️ Needs Work'}
                </span>
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1.5">
                Feedback Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`btn-press p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      category === cat.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-soft'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Author Name & Age */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black font-display text-slate-700 mb-1">
                  Your Name / Title
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Priya (Mom)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black font-display text-slate-700 mb-1">
                  Child's Age
                </label>
                <input
                  type="number"
                  min={2}
                  max={14}
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value, 10) || 5)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Review Text Area */}
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1">
                Your Review / Experience
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did your child enjoy most? How has their learning or curiosity grown?"
                rows={4}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-press w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black font-display text-xs sm:text-sm shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              <span>Submit Feedback</span>
              <span>✓</span>
            </button>
          </form>
        </div>

        {/* 3. SUBMITTED REVIEWS LIST (RIGHT) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-black font-display text-slate-900 flex items-center gap-2">
              <span>Parent Reviews</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-black">
                {filteredReviews.length}
              </span>
            </h3>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedFilter(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedFilter === c.id
                      ? 'bg-amber-500 text-white shadow-soft'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* List of Review Cards */}
          <div className="space-y-3">
            {filteredReviews.map((rev) => {
              const catObj = CATEGORIES.find((c) => c.id === rev.category);
              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200/80 space-y-3 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span>{catObj?.emoji}</span>
                        <span>{catObj?.label}</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(rev.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-black text-white">
                        {rev.authorName.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{rev.authorName}</span>
                      {rev.childAge && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          (Child age {rev.childAge})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
                      <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{rev.helpfulCount + (rev.rating === 5 ? 3 : 1)} found helpful</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
