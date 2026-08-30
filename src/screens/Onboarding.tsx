import { useState } from 'react';
import { Button } from '@/components/Button';
import { HeroCharacter } from '@/components/HeroCharacter';
import { Companion } from '@/components/Companion';
import { Pet } from '@/components/Pet';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useApp } from '@/lib/store';
import { defaultAvatar } from '@/lib/avatar';
import {
  skinTones, hairColors, outfitColors, hatOptions, accessoryOptions, hairStyles,
  petOptions, petNames,
} from '@/lib/avatar';
import type { AvatarConfig, PetConfig } from '@/lib/types';

type Step = 'welcome' | 'name' | 'age' | 'avatar' | 'pet' | 'ready';

export function Onboarding() {
  const { saveProfile } = useApp();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [age, setAge] = useState(6);
  const [avatar, setAvatar] = useState<AvatarConfig>(defaultAvatar);
  const [pet, setPet] = useState<PetConfig>({ type: 'puppy', name: 'Buddy', color: '#D4A574' });
  const [petName, setPetName] = useState('Buddy');

  const handleFinish = async () => {
    await saveProfile({ name: name || 'Explorer', age, avatar, pet: { ...pet, name: petName || 'Buddy' } });
  };

  return (
    <AnimatedBackground variant="day">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {step === 'welcome' && (
          <div className="text-center max-w-md animate-pop-in">
            <div className="text-7xl mb-4 animate-float">🌈</div>
            <h1 className="text-4xl font-display font-extrabold text-white text-stroke-white mb-2 drop-shadow-lg">
              Adventure World
            </h1>
            <p className="text-lg text-white/90 font-body font-semibold mb-8 drop-shadow">
              Play, Learn, Create, Explore!
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <div className="text-4xl animate-float" style={{ animationDelay: '0s' }}>🚀</div>
              <div className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🦖</div>
              <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🎨</div>
              <div className="text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🌊</div>
            </div>
            <Button variant="sunny" size="xl" fullWidth onClick={() => setStep('name')}>
              Start Your Adventure! ✨
            </Button>
          </div>
        )}

        {step === 'name' && (
          <div className="bg-white rounded-4xl shadow-pop p-8 max-w-md w-full animate-pop-in">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">👋</div>
              <h2 className="text-2xl font-display font-bold text-slate-700">What's your name?</h2>
              <p className="text-sm text-slate-500 mt-1">This is your adventure name!</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name..."
              maxLength={12}
              className="w-full text-center text-xl font-display font-bold border-3 border-slate-200 rounded-2xl py-4 px-4 focus:border-sky-400 focus:outline-none mb-6"
              autoFocus
            />
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep('age')} disabled={!name.trim()}>
              Next! →
            </Button>
          </div>
        )}

        {step === 'age' && (
          <div className="bg-white rounded-4xl shadow-pop p-8 max-w-md w-full animate-pop-in">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎂</div>
              <h2 className="text-2xl font-display font-bold text-slate-700">How old are you?</h2>
              <p className="text-sm text-slate-500 mt-1">We'll pick the right adventures for you!</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  className={`btn-press font-display font-bold text-2xl rounded-2xl py-5 transition-all ${
                    age === a
                      ? 'bg-sky-400 text-white shadow-pop scale-110'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep('avatar')}>
              Next! →
            </Button>
          </div>
        )}

        {step === 'avatar' && (
          <div className="bg-white rounded-4xl shadow-pop p-6 max-w-lg w-full animate-pop-in max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-display font-bold text-slate-700">Create your hero character! 🎭</h2>
              <p className="text-xs text-slate-400">You are the hero of Kidora!</p>
            </div>
            <div className="flex justify-center mb-4">
              <HeroCharacter avatar={avatar} size={135} pose="idle" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Skin</label>
                <div className="flex gap-2 mt-1">
                  {skinTones.map((s) => (
                    <button key={s} onClick={() => setAvatar({ ...avatar, skin: s })}
                      className={`btn-press rounded-full w-9 h-9 border-3 ${avatar.skin === s ? 'border-sky-400 scale-110' : 'border-white'}`}
                      style={{ background: s }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Hair Style</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {hairStyles.map((h) => (
                    <button key={h} onClick={() => setAvatar({ ...avatar, hair: h })}
                      className={`btn-press px-3 py-1.5 rounded-xl text-sm font-bold capitalize ${avatar.hair === h ? 'bg-sky-400 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Hair Color</label>
                <div className="flex gap-2 mt-1">
                  {hairColors.map((c) => (
                    <button key={c} onClick={() => setAvatar({ ...avatar, hairColor: c })}
                      className={`btn-press rounded-full w-8 h-8 border-3 ${avatar.hairColor === c ? 'border-sky-400 scale-110' : 'border-white'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Outfit</label>
                <div className="flex gap-2 mt-1">
                  {outfitColors.map((c) => (
                    <button key={c} onClick={() => setAvatar({ ...avatar, outfit: c })}
                      className={`btn-press rounded-full w-8 h-8 border-3 ${avatar.outfit === c ? 'border-sky-400 scale-110' : 'border-white'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Hat</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {hatOptions.map((h) => (
                    <button key={h} onClick={() => setAvatar({ ...avatar, hat: h })}
                      className={`btn-press px-3 py-1.5 rounded-xl text-sm font-bold capitalize ${avatar.hat === h ? 'bg-grape-400 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {h === 'none' ? 'No hat' : h}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Accessory</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {accessoryOptions.map((a) => (
                    <button key={a} onClick={() => setAvatar({ ...avatar, accessory: a })}
                      className={`btn-press px-3 py-1.5 rounded-xl text-sm font-bold capitalize ${avatar.accessory === a ? 'bg-mint-400 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {a === 'none' ? 'None' : a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep('pet')} className="mt-5">
              Next! →
            </Button>
          </div>
        )}

        {step === 'pet' && (
          <div className="bg-white rounded-4xl shadow-pop p-6 max-w-md w-full animate-pop-in">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-display font-bold text-slate-700">Choose your pet! 🐾</h2>
              <p className="text-sm text-slate-500 mt-1">Your adventure buddy!</p>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {petOptions.map((p) => (
                <button key={p.type} onClick={() => setPet({ ...pet, type: p.type, color: p.colors[0] ?? '#D4A574' })}
                  className={`btn-press rounded-2xl py-3 flex flex-col items-center gap-1 transition-all ${
                    pet.type === p.type ? 'bg-sky-100 scale-110 shadow-pop' : 'bg-slate-50'
                  }`}>
                  <span className="text-3xl">{p.emoji}</span>
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase">Pet Name</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {petNames.map((n) => (
                  <button key={n} onClick={() => setPetName(n)}
                    className={`btn-press px-3 py-1.5 rounded-xl text-sm font-bold ${petName === n ? 'bg-tangerine-400 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <Pet pet={{ ...pet, name: petName }} size={80} mood="playing" />
            </div>
            <Button variant="success" size="lg" fullWidth onClick={() => setStep('ready')}>
              Next! →
            </Button>
          </div>
        )}

        {step === 'ready' && (
          <div className="text-center max-w-md animate-pop-in">
            <div className="bg-white rounded-4xl shadow-pop p-8">
              <div className="flex justify-center items-end gap-3 mb-4">
                <Companion emotion="celebrating" childName={name} size={65} showDialogue={false} />
                <HeroCharacter avatar={avatar} size={115} name={name} showNameTag={true} pose="celebrate" />
                <Pet pet={{ ...pet, name: petName }} size={55} mood="celebrating" animate={false} />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-700 mb-2">
                Welcome, {name}! 🎉
              </h2>
              <p className="text-slate-500 mb-6 text-sm">
                Your living world is ready! Kido and {petName} are excited to explore with you.
              </p>
              <Button variant="sunny" size="xl" fullWidth onClick={handleFinish}>
                Enter Adventure World! 🚀
              </Button>
            </div>
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
}
