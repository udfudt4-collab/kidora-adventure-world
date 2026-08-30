import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { HeroCharacter } from '@/components/HeroCharacter';
import { Companion } from '@/components/Companion';
import { Pet } from '@/components/Pet';
import { Confetti } from '@/components/Confetti';
import { StarCounter } from '@/components/StatBadges';
import { ShareReward } from '@/components/ShareReward';
import { useApp } from '@/lib/store';
import { getTodayStoryAdventure, type StoryAdventure, type StoryMission } from '@/lib/adventure';
import { getShareableReward, getMissionPraise } from '@/lib/rewards';
import { shareAchievementAsImage } from '@/lib/imageCardGenerator';
import { useVoice } from '@/lib/useVoice';
import { MathActivity } from '@/activities/MathActivity';
import { WordsActivity } from '@/activities/WordsActivity';
import { BrainActivity } from '@/activities/BrainActivity';
import { ScienceActivity } from '@/activities/ScienceActivity';
import { CreativityActivity } from '@/activities/CreativityActivity';
import { StoryActivity } from '@/activities/StoryActivity';
import type { Screen } from '@/lib/types';

interface AdventureProps {
  onNavigate: (screen: Screen) => void;
}

type Phase = 'intro' | 'mission' | 'missionComplete' | 'complete';

export function Adventure({ onNavigate }: AdventureProps) {
  const { profile, addStars, completeAdventure, recordActivity, addUnlock } = useApp();
  const { speak, stop } = useVoice();
  const [adventure] = useState<StoryAdventure>(() => getTodayStoryAdventure());
  const [phase, setPhase] = useState<Phase>('intro');
  const [missions, setMissions] = useState<StoryMission[]>(adventure.missions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [lastStars, setLastStars] = useState(3);
  const [currentPraise, setCurrentPraise] = useState({
    headline: 'BRAVO! 🎉',
    subtext: 'Awesome job!',
    voiceText: 'Bravo! Awesome job!',
  });
  const [petMood, setPetMood] = useState<'happy' | 'playing' | 'celebrating' | 'sleeping'>('happy');
  const [mascotExpression, setMascotExpression] = useState<'happy' | 'excited' | 'surprised' | 'thinking' | 'celebrating' | 'resting'>('excited');
  const [showUnlock, setShowUnlock] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  if (!profile) return null;

  const handleMissionComplete = (stars: number) => {
    const updated = missions.map((m, i) => i === currentIdx ? { ...m, completed: true } : m);
    setMissions(updated);
    setEarnedStars(prev => prev + stars);
    setLastStars(stars);
    addStars(stars);
    const mission = updated[currentIdx];
    if (mission) {
      recordActivity(mission.type);
      addUnlock('activity', mission.type);
    }

    // Dynamic high-energy personalized praise
    const praise = getMissionPraise(profile.name, stars, mission?.type, currentIdx);
    setCurrentPraise(praise);

    // Pet and Mascot react
    setPetMood('celebrating');
    setMascotExpression('celebrating');
    if (profile.voiceEnabled) {
      speak(praise.voiceText, true);
    }

    // Move to mission complete celebration — stays open until user taps Next Mission
    setPhase('missionComplete');
  };

  const handleContinueNext = () => {
    if (currentIdx < missions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setPetMood('happy');
      setMascotExpression('excited');
      setPhase('mission');
    } else {
      // All done — cinematic unlock
      const worldThemeMap: Record<string, string> = {
        jungle: 'words',
        space: 'science',
        dinosaurs: 'science',
        ocean: 'science',
        castle: 'puzzle',
        science: 'science',
        creativity: 'creative',
      };
      const worldId = worldThemeMap[adventure.theme] || 'words';
      completeAdventure(earnedStars, adventure.rewardBadge, worldId);
      addUnlock('badge', adventure.rewardBadge);
      setShowUnlock(true);
      if (profile.voiceEnabled) {
        speak(`Magnificent job, ${profile.name}! You earned the ${adventure.rewardBadge} badge and stamped your Adventure Passport!`, true);
      }
      setTimeout(() => {
        setShowUnlock(false);
        setPhase('complete');
      }, 2500);
    }
  };

  const renderActivity = (mission: StoryMission) => {
    const props = {
      age: profile.age,
      onComplete: handleMissionComplete,
    };
    switch (mission.type) {
      case 'math': return <MathActivity {...props} />;
      case 'words': return <WordsActivity {...props} />;
      case 'brain': return <BrainActivity {...props} />;
      case 'science': return <ScienceActivity {...props} />;
      case 'creativity': return <CreativityActivity {...props} />;
      case 'story': return <StoryActivity {...props} />;
      default: return null;
    }
  };

  // INTRO screen
  if (phase === 'intro') {
    return (
      <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #38bdf8 0%, #a78bfa 50%, #f472b6 100%)' }}>
        <div className="relative z-10 min-h-screen flex flex-col justify-between px-4 py-6 max-w-lg mx-auto">
          {/* Top navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { stop(); onNavigate('home'); }}
              className="btn-press bg-white/80 rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
            >
              ←
            </button>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-display font-bold text-sm">
              Today's Adventure 🗺️
            </div>
            <div className="w-11" />
          </div>

          {/* Story intro card */}
          <div className="bg-white/95 backdrop-blur-md rounded-4xl p-6 shadow-pop text-center animate-pop-in">
            <div className="text-7xl mb-3 animate-bounce-soft">{adventure.storyCharacterEmoji}</div>
            <h1 className="text-3xl font-display font-extrabold text-slate-800 mb-2">
              {adventure.storyTitle}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              {adventure.storyIntro}
            </p>

            <div className="bg-sky-50 rounded-2xl p-3 mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">{adventure.rewardEmoji}</span>
              <span className="font-display font-bold text-sky-700 text-sm">Reward: {adventure.rewardBadge} Badge</span>
            </div>

            {/* Character + Pet + Companion ready for adventure */}
            <div className="flex justify-center items-end gap-3 mb-6">
              <Companion emotion="excited" childName={profile.name} size={65} showDialogue={false} />
              <HeroCharacter avatar={profile.avatar} size={105} name={profile.name} showNameTag={true} pose="idle" />
              <Pet pet={profile.pet} size={48} mood="playing" />
            </div>

            <Button variant="sunny" size="xl" fullWidth onClick={() => {
              setPhase('mission');
              if (profile.voiceEnabled) speak(adventure.missions[0]?.storyText ?? 'Lets go!', true);
            }}>
              Begin the Adventure! 🚀
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // MISSION COMPLETE — user stays on screen to celebrate and share!
  if (phase === 'missionComplete') {
    const mission = missions[currentIdx];

    const petEmojiMap: Record<string, string> = { puppy: '🐶', kitten: '🐱', bunny: '🐰', panda: '🐼', fox: '🦊', dino: '🦖', dragon: '🐉', unicorn: '🦄' };
    const handleShareMissionImage = async () => {
      await shareAchievementAsImage({
        childName: profile.name,
        emoji: mission?.emoji ?? '🏆',
        headline: currentPraise.headline,
        stars: lastStars,
        badgeName: mission?.title,
        missionType: mission?.type,
        petEmoji: petEmojiMap[profile.pet?.type] || '🐶',
      });
    };

    const isLastMission = currentIdx >= missions.length - 1;

    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-mint-200 via-sky-100 to-sun-100 flex items-center justify-center p-4">
        <Confetti show count={40} />
        <div className="relative z-10 w-full max-w-sm mx-auto my-auto animate-pop-in">
          <div className="bg-white/95 backdrop-blur-md rounded-4xl p-6 shadow-pop text-center border-2 border-white">
            <div className="text-6xl mb-2 animate-bounce-soft">{mission?.emoji}</div>
            
            {/* Dynamic Personalized Praise Headline */}
            <h2 className="text-2xl sm:text-3xl font-display font-black text-sun-600 drop-shadow-sm mb-1 tracking-wide">
              {currentPraise.headline}
            </h2>

            {/* Stars Earned Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shadow-sm mb-3">
              <span className="text-lg">⭐</span>
              <span className="font-display font-bold text-amber-700 text-sm">+{lastStars} Stars Earned!</span>
            </div>

            <div className="flex justify-center items-end gap-3 mb-3">
              <Companion emotion="celebrating" childName={profile.name} size={60} showDialogue={false} />
              <HeroCharacter avatar={profile.avatar} size={90} pose="celebrate" />
              <Pet pet={profile.pet} size={42} mood="celebrating" />
            </div>

            {/* Praise Subtext */}
            <div className="bg-mint-50 rounded-2xl p-3 mb-4">
              <p className="text-slate-700 font-display font-bold text-sm leading-snug">
                {currentPraise.subtext}
              </p>
            </div>

            {/* WhatsApp Image Photo Card Share Button */}
            <button
              onClick={handleShareMissionImage}
              className="btn-press w-full mb-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold rounded-2xl py-3.5 shadow-pop flex items-center justify-center gap-2 text-sm"
            >
              <span className="text-xl">📸</span> Share Image to WhatsApp Status
            </button>

            {/* Big Action Button: Next Mission */}
            <button
              onClick={handleContinueNext}
              className="btn-press w-full bg-gradient-to-r from-sun-400 to-tangerine-400 hover:from-sun-500 hover:to-tangerine-500 text-white font-display font-extrabold text-base rounded-2xl py-3.5 shadow-pop flex items-center justify-center gap-2"
            >
              {isLastMission ? 'Claim Final Badge! 🏆' : 'Next Mission! 🚀'}
            </button>

            <button
              onClick={() => { stop(); onNavigate('home'); }}
              className="btn-press mt-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Pause & Back to Home 🏠
            </button>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCK cinematic
  if (showUnlock) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'radial-gradient(circle at center, #fbbf24 0%, #7c3aed 100%)' }}>
        <Confetti show count={60} />
        <div className="text-center animate-pop-in">
          <div className="text-8xl mb-4 animate-bounce-soft">{adventure.rewardEmoji}</div>
          <h1 className="text-3xl font-display font-extrabold text-white drop-shadow-lg mb-2">
            BADGE UNLOCKED!
          </h1>
          <div className="text-xl font-display font-bold text-white/90 mb-4">{adventure.rewardBadge}</div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-3xl animate-twinkle" style={{ animationDelay: `${i * 0.1}s` }}>⭐</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // COMPLETE — Final celebration
  if (phase === 'complete') {
    const petEmojiMap: Record<string, string> = { puppy: '🐶', kitten: '🐱', bunny: '🐰', panda: '🐼', fox: '🦊', dino: '🦖', dragon: '🐉', unicorn: '🦄' };
    const handleShareAdventureImage = async () => {
      await shareAchievementAsImage({
        childName: profile.name,
        emoji: adventure.rewardEmoji,
        headline: `BADGE UNLOCKED! 🏆`,
        subtext: `Earned ${adventure.rewardBadge} Badge & helped ${adventure.storyCharacter}!`,
        stars: earnedStars,
        badgeName: adventure.rewardBadge,
        theme: adventure.theme,
        petEmoji: petEmojiMap[profile.pet?.type] || '🐶',
      });
    };

    return (
      <>
        <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #fbbf24 0%, #f9a8d4 50%, #c4b5fd 100%)' }}>
          <Confetti show count={50} />
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8 max-w-lg mx-auto">
            <div className="text-center animate-pop-in">
              <div className="text-7xl mb-3 animate-bounce-soft">{adventure.storyCharacterEmoji}</div>
              <h1 className="text-3xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg mb-1">
                {adventure.storyTitle} Complete!
              </h1>
              <p className="text-white/95 font-display font-bold text-base mb-4">{adventure.outro}</p>

              <div className="bg-white/95 backdrop-blur-md rounded-4xl p-5 shadow-pop max-w-sm mx-auto">
                <div className="flex justify-center items-end gap-3 mb-3">
                  <Companion emotion="celebrating" childName={profile.name} size={60} showDialogue={false} />
                  <HeroCharacter avatar={profile.avatar} size={90} pose="celebrate" />
                </div>
                <div className="flex justify-center gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-3xl">⭐</div>
                    <div className="font-display font-bold text-sun-600 text-xl">+{earnedStars}</div>
                    <div className="text-xs text-slate-400 font-semibold">Stars earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl">{adventure.rewardEmoji}</div>
                    <div className="font-display font-bold text-grape-600 text-sm mt-1">Badge!</div>
                    <div className="text-xs text-slate-400 font-semibold">{adventure.rewardBadge}</div>
                  </div>
                </div>

                <div className="bg-mint-50 rounded-2xl p-3 mb-3 text-left">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    🌟 <strong>Bravo, {profile.name}!</strong> You helped {adventure.storyCharacter} conquer all missions! Come back tomorrow for a new quest! 🌈
                  </p>
                </div>

                {/* Direct WhatsApp Status Image Photo Share */}
                <button
                  onClick={handleShareAdventureImage}
                  className="btn-press w-full mb-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold rounded-2xl py-3 shadow-soft flex items-center justify-center gap-2 text-sm"
                >
                  <span className="text-lg">📸</span> Share Image to WhatsApp Status
                </button>

                {/* Certificate & Showcase modal trigger */}
                <button
                  onClick={() => setShowShare(true)}
                  className="btn-press w-full mb-2 bg-gradient-to-r from-grape-400 to-sky-400 text-white font-display font-bold rounded-2xl py-2.5 text-xs shadow-soft"
                >
                  📜 Get Certificate & Download Link
                </button>

                <div className="flex gap-2">
                  <Button variant="success" size="md" fullWidth onClick={() => { stop(); onNavigate('home'); }}>
                    Back to Your World 🏠
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showShare && (() => {
          const reward = getShareableReward(adventure.rewardBadge);
          return reward ? (
            <ShareReward
              reward={reward}
              childName={profile.name}
              onClose={() => setShowShare(false)}
            />
          ) : null;
        })()}
      </>
    );
  }

  // MISSION — Active gameplay
  const mission = missions[currentIdx];
  if (!mission) return null;
  const progress = (currentIdx / missions.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 to-mint-100">
      <div className="relative z-10 min-h-screen px-4 py-4 max-w-lg mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => { stop(); onNavigate('home'); }}
            className="btn-press bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-soft text-lg"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Mission {currentIdx + 1} / {missions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-mint-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <StarCounter count={profile.stars} size="sm" />
        </div>

        {/* Story context for this mission */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 mb-3 flex items-center gap-3">
          <div className="text-3xl animate-float">{adventure.storyCharacterEmoji}</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-sun-500 uppercase">{mission.title}</div>
            <p className="text-sm text-slate-600">{mission.storyText}</p>
          </div>
        </div>

        {/* Pet companion */}
        <div className="flex justify-center mb-2">
          <Pet pet={profile.pet} size={36} mood={petMood} animate={false} />
        </div>

        {/* Activity */}
        <div key={currentIdx} className="animate-pop-in">
          {renderActivity(mission)}
        </div>

        {/* Mission dots */}
        <div className="flex justify-center gap-2 mt-4">
          {missions.map((m, i) => (
            <div
              key={m.id}
              className={`w-3 h-3 rounded-full transition-all ${m.completed ? 'bg-mint-400' : i === currentIdx ? 'bg-sky-400 scale-125' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
