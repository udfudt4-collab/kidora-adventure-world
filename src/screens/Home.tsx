import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LivingWorld } from '@/components/LivingWorld';
import { HeroCharacter } from '@/components/HeroCharacter';
import { Companion } from '@/components/Companion';
import { AdSenseSafeZone } from '@/components/AdSenseSafeZone';
import { kidoraCharacters } from '@/lib/characters';
import { useApp } from '@/lib/store';
import type { Screen } from '@/lib/types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useApp();
  const [selectedCharacter, setSelectedCharacter] = useState(kidoraCharacters[0]);

  if (!profile) return null;

  const currentStars = profile.stars ?? 0;

  const realms = [
    {
      id: 'words',
      name: 'Word Forest',
      emoji: '🌳',
      badge: 'Spelling & Vocabulary',
      description: 'Explore the enchanted grove, discover sight words, and crack secret phonics scrolls.',
      gradient: 'from-emerald-400 to-green-600',
      host: 'Kido 🦊',
      screen: 'play' as Screen,
    },
    {
      id: 'math',
      name: 'Math Mountain',
      emoji: '🏔️',
      badge: 'Numbers & Logic',
      description: 'Scale the crystal peak by solving visual arithmetic, counting gems, and mastering shapes.',
      gradient: 'from-sky-400 to-blue-600',
      host: 'Tiko 🧮',
      screen: 'play' as Screen,
    },
    {
      id: 'creative',
      name: 'Creative Island',
      emoji: '🏝️',
      badge: 'Art & Living Creations',
      description: 'Draw glowing artwork and bring your creatures to life in your living sanctuary.',
      gradient: 'from-pink-400 to-rose-600',
      host: 'Ria 🎨',
      screen: 'create' as Screen,
    },
    {
      id: 'puzzle',
      name: 'Puzzle Castle',
      emoji: '🏰',
      badge: 'Brain & Memory',
      description: 'Challenge your mind with spatial memory matching, pattern riddles, and mystery paths.',
      gradient: 'from-purple-400 to-indigo-600',
      host: 'Momo 🧩',
      screen: 'play' as Screen,
    },
    {
      id: 'science',
      name: 'Science Space',
      emoji: '🚀',
      badge: 'Discovery & Space',
      description: 'Orbit sparkling planets, uncover dinosaur fossils, and conduct magical laboratory experiments.',
      gradient: 'from-teal-400 to-cyan-600',
      host: 'Lumi 🔬',
      screen: 'play' as Screen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      {/* Universal Sticky Top Navigation */}
      <Navbar currentScreen="home" onNavigate={onNavigate} />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-400 via-amber-200 to-emerald-100 py-12 sm:py-16 px-4 sm:px-6">
          {/* Animated Sky Elements */}
          <div className="absolute top-4 left-8 text-4xl animate-float opacity-80 pointer-events-none">☁️</div>
          <div className="absolute top-10 right-12 text-5xl animate-float opacity-70 pointer-events-none" style={{ animationDelay: '1s' }}>☁️</div>
          <div className="absolute top-20 right-1/4 text-2xl animate-float opacity-80 pointer-events-none" style={{ animationDelay: '2s' }}>✨</div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 animate-pop-in">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-slate-800 text-xs font-black font-display uppercase tracking-wider">
              <span>🌈</span> Learn • Play • Explore
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-black font-display text-slate-900 tracking-tight drop-shadow-sm leading-tight">
              KIDORA ADVENTURE WORLD
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-700 text-sm sm:text-lg max-w-2xl mx-auto font-bold leading-relaxed">
              An exciting world of games, puzzles, creativity and learning adventures for curious young minds.
            </p>

            {/* Hero Character & Companion Mascot */}
            <div className="flex justify-center items-end gap-3 pt-2 pb-2">
              <Companion emotion="welcoming" childName={profile.name} size={65} showDialogue={false} />
              <HeroCharacter avatar={profile.avatar} size={110} name={profile.name} showNameTag={true} pose="idle" />
            </div>

            {/* Massive Call To Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('adventure')}
                className="btn-press inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white font-black font-display text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-3xl shadow-pop transform hover:scale-105 transition-all cursor-pointer"
              >
                <span>START ADVENTURE</span>
                <span className="text-2xl">🚀</span>
              </button>
            </div>

            {/* Sub Quick Links */}
            <div className="flex items-center justify-center gap-3 pt-2 text-xs font-bold text-slate-700 flex-wrap">
              <button
                type="button"
                onClick={() => onNavigate('play')}
                className="bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer"
              >
                🎮 Quick Play Games
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('my-kidora')}
                className="bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer"
              >
                🌱 My Kidora Sanctuary
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('learn')}
                className="bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer"
              >
                📚 Learning Guides
              </button>
            </div>
          </div>
        </section>

        {/* 2. PROGRESSION & STAR MILESTONES BAR */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {profile.name}'s Explorer Progress
                </div>
                <div className="text-xl font-black font-display text-slate-800">
                  {currentStars} Stars Collected
                </div>
              </div>
            </div>

            {/* Visual Milestones */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-md w-full">
              {[
                { stars: 10, label: 'Explorer Badge', icon: '🏅' },
                { stars: 25, label: 'Realm Unlock', icon: '🗺️' },
                { stars: 50, label: 'Hero Upgrade', icon: '👑' },
              ].map((m, idx) => {
                const isUnlocked = currentStars >= m.stars;
                return (
                  <div
                    key={idx}
                    className={`flex-1 p-2 rounded-2xl text-center border transition-all ${
                      isUnlocked
                        ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="text-lg">{m.icon}</div>
                    <div className="text-[10px] font-bold truncate">{m.stars} Stars</div>
                    <div className="text-[9px] font-medium truncate">{m.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE LIVING WORLD LANDSCAPE */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-800">
              Your Living Kidora World
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tap landmarks below to enter your sanctuary, plant seeds in your garden, or launch realm quests!
            </p>
          </div>

          <LivingWorld onNavigate={onNavigate} />
        </section>

        {/* 4. EXPLORE THE 5 ADVENTURE REALMS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
              <span>🗺️</span> 5 Magical Realms
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-800">
              Explore Kidora Realms
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Each world is guided by a friendly character and filled with educational mini-games.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realms.map((realm) => (
              <div
                key={realm.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-pop transition-all hover:-translate-y-1"
              >
                <div>
                  {/* Banner */}
                  <div className={`bg-gradient-to-r ${realm.gradient} p-5 text-white flex items-center justify-between`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {realm.badge}
                      </span>
                      <h3 className="text-xl font-black font-display mt-1">{realm.name}</h3>
                    </div>
                    <div className="text-4xl animate-bounce-soft">{realm.emoji}</div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-xs font-bold text-slate-400">
                      Realm Guide: <strong className="text-slate-700">{realm.host}</strong>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-body">
                      {realm.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onNavigate(realm.screen)}
                    className={`btn-press w-full py-3 rounded-2xl text-white font-black font-display text-xs bg-gradient-to-r ${realm.gradient} shadow-soft flex items-center justify-center gap-1.5 cursor-pointer`}
                  >
                    <span>Explore {realm.name}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. ORIGINAL KIDORA CHARACTER SQUAD */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                <span>🦊</span> Meet the Squad
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-800">
                The Kidora Characters
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Original guides who inspire curiosity, courage, creativity, and mathematical thinking.
              </p>
            </div>

            {/* Character Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {kidoraCharacters.map((char) => (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => setSelectedCharacter(char)}
                  className={`btn-press p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                    selectedCharacter.id === char.id
                      ? 'bg-white border-amber-400 shadow-pop scale-105'
                      : 'bg-white/70 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="text-3xl mb-1">{char.emoji}</div>
                  <div className="text-xs font-black font-display text-slate-800">{char.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">{char.role}</div>
                </button>
              ))}
            </div>

            {/* Active Character Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 flex flex-col md:flex-row items-center gap-6 animate-pop-in">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${selectedCharacter.avatarBg} flex items-center justify-center text-5xl shadow-soft shrink-0 animate-bounce-soft`}>
                {selectedCharacter.emoji}
              </div>
              <div className="space-y-2 text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="text-2xl font-black font-display text-slate-800">{selectedCharacter.name}</h3>
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    {selectedCharacter.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  {selectedCharacter.description}
                </p>
                <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-3 text-xs text-amber-900 font-bold italic">
                  "{selectedCharacter.quote}"
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GOOGLE ADSENSE COMPLIANT SAFE CONTAINER */}
        <section className="py-6">
          <AdSenseSafeZone format="horizontal" />
        </section>

        {/* 7. PARENTS & TRUST HIGHLIGHT BANNER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                For Parents & Educators
              </span>
              <h3 className="text-2xl font-black font-display">Meaningful Screen Time You Can Trust</h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                Zero personal data harvesting, no social media feeds, and educational games built around curiosity and perseverance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('parents')}
              className="btn-press bg-white text-emerald-800 font-black font-display text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-soft whitespace-nowrap cursor-pointer hover:bg-emerald-50"
            >
              Read Parent Guide 🛡️
            </button>
          </div>
        </section>
      </main>

      {/* Universal Footer with Legal & Compliance Links */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
