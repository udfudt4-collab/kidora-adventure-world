import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSenseSafeZone } from '@/components/AdSenseSafeZone';
import { MathActivity } from '@/activities/MathActivity';
import { WordsActivity } from '@/activities/WordsActivity';
import { BrainActivity } from '@/activities/BrainActivity';
import { ScienceActivity } from '@/activities/ScienceActivity';
import { CreativityActivity } from '@/activities/CreativityActivity';
import { StoryActivity } from '@/activities/StoryActivity';
import { Confetti } from '@/components/Confetti';
import { useApp } from '@/lib/store';
import { registerModalBackHandler } from '@/lib/navigation';
import { kidoraCharacters } from '@/lib/characters';
import type { Screen } from '@/lib/types';

interface PlayHubProps {
  onNavigate: (screen: Screen) => void;
}

type RealmFilter = 'all' | 'math' | 'words' | 'puzzle' | 'science' | 'creative';

interface GameItem {
  id: string;
  title: string;
  realm: string;
  category: RealmFilter;
  emoji: string;
  hostCharacter: string;
  hostEmoji: string;
  ageRange: string;
  description: string;
  skills: string[];
  gradient: string;
  activityType: 'math' | 'words' | 'brain' | 'science' | 'creativity' | 'story';
}

const gamesList: GameItem[] = [
  {
    id: 'math-climb',
    title: 'Math Mountain Summit',
    realm: 'Math Mountain',
    category: 'math',
    emoji: '🏔️',
    hostCharacter: 'Tiko',
    hostEmoji: '🧮',
    ageRange: 'Ages 4–9',
    description: 'Solve fun visual math problems, count crystals, and scale the peak with Tiko!',
    skills: ['Addition', 'Counting', 'Geometry', 'Number Sense'],
    gradient: 'from-sky-400 to-blue-600',
    activityType: 'math',
  },
  {
    id: 'word-safari',
    title: 'Word Forest Adventure',
    realm: 'Word Forest',
    category: 'words',
    emoji: '🌳',
    hostCharacter: 'Kido',
    hostEmoji: '🦊',
    ageRange: 'Ages 4–8',
    description: 'Find missing letters, spell magical animal names, and expand your vocabulary.',
    skills: ['Spelling', 'Phonics', 'Vocabulary', 'Letter Recognition'],
    gradient: 'from-emerald-400 to-green-600',
    activityType: 'words',
  },
  {
    id: 'puzzle-maze',
    title: 'Puzzle Castle Riddle Gate',
    realm: 'Puzzle Castle',
    category: 'puzzle',
    emoji: '🏰',
    hostCharacter: 'Momo',
    hostEmoji: '🧩',
    ageRange: 'Ages 5–10',
    description: 'Exercise your brain with pattern recognition, logic riddles, and memory mazes.',
    skills: ['Logic', 'Memory', 'Critical Thinking', 'Pattern Matching'],
    gradient: 'from-purple-400 to-indigo-600',
    activityType: 'brain',
  },
  {
    id: 'science-lab',
    title: 'Science Space Station',
    realm: 'Science Space',
    category: 'science',
    emoji: '🚀',
    hostCharacter: 'Lumi',
    hostEmoji: '🔬',
    ageRange: 'Ages 5–10',
    description: 'Discover planets, dinosaur fossils, chemical reactions, and natural wonders.',
    skills: ['Astronomy', 'Biology', 'Curiosity', 'Scientific Inquiry'],
    gradient: 'from-teal-400 to-cyan-600',
    activityType: 'science',
  },
  {
    id: 'creative-canvas',
    title: 'Creative Island Studio',
    realm: 'Creative Island',
    category: 'creative',
    emoji: '🏝️',
    hostCharacter: 'Ria',
    hostEmoji: '🎨',
    ageRange: 'All Ages',
    description: 'Draw glowing artwork, paint living creatures, and bring art into your world.',
    skills: ['Creative Expression', 'Color Theory', 'Fine Motor Skills'],
    gradient: 'from-pink-400 to-rose-600',
    activityType: 'creativity',
  },
  {
    id: 'story-quest',
    title: 'Legends of Kidora Story',
    realm: 'Story Realm',
    category: 'words',
    emoji: '📖',
    hostCharacter: 'Kido',
    hostEmoji: '🦊',
    ageRange: 'Ages 4–10',
    description: 'Make choices in an interactive illustrated branching storybook adventure.',
    skills: ['Reading Comprehension', 'Decision Making', 'Empathy'],
    gradient: 'from-amber-400 to-orange-600',
    activityType: 'story',
  },
  {
    id: 'abc-123-academy',
    title: 'ABC & 123 Learning Academy',
    realm: 'Phonics & Numbers',
    category: 'words',
    emoji: '🔤',
    hostCharacter: 'Kido',
    hostEmoji: '🦊',
    ageRange: 'Ages 3–8',
    description: 'Master A-Z phonics, Tamil words, 1-20 counting counters, and interactive letter tracing.',
    skills: ['Phonics', 'Handwriting Tracing', 'Counting', 'Tamil & English Vocabulary'],
    gradient: 'from-amber-500 to-rose-600',
    activityType: 'words',
  },
  {
    id: 'colors-lab',
    title: 'Colors & Magic Mixing Lab',
    realm: 'Rainbow Safari',
    category: 'creative',
    emoji: '🎨',
    hostCharacter: 'Ria',
    hostEmoji: '🎨',
    ageRange: 'All Ages',
    description: 'Explore 10+ vibrant colors with bilingual names and mix magic paint potions in the cauldron.',
    skills: ['Color Theory', 'Art Science', 'Bilingual Vocabulary'],
    gradient: 'from-violet-500 to-pink-600',
    activityType: 'creativity',
  },
  {
    id: 'worksheets-studio',
    title: 'Worksheets Studio & Tracing',
    realm: 'Creative Island',
    category: 'creative',
    emoji: '📝',
    hostCharacter: 'Tiko',
    hostEmoji: '🧮',
    ageRange: 'Ages 4–8',
    description: 'Digital interactive tracing canvas and printable A4 worksheets for offline classroom & home study.',
    skills: ['Pencil Control', 'Alphabet Tracing', 'Number Writing', 'Mazes'],
    gradient: 'from-emerald-500 to-teal-600',
    activityType: 'creativity',
  },
];

export function PlayHub({ onNavigate }: PlayHubProps) {
  const { profile, addStars, recordActivity, addUnlock } = useApp();
  const [selectedRealm, setSelectedRealm] = useState<RealmFilter>('all');
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const filteredGames = selectedRealm === 'all'
    ? gamesList
    : gamesList.filter((g) => g.category === selectedRealm);

  const handleGameComplete = (stars: number) => {
    setEarnedStars(stars);
    addStars(stars);
    if (activeGame) {
      recordActivity(activeGame.activityType);
      addUnlock('activity', activeGame.activityType);
    }
    setShowCelebration(true);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setShowCelebration(false);
  };

  useEffect(() => {
    if (activeGame) {
      return registerModalBackHandler(() => {
        setActiveGame(null);
        setShowCelebration(false);
      });
    }
  }, [activeGame]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar currentScreen="play" onNavigate={onNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 animate-pop-in">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>🎮</span> Kidora Game Arcade
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-800 tracking-tight mb-2">
            Educational Games & Challenges
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every game is carefully crafted to build core skills in mathematics, phonics, critical logic, and creative expression.
          </p>
        </div>

        {/* Realm Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {[
            { id: 'all' as RealmFilter, label: 'All Games', emoji: '🌟' },
            { id: 'math' as RealmFilter, label: 'Math Mountain', emoji: '🏔️' },
            { id: 'words' as RealmFilter, label: 'Word Forest', emoji: '🌳' },
            { id: 'puzzle' as RealmFilter, label: 'Puzzle Castle', emoji: '🏰' },
            { id: 'science' as RealmFilter, label: 'Science Space', emoji: '🚀' },
            { id: 'creative' as RealmFilter, label: 'Creative Island', emoji: '🏝️' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRealm(tab.id)}
              className={`btn-press px-4 py-2 rounded-2xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRealm === tab.id
                  ? 'bg-slate-900 text-white shadow-soft scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-pop transition-all hover:-translate-y-1"
            >
              <div>
                {/* Banner Header */}
                <div className={`bg-gradient-to-r ${game.gradient} p-5 text-white flex items-center justify-between`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {game.realm}
                    </span>
                    <h3 className="text-xl font-black font-display mt-1">{game.title}</h3>
                  </div>
                  <div className="text-4xl animate-bounce-soft">{game.emoji}</div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  {/* Host info & Age */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span>{game.hostEmoji}</span>
                      <span>Guide: <strong>{game.hostCharacter}</strong></span>
                    </div>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[11px]">
                      {game.ageRange}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    {game.description}
                  </p>

                  {/* Skills tags */}
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Skills Learned:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {game.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-md text-[10px] font-bold"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (game.id === 'abc-123-academy' || game.id === 'colors-lab' || game.id === 'worksheets-studio') {
                      onNavigate('learn');
                    } else if (game.activityType === 'creativity') {
                      onNavigate('create');
                    } else {
                      setActiveGame(game);
                    }
                  }}
                  className={`btn-press w-full py-3.5 rounded-2xl text-white font-black font-display text-sm bg-gradient-to-r ${game.gradient} shadow-soft flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>Play {game.title.split(' ')[0]}</span>
                  <span>🚀</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AdSense Safe Zone (Non-intrusive container) */}
        <AdSenseSafeZone format="horizontal" />

        {/* Character Guide Tip Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-center gap-6 my-10">
          <div className="text-6xl animate-bounce-soft">🦊</div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Kido's Explorer Tip
            </span>
            <h3 className="text-2xl font-black font-display">Play a little every day!</h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Completing just 1 or 2 games daily earns stars, expands your garden, and unlocks secret badges in your My Kidora sanctuary!
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('adventure')}
            className="btn-press bg-white text-orange-600 font-black font-display px-6 py-3 rounded-2xl shadow-soft text-sm cursor-pointer whitespace-nowrap"
          >
            Start Today's Quest 🗺️
          </button>
        </div>
      </main>

      {/* Active Game Modal / Full Screen Player */}
      {activeGame && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-4xl shadow-pop max-w-lg w-full overflow-hidden my-auto animate-pop-in border-4 border-white">
            {/* Header */}
            <div className={`bg-gradient-to-r ${activeGame.gradient} p-4 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeGame.emoji}</span>
                <div>
                  <h3 className="font-black font-display text-base">{activeGame.title}</h3>
                  <span className="text-[10px] opacity-90">{activeGame.realm}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseGame}
                className="btn-press w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Game Content */}
            <div className="p-4">
              {showCelebration ? (
                <div className="text-center py-8 space-y-4">
                  <Confetti show count={40} />
                  <div className="text-6xl animate-bounce-soft">🎉</div>
                  <h3 className="text-2xl font-black font-display text-slate-800">
                    Magnificent Job, Explorer!
                  </h3>
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-amber-700 font-black text-sm">
                    <span>⭐</span> +{earnedStars} Stars Added to Your World!
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    You conquered {activeGame.title}! Check your My Kidora sanctuary to see your growing achievements.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCelebration(false)}
                      className="btn-press flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs cursor-pointer"
                    >
                      Play Again 🔄
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseGame}
                      className="btn-press flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 rounded-2xl text-xs shadow-soft cursor-pointer"
                    >
                      Back to Games 🎮
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {activeGame.activityType === 'math' && (
                    <MathActivity age={profile?.age ?? 6} onComplete={handleGameComplete} />
                  )}
                  {activeGame.activityType === 'words' && (
                    <WordsActivity age={profile?.age ?? 6} onComplete={handleGameComplete} />
                  )}
                  {activeGame.activityType === 'brain' && (
                    <BrainActivity age={profile?.age ?? 6} onComplete={handleGameComplete} />
                  )}
                  {activeGame.activityType === 'science' && (
                    <ScienceActivity age={profile?.age ?? 6} onComplete={handleGameComplete} />
                  )}
                  {activeGame.activityType === 'story' && (
                    <StoryActivity age={profile?.age ?? 6} onComplete={handleGameComplete} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
