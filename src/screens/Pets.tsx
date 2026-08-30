import { useState } from 'react';
import { Button } from '@/components/Button';
import { Pet } from '@/components/Pet';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useApp } from '@/lib/store';
import { petOptions, petNames } from '@/lib/avatar';
import type { Screen, PetConfig } from '@/lib/types';

interface PetsProps {
  onNavigate: (screen: Screen) => void;
}

export function Pets({ onNavigate }: PetsProps) {
  const { profile, setPet } = useApp();
  const [editing, setEditing] = useState(false);
  const [selectedType, setSelectedType] = useState(profile?.pet.type ?? 'puppy');
  const [selectedName, setSelectedName] = useState(profile?.pet.name ?? 'Buddy');

  if (!profile) return null;

  const handleSave = async () => {
    const opt = petOptions.find(p => p.type === selectedType);
    await setPet({
      type: selectedType,
      name: selectedName,
      color: opt?.colors[0] ?? '#D4A574',
    } as PetConfig);
    setEditing(false);
  };

  return (
    <AnimatedBackground variant="sunset">
      <div className="min-h-screen px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/80 rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg">
            My Pet 🐾
          </h1>
        </div>

        {/* Pet display */}
        <div className="bg-white rounded-4xl p-6 shadow-pop mb-4 text-center">
          <div className="flex justify-center mb-4">
            <Pet pet={profile.pet} size={120} mood="playing" />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-700">{profile.pet.name}</h2>
          <p className="text-sm text-slate-400 capitalize">{profile.pet.type}</p>

          {/* Mood interactions */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button className="btn-press bg-sun-50 rounded-2xl py-3 text-2xl">🍎</button>
            <button className="btn-press bg-sky-50 rounded-2xl py-3 text-2xl">🎾</button>
            <button className="btn-press bg-grape-50 rounded-2xl py-3 text-2xl">💤</button>
            <button className="btn-press bg-berry-50 rounded-2xl py-3 text-2xl">❤️</button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Feed, play, rest, and love your pet!</p>
        </div>

        {!editing ? (
          <Button variant="primary" size="lg" fullWidth onClick={() => setEditing(true)}>
            Change Pet 🔄
          </Button>
        ) : (
          <div className="bg-white rounded-4xl p-4 shadow-pop animate-pop-in">
            <h3 className="text-lg font-display font-bold text-slate-700 mb-3">Pick a new pet!</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {petOptions.map((p) => (
                <button
                  key={p.type}
                  onClick={() => setSelectedType(p.type)}
                  className={`btn-press rounded-2xl py-3 flex flex-col items-center gap-1 ${selectedType === p.type ? 'bg-sky-100 scale-110 shadow-pop' : 'bg-slate-50'}`}
                >
                  <span className="text-3xl">{p.emoji}</span>
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase">Name</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {petNames.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedName(n)}
                    className={`btn-press px-3 py-1.5 rounded-xl text-sm font-bold ${selectedName === n ? 'bg-tangerine-400 text-white' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="md" fullWidth onClick={() => setEditing(false)}>Cancel</Button>
              <Button variant="success" size="md" fullWidth onClick={handleSave}>Save! ✅</Button>
            </div>
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
}
