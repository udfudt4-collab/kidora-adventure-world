import { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useApp } from '@/lib/store';
import { registerModalBackHandler } from '@/lib/navigation';
import { IDEA_CATEGORIES, IDEA_STATUS_CONFIG } from '@/lib/ideas';
import type { Screen, IdeaCategory, IdeaStatus, CommunityIdea } from '@/lib/types';
import {
  Lightbulb,
  Sparkles,
  ThumbsUp,
  MessageSquare,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Send,
  User,
  Heart,
  TrendingUp,
  X,
  Compass,
  ArrowUp,
  Flame,
  Award,
} from 'lucide-react';

interface IdeaHubProps {
  onNavigate: (screen: Screen) => void;
}

type SortOption = 'votes' | 'newest' | 'official';

export function IdeaHub({ onNavigate }: IdeaHubProps) {
  const { communityIdeas, submitCommunityIdea, toggleVoteIdea, addIdeaComment } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('votes');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active Threads
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [openCommentsIdeaId, setOpenCommentsIdeaId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentAuthor, setCommentAuthor] = useState('Parent Member');

  // New Idea Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<IdeaCategory>('games');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newTagsInput, setNewTagsInput] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Back button handler for modal
  useEffect(() => {
    if (isSubmitModalOpen) {
      return registerModalBackHandler(() => setIsSubmitModalOpen(false));
    }
  }, [isSubmitModalOpen]);

  // Filtered & Sorted Ideas
  const filteredIdeas = useMemo(() => {
    return communityIdeas
      .filter((idea) => {
        if (selectedCategory !== 'all' && idea.category !== selectedCategory) return false;
        if (selectedStatus !== 'all' && idea.status !== selectedStatus) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            idea.title.toLowerCase().includes(q) ||
            idea.description.toLowerCase().includes(q) ||
            idea.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'votes') return b.votesCount - a.votesCount;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'official') {
          if (a.officialResponse && !b.officialResponse) return -1;
          if (!a.officialResponse && b.officialResponse) return 1;
          return b.votesCount - a.votesCount;
        }
        return 0;
      });
  }, [communityIdeas, selectedCategory, selectedStatus, sortBy, searchQuery]);

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const tags = newTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    submitCommunityIdea({
      title: newTitle,
      description: newDescription,
      category: newCategory,
      authorName: newAuthorName || 'Parent Member',
      tags,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewTagsInput('');
      setNewAuthorName('');
    }, 1200);
  };

  const handlePostComment = (ideaId: string) => {
    const text = commentInputs[ideaId];
    if (!text || !text.trim()) return;

    addIdeaComment(ideaId, text, commentAuthor);
    setCommentInputs((prev) => ({ ...prev, [ideaId]: '' }));
  };

  const totalVotes = communityIdeas.reduce((sum, item) => sum + item.votesCount, 0);
  const inDevCount = communityIdeas.filter((i) => i.status === 'in_development').length;
  const liveCount = communityIdeas.filter((i) => i.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar currentScreen="ideas" onNavigate={onNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* HERO BANNER */}
        <div className="relative rounded-4xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 sm:p-10 shadow-pop overflow-hidden animate-pop-in">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-200 border border-white/20">
              <span className="animate-pulse">🚀</span>
              <span>Kidora Beta v1.6.0 • Community Idea Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Shape the Future of Kidora! 💡
            </h1>

            <p className="text-sm sm:text-base text-amber-50 leading-relaxed">
              Have an idea for a new game, regional language, math puzzle, or parent tool? Post your suggestion, upvote features you love, and see live progress updates from our product team!
            </p>

            {/* Quick Action & Stats */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="btn-press px-5 py-3 rounded-2xl bg-white text-orange-700 hover:bg-amber-50 font-black text-sm shadow-soft flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Your Idea</span>
              </button>

              <div className="flex items-center gap-3 text-xs font-bold text-white/90">
                <span className="bg-white/15 px-3 py-1.5 rounded-xl">
                  💡 <strong>{communityIdeas.length}</strong> Ideas
                </span>
                <span className="bg-white/15 px-3 py-1.5 rounded-xl">
                  🔥 <strong>{totalVotes}</strong> Community Votes
                </span>
                <span className="bg-white/15 px-3 py-1.5 rounded-xl">
                  🚀 <strong>{inDevCount}</strong> In Development
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH, CATEGORIES & FILTERS BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-slate-200 space-y-4">
          {/* Top Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ideas, games, languages, or features..."
                className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400">Sort:</span>
              {[
                { id: 'votes' as SortOption, label: '🔥 Top Voted' },
                { id: 'newest' as SortOption, label: '🆕 Newest' },
                { id: 'official' as SortOption, label: '💬 Team Reply' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortBy(s.id)}
                  className={`btn-press text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                    sortBy === s.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`btn-press text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🌟 All Categories ({communityIdeas.length})
            </button>
            {IDEA_CATEGORIES.map((cat) => {
              const count = communityIdeas.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn-press text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.emoji} {cat.title} ({count})
                </button>
              );
            })}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-slate-100 pt-3">
            <span className="text-[10px] font-black uppercase text-slate-400 mr-1 tracking-wider shrink-0">
              Status:
            </span>
            <button
              type="button"
              onClick={() => setSelectedStatus('all')}
              className={`btn-press text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            {(['in_development', 'planned', 'under_review', 'completed'] as IdeaStatus[]).map((st) => {
              const cfg = IDEA_STATUS_CONFIG[st];
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`btn-press text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer border transition-colors ${
                    selectedStatus === st
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-1 ring-amber-400 font-black`
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* IDEAS LIST */}
        <div className="space-y-4">
          {filteredIdeas.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="text-5xl animate-bounce-soft">💡</div>
              <h3 className="text-xl font-bold font-display text-slate-800">
                No ideas found in this category yet!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first parent or explorer to suggest a feature here!
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="btn-press px-4 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-soft inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Submit Idea Now
              </button>
            </div>
          ) : (
            filteredIdeas.map((idea) => {
              const catObj = IDEA_CATEGORIES.find((c) => c.id === idea.category);
              const statusObj = IDEA_STATUS_CONFIG[idea.status];
              const isCommentsOpen = openCommentsIdeaId === idea.id;

              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 shadow-soft border border-slate-200 transition-all hover:border-amber-300 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    {/* UPVOTE BUTTON TILE */}
                    <button
                      type="button"
                      onClick={() => toggleVoteIdea(idea.id)}
                      className={`btn-press w-16 sm:w-20 shrink-0 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                        idea.votedByMe
                          ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-white border-amber-400 shadow-soft scale-102'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                      }`}
                      title={idea.votedByMe ? 'Click to remove vote' : 'Click to upvote'}
                    >
                      <ArrowUp className={`w-5 h-5 ${idea.votedByMe ? 'stroke-[3]' : 'stroke-[2.5]'}`} />
                      <span className="font-black font-display text-sm sm:text-base leading-none">
                        {idea.votesCount}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-tight opacity-80">
                        {idea.votedByMe ? 'Voted' : 'Vote'}
                      </span>
                    </button>

                    {/* MAIN CONTENT */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${catObj?.color}`}>
                          {catObj?.emoji} {catObj?.title}
                        </span>

                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${statusObj.bg} ${statusObj.text} ${statusObj.border}`}>
                          <span>{statusObj.emoji}</span>
                          <span>{statusObj.label}</span>
                        </span>

                        <span className="text-[11px] text-slate-400 ml-auto font-medium">
                          by {idea.authorName} • {idea.createdAt}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 leading-snug">
                        {idea.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {idea.description}
                      </p>

                      {/* TAGS */}
                      {idea.tags && idea.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {idea.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OFFICIAL KIDORA TEAM RESPONSE CARD */}
                  {idea.officialResponse && (
                    <div className="ml-0 sm:ml-24 p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-sky-50/80 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-[10px] shadow-xs">
                          ✨
                        </div>
                        <span className="text-xs font-black text-slate-900">
                          {idea.officialResponse.responderName}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.2 rounded-full">
                          Official Team
                        </span>
                        <span className="text-[10px] text-slate-400 ml-auto">
                          {idea.officialResponse.respondedAt}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium pl-7">
                        "{idea.officialResponse.message}"
                      </p>
                    </div>
                  )}

                  {/* COMMENTS TOGGLE & THREAD */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setOpenCommentsIdeaId(isCommentsOpen ? null : idea.id)}
                      className="btn-press text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {idea.comments.length > 0 ? `${idea.comments.length} Discussion Notes` : 'Add a Thought'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleVoteIdea(idea.id)}
                      className="btn-press text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{idea.votedByMe ? 'Upvoted ❤️' : 'Upvote idea'}</span>
                    </button>
                  </div>

                  {/* COMMENTS ACCORDION PANEL */}
                  {isCommentsOpen && (
                    <div className="pt-2 space-y-3 animate-fade-in border-t border-slate-50">
                      {idea.comments.length > 0 && (
                        <div className="space-y-2">
                          {idea.comments.map((comm) => (
                            <div
                              key={comm.id}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                                <span>{comm.authorName}</span>
                                <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                              </div>
                              <p className="text-slate-700">{comm.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ADD COMMENT INPUT */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={commentInputs[idea.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [idea.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handlePostComment(idea.id);
                          }}
                          placeholder="Write a supportive comment or use case..."
                          className="flex-1 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handlePostComment(idea.id)}
                          className="btn-press px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* SUBMIT NEW IDEA MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white rounded-4xl max-w-lg w-full p-6 sm:p-8 shadow-pop border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar space-y-5">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                <span>💡</span> Suggest a Feature
              </div>
              <h2 className="text-2xl font-black font-display text-slate-900">
                Share Your Idea for Kidora
              </h2>
              <p className="text-xs text-slate-500">
                Your suggestion will be published to the community voting board where parents and children can upvote it!
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 text-center space-y-2 animate-pop-in">
                <div className="text-4xl">🎉</div>
                <h4 className="font-black font-display text-lg">Thank you! Idea Published!</h4>
                <p className="text-xs">Your idea is now live on the voting board.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitIdea} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Idea Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Add Tamil Voice Narration for Phonics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as IdeaCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {IDEA_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Description & Why It Matters <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Explain how this feature would help children learn, play, or make the app safer..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name / Title</label>
                    <input
                      type="text"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      placeholder="e.g. Priya (Parent)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tags (Comma separated)</label>
                    <input
                      type="text"
                      value={newTagsInput}
                      onChange={(e) => setNewTagsInput(e.target.value)}
                      placeholder="e.g. Tamil, Voice, Phonics"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="btn-press flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-press flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black shadow-soft cursor-pointer"
                  >
                    Post Idea 💡
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
