import { useState } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ShareReward } from '@/components/ShareReward';
import { useApp } from '@/lib/store';
import { getShareableReward, type ShareableReward } from '@/lib/rewards';
import type { Screen } from '@/lib/types';

interface CollectionsProps {
  onNavigate: (screen: Screen) => void;
}

const badgeEmojis: Record<string, string> = {
  'Jungle Explorer': '🦜', 'Space Cadet': '👨‍🚀', 'Dino Discoverer': '🦴',
  'Ocean Diver': '🐠', 'Castle Hero': '👑', 'Little Scientist': '⚗️', 'Creative Star': '🎨',
};

const collectibles = [
  { category: 'animal', items: ['🐼', '🐶', '🐱', '🐰', '🦊', '🦁', '🐸', '🐘', '🦒', '🦓'] },
  { category: 'dino', items: ['🦖', '🦕', '🦴', '🥚'] },
  { category: 'space', items: ['🚀', '🌟', '🌙', '☄️', '🪐', '👽'] },
  { category: 'nature', items: ['🌳', '🌸', '🍄', '🌵', '🌴', '🌺'] },
];

export function Collections({ onNavigate }: CollectionsProps) {
  const { unlocks, creations, profile } = useApp();
  const [shareReward, setShareReward] = useState<ShareableReward | null>(null);
  const badges = unlocks.filter(u => u.category === 'badge');

  return (
    <AnimatedBackground variant="day">
      <div className="min-h-screen px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/80 rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg">
            My Collections 🏆
          </h1>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl p-4 shadow-soft mb-4">
          <h2 className="text-lg font-display font-bold text-slate-700 mb-3">Badges Earned</h2>
          {badges.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-slate-400">Complete adventures to earn badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {badges.map((b) => {
                const reward = getShareableReward(b.key);
                return (
                  <div key={b.key} className="bg-sun-50 rounded-2xl p-3 text-center animate-pop-in">
                    <div className="text-3xl">{badgeEmojis[b.key] ?? '🏆'}</div>
                    <div className="text-xs font-bold text-slate-500 mt-1">{b.key}</div>
                    {reward && (
                      <button
                        onClick={() => setShareReward(reward)}
                        className="btn-press mt-1 text-xs font-bold text-sky-500 bg-sky-50 rounded-full px-2 py-0.5"
                      >
                        📤 Share
                    </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Collectibles */}
        <div className="bg-white rounded-3xl p-4 shadow-soft mb-4">
          <h2 className="text-lg font-display font-bold text-slate-700 mb-3">Collectibles</h2>
          {collectibles.map((cat) => (
            <div key={cat.category} className="mb-3">
              <div className="text-xs font-bold text-slate-400 uppercase capitalize mb-1">{cat.category}</div>
              <div className="flex gap-2 flex-wrap">
                {cat.items.map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-2 text-2xl">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Creations */}
        <div className="bg-white rounded-3xl p-4 shadow-soft">
          <h2 className="text-lg font-display font-bold text-slate-700 mb-3">My Creations ({creations.length})</h2>
          {creations.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-sm text-slate-400">Your drawings and stories will appear here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {creations.slice(0, 9).map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-2xl p-2 text-center">
                  <div className="text-2xl">{c.type === 'drawing' ? '🎨' : '📖'}</div>
                  <div className="text-xs font-bold text-slate-500 mt-1 truncate">{c.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {shareReward && profile && (
        <ShareReward
          reward={shareReward}
          childName={profile.name}
          onClose={() => setShareReward(null)}
        />
      )}
    </AnimatedBackground>
  );
}
