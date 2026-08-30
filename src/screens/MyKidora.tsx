import { useState } from 'react';
import { HeroCharacter } from '@/components/HeroCharacter';
import { Pet } from '@/components/Pet';
import { Companion } from '@/components/Companion';
import { ShareReward } from '@/components/ShareReward';
import { BackpackModal } from '@/components/BackpackModal';
import { PassportModal } from '@/components/PassportModal';
import { StarCounter, StreakBadge } from '@/components/StatBadges';
import { useApp } from '@/lib/store';
import { computeWorldGrowth } from '@/lib/worldGrowth';
import { getShareableReward, type ShareableReward } from '@/lib/rewards';
import { hatOptions, hairStyles, hairColors, outfitColors, backpackOptions, accessoryOptions } from '@/lib/avatar';
import { ArrowLeft, Home as HomeIcon, Sparkles, Award, Palette, Heart, Trash2, Trees } from 'lucide-react';
import type { Screen } from '@/lib/types';

interface MyKidoraProps {
  onNavigate: (screen: Screen) => void;
}

type TabType = 'home' | 'growth' | 'pet' | 'creations' | 'badges';

export function MyKidora({ onNavigate }: MyKidoraProps) {
  const { profile, creations, unlocks, setAvatar, removeWorldItem, backpackItems, passportStamps } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [shareReward, setShareReward] = useState<ShareableReward | null>(null);
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [showBackpack, setShowBackpack] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  if (!profile) return null;

  const growth = computeWorldGrowth(
    profile.activitiesCompletedCount ?? 0,
    profile.totalAdventures ?? 0,
    profile.streak ?? 0
  );

  const badges = unlocks.filter((u) => u.category === 'badge');

  const badgeIcons: Record<string, string> = {
    'Jungle Explorer': '🦜',
    'Space Cadet': '👨‍🚀',
    'Dino Discoverer': '🦴',
    'Ocean Diver': '🐠',
    'Castle Hero': '👑',
    'Little Scientist': '⚗️',
    'Creative Star': '🎨',
  };

  return (
    <div
      className="min-h-screen pb-16 font-sans select-none"
      style={{
        background: 'linear-gradient(180deg, #e0e7ff 0%, #fdf4ff 40%, #ecfdf5 100%)',
      }}
    >
      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Header HUD */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-soft text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Back to Living World"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black font-display text-slate-800 flex items-center gap-1.5 justify-center">
              <span>🏠</span> My Kidora
            </h1>
            <p className="text-[11px] font-bold text-slate-400">Your Personal Magic Sanctuary</p>
          </div>
          <div className="flex items-center gap-1.5">
            <StarCounter count={profile.stars} />
            <StreakBadge streak={profile.streak} />
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-soft flex justify-between gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-amber-400 text-white shadow-soft scale-102'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <HomeIcon className="h-3.5 w-3.5" />
            Home
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`flex-1 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'growth'
                ? 'bg-emerald-500 text-white shadow-soft scale-102'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Trees className="h-3.5 w-3.5" />
            Growth
          </button>
          <button
            onClick={() => setActiveTab('pet')}
            className={`flex-1 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'pet'
                ? 'bg-sky-500 text-white shadow-soft scale-102'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            Pet
          </button>
          <button
            onClick={() => setActiveTab('creations')}
            className={`flex-1 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'creations'
                ? 'bg-pink-500 text-white shadow-soft scale-102'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            Art
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-purple-500 text-white shadow-soft scale-102'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Awards
          </button>
        </div>

        {/* Quick Backpack & Passport Launcher Card */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setShowBackpack(true)}
            className="btn-press bg-white rounded-2xl p-3 border border-amber-200 shadow-xs flex items-center justify-between hover:bg-amber-50/50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎒</span>
              <div className="text-left">
                <div className="text-xs font-black font-display text-slate-800">Backpack</div>
                <div className="text-[10px] text-amber-700 font-bold">{backpackItems.length} Relics Found</div>
              </div>
            </div>
            <span className="text-xs text-slate-400">→</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPassport(true)}
            className="btn-press bg-white rounded-2xl p-3 border border-indigo-200 shadow-xs flex items-center justify-between hover:bg-indigo-50/50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎟️</span>
              <div className="text-left">
                <div className="text-xs font-black font-display text-slate-800">Passport</div>
                <div className="text-[10px] text-indigo-700 font-bold">
                  {Object.values(passportStamps).reduce((a, b) => a + b, 0)} Stamps
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400">→</span>
          </button>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: 🏠 MY HOME & HERO CUSTOMIZATION                                 */}
        {/* ===================================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-4 animate-pop-in">
            {/* Hero & Room Showcase Card */}
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 text-center space-y-4">
              <div className="relative py-4 bg-gradient-to-b from-amber-50/60 to-sky-50/60 rounded-2xl flex items-center justify-center gap-4">
                <Companion emotion="celebrating" childName={profile.name} size={65} showDialogue={false} />
                <HeroCharacter avatar={profile.avatar} size={125} name={profile.name} showNameTag={true} pose="celebrate" />
                <Pet pet={profile.pet} size={48} mood="happy" animate={true} />
              </div>

              {/* Edit Hero Toggle Button */}
              <button
                onClick={() => setIsEditingHero(!isEditingHero)}
                className="btn-press bg-gradient-to-r from-amber-400 to-orange-500 text-white font-display font-bold text-xs px-5 py-2.5 rounded-2xl shadow-pop flex items-center gap-1.5 mx-auto cursor-pointer"
              >
                <span>🎨</span>
                <span>{isEditingHero ? 'Done Styling Hero' : 'Style Hero Outfit & Gear'}</span>
              </button>
            </div>

            {/* In-Depth Wardrobe Customizer */}
            {isEditingHero && (
              <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 space-y-4 animate-pop-in">
                <h3 className="text-sm font-black font-display text-slate-800">Dress Up Your Explorer</h3>

                {/* Hair Styles */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Hair Style</p>
                  <div className="flex gap-2 flex-wrap">
                    {hairStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setAvatar({ ...profile.avatar, hair: style })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          profile.avatar.hair === style
                            ? 'bg-sky-500 text-white shadow-soft'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Colors */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Hair Color</p>
                  <div className="flex gap-2">
                    {hairColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setAvatar({ ...profile.avatar, hairColor: color })}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                          profile.avatar.hairColor === color ? 'scale-120 ring-2 ring-sky-400 ring-offset-2' : ''
                        }`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Outfit Colors */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Outfit Color</p>
                  <div className="flex gap-2">
                    {outfitColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setAvatar({ ...profile.avatar, outfit: c, outfitColor: c })}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                          profile.avatar.outfitColor === c || profile.avatar.outfit === c
                            ? 'scale-120 ring-2 ring-sky-400 ring-offset-2'
                            : ''
                        }`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hats & Headwear */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Headwear</p>
                  <div className="flex gap-2 flex-wrap">
                    {hatOptions.map((hat) => (
                      <button
                        key={hat}
                        onClick={() => setAvatar({ ...profile.avatar, hat })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          profile.avatar.hat === hat
                            ? 'bg-purple-500 text-white shadow-soft'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {hat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Backpacks */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Backpack & Gear</p>
                  <div className="flex gap-2 flex-wrap">
                    {backpackOptions.map((bp) => (
                      <button
                        key={bp}
                        onClick={() => setAvatar({ ...profile.avatar, backpack: bp })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          profile.avatar.backpack === bp
                            ? 'bg-rose-500 text-white shadow-soft'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {bp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Accessories</p>
                  <div className="flex gap-2 flex-wrap">
                    {accessoryOptions.map((acc) => (
                      <button
                        key={acc}
                        onClick={() => setAvatar({ ...profile.avatar, accessory: acc })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          profile.avatar.accessory === acc
                            ? 'bg-emerald-500 text-white shadow-soft'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: 🌱 WORLD THAT GROWS WITH YOU EVOLUTION                          */}
        {/* ===================================================================== */}
        {activeTab === 'growth' && (
          <div className="space-y-4 animate-pop-in">
            <div className="bg-gradient-to-b from-emerald-500 to-teal-700 text-white rounded-3xl p-6 shadow-soft text-center space-y-3 border border-emerald-300">
              <div className="text-6xl animate-float py-1">🌱</div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                World Level {growth.growthLevel} of 10
              </span>
              <h2 className="text-2xl font-black font-display text-white">{growth.title}</h2>
              <p className="text-xs text-emerald-100 max-w-xs mx-auto leading-relaxed">
                {growth.description}
              </p>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-300 animate-pulse-soft" />
                <span>Next Growth Stage in {growth.nextGoalActivities} more learning activities!</span>
              </div>
            </div>

            {/* Unlocked Flora Grid */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-3">
              <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-1.5">
                <span>🌸</span> Sprouted Flora & Trees ({growth.unlockedPlants.filter((p) => p.unlocked).length}/{growth.unlockedPlants.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {growth.unlockedPlants.map((plant) => (
                  <div
                    key={plant.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      plant.unlocked
                        ? 'bg-emerald-50 border-emerald-200 shadow-xs'
                        : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-3xl mb-1">{plant.unlocked ? plant.emoji : '❓'}</div>
                    <div className="text-xs font-black text-slate-800">{plant.unlocked ? plant.name : 'Hidden Seed'}</div>
                    <div className="text-[10px] text-slate-500">{plant.unlocked ? plant.growthStage : `${plant.requiredActivities} activities`}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlocked Wildlife Animals */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-3">
              <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-1.5">
                <span>🐾</span> Roaming Wildlife ({growth.unlockedAnimals.filter((a) => a.unlocked).length}/{growth.unlockedAnimals.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {growth.unlockedAnimals.map((animal) => (
                  <div
                    key={animal.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      animal.unlocked
                        ? 'bg-sky-50 border-sky-200 shadow-xs'
                        : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-3xl mb-1">{animal.unlocked ? animal.emoji : '🔒'}</div>
                    <div className="text-xs font-black text-slate-800">{animal.unlocked ? animal.name : 'Unknown Creature'}</div>
                    <div className="text-[10px] text-slate-500">{animal.unlocked ? animal.habitat : `${animal.requiredMissions} missions`}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: 🐾 PET PLAYGROUND & HAVEN                                       */}
        {/* ===================================================================== */}
        {activeTab === 'pet' && (
          <div className="space-y-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 text-center space-y-4">
              <div className="py-4 bg-sky-50/70 rounded-2xl flex flex-col items-center justify-center">
                <Pet pet={profile.pet} size={80} mood="happy" animate={true} />
                <h2 className="text-lg font-black font-display text-slate-800 mt-2">{profile.pet.name}</h2>
                <p className="text-xs text-sky-600 font-bold capitalize">{profile.pet.type} Friend</p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onNavigate('pets')}
                  className="btn-press bg-sky-500 text-white font-display font-bold text-sm px-6 py-2.5 rounded-2xl shadow-pop"
                >
                  Play & Groom Pet 🎾
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: 🎨 LIVING CREATIONS & ART GALLERY                               */}
        {/* ===================================================================== */}
        {activeTab === 'creations' && (
          <div className="space-y-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black font-display text-slate-800">
                    My Living Creations ({creations.length})
                  </h2>
                  <p className="text-xs text-slate-400">Drawings that come alive in your world</p>
                </div>
                <button
                  onClick={() => onNavigate('create')}
                  className="btn-press bg-gradient-to-r from-pink-500 to-amber-500 text-white font-display font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-soft"
                >
                  + Create New 🎨
                </button>
              </div>

              {/* Placed World Items List */}
              {profile.worldItems && profile.worldItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placed In Living World</p>
                  <div className="grid grid-cols-2 gap-2">
                    {profile.worldItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[90px]">{item.title}</span>
                        </div>
                        <button
                          onClick={() => removeWorldItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remove from world"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Creations Grid */}
              {creations.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="text-sm text-slate-400">No artwork saved yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {creations.map((c) => (
                    <div key={c.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-2.5 text-center">
                      <div className="text-3xl mb-1">{c.type === 'drawing' ? '🎨' : '📖'}</div>
                      <div className="text-xs font-bold text-slate-700 truncate">{c.title || 'Art'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: 🏆 HALL OF BADGES & CERTIFICATES                                */}
        {/* ===================================================================== */}
        {activeTab === 'badges' && (
          <div className="space-y-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black font-display text-slate-800">
                    Master Badges Earned ({badges.length})
                  </h2>
                  <p className="text-xs text-slate-400">Official Kidora Academy Achievements</p>
                </div>
              </div>

              {badges.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm text-slate-400">Complete story adventures to earn badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {badges.map((b) => {
                    const reward = getShareableReward(b.key);
                    return (
                      <div
                        key={b.key}
                        className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-center space-y-1.5"
                      >
                        <div className="text-4xl">{badgeIcons[b.key] ?? '🏆'}</div>
                        <p className="text-xs font-black text-slate-800 font-display">{b.key}</p>
                        {reward && (
                          <button
                            onClick={() => setShareReward(reward)}
                            className="btn-press w-full bg-emerald-500 text-white font-display font-bold text-[10px] py-1 rounded-xl shadow-xs"
                          >
                            Share 📤
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Certificate Sharing Modal */}
      {shareReward && profile && (
        <ShareReward
          reward={shareReward}
          childName={profile.name}
          onClose={() => setShareReward(null)}
        />
      )}

      {/* Backpack Modal */}
      {showBackpack && (
        <BackpackModal
          isOpen={showBackpack}
          onClose={() => setShowBackpack(false)}
          collectedItemIds={backpackItems}
        />
      )}

      {/* Passport Modal */}
      {showPassport && (
        <PassportModal
          isOpen={showPassport}
          onClose={() => setShowPassport(false)}
          childName={profile.name}
          passportStamps={passportStamps}
        />
      )}
    </div>
  );
}

export default MyKidora;

