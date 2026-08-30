import { useState } from 'react';
import type { PassportWorld } from '@/lib/types';
import { X, Award, CheckCircle, Sparkles, Download, Share2 } from 'lucide-react';
import { Confetti } from './Confetti';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  passportStamps: Record<string, number>;
}

export function PassportModal({ isOpen, onClose, childName, passportStamps }: PassportModalProps) {
  const [selectedWorldCert, setSelectedWorldCert] = useState<PassportWorld | null>(null);

  if (!isOpen) return null;

  const worlds: PassportWorld[] = [
    {
      id: 'words',
      name: 'Word Forest',
      emoji: '🌳',
      theme: 'from-emerald-400 to-green-600',
      stampsCount: passportStamps['words'] || 0,
      totalStampsNeeded: 5,
      certificateTitle: 'Master Scribe & Phonics Pioneer',
      unlocked: true,
    },
    {
      id: 'math',
      name: 'Math Mountain',
      emoji: '🏔️',
      theme: 'from-sky-400 to-blue-600',
      stampsCount: passportStamps['math'] || 0,
      totalStampsNeeded: 5,
      certificateTitle: 'Crystal Mathematician & Logic Sage',
      unlocked: true,
    },
    {
      id: 'creative',
      name: 'Creative Island',
      emoji: '🏝️',
      theme: 'from-pink-400 to-rose-600',
      stampsCount: passportStamps['creative'] || 0,
      totalStampsNeeded: 5,
      certificateTitle: 'Living Artist & World Sculptor',
      unlocked: true,
    },
    {
      id: 'puzzle',
      name: 'Puzzle Castle',
      emoji: '🏰',
      theme: 'from-purple-400 to-indigo-600',
      stampsCount: passportStamps['puzzle'] || 0,
      totalStampsNeeded: 5,
      certificateTitle: 'Grand Architect of Mind & Memory',
      unlocked: true,
    },
    {
      id: 'science',
      name: 'Science Space',
      emoji: '🚀',
      theme: 'from-teal-400 to-cyan-600',
      stampsCount: passportStamps['science'] || 0,
      totalStampsNeeded: 5,
      certificateTitle: 'Cosmic Astronomer & Nature Sage',
      unlocked: true,
    },
  ];

  const totalEarnedStamps = Object.values(passportStamps).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 rounded-4xl shadow-2xl border-4 border-amber-400/90 overflow-hidden flex flex-col max-h-[90vh] text-white">
        {/* Passport Cover Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 py-4 flex items-center justify-between text-slate-900 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/40 rounded-2xl flex items-center justify-center text-2xl border-2 border-amber-600/30">
              🎟️
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight flex items-center gap-1.5">
                Kidora Adventure Passport
              </h2>
              <p className="text-xs font-bold text-amber-950">
                Official Explorer: <span className="underline">{childName}</span> • {totalEarnedStamps} Total Stamps
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-press w-9 h-9 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-900 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Passport Pages / World Grid */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="bg-white/10 rounded-2xl p-3.5 border border-amber-300/30 flex items-center gap-2.5 text-xs font-bold text-amber-200">
            <Sparkles className="h-4 w-4 text-amber-300 shrink-0 animate-pulse-soft" />
            <span>Complete story adventures and learning quests in each realm to earn official stamps and unlock Master Certificates!</span>
          </div>

          <div className="space-y-3">
            {worlds.map((world) => {
              const count = Math.min(world.totalStampsNeeded, world.stampsCount);
              const isCompleted = count >= world.totalStampsNeeded;

              return (
                <div
                  key={world.id}
                  className="bg-slate-800/80 rounded-3xl p-4 border-2 border-slate-700 hover:border-amber-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${world.theme} flex items-center justify-center text-3xl shadow-sm`}>
                      {world.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-black font-display text-white flex items-center gap-1.5">
                        {world.name}
                        {isCompleted && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <CheckCircle className="h-3 w-3 inline" /> Mastered
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {count} of {world.totalStampsNeeded} Stamps Collected
                      </p>

                      {/* Visual Stamp Circles */}
                      <div className="flex items-center gap-1.5 mt-2">
                        {Array.from({ length: world.totalStampsNeeded }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all ${
                              i < count
                                ? 'bg-amber-400 border-amber-300 text-slate-950 font-black shadow-xs'
                                : 'bg-slate-900 border-dashed border-slate-600 text-slate-600'
                            }`}
                          >
                            {i < count ? '⭐' : '○'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isCompleted ? (
                    <button
                      type="button"
                      onClick={() => setSelectedWorldCert(world)}
                      className="btn-press px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 text-xs font-black font-display rounded-2xl shadow-soft flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Award className="h-4 w-4" />
                      View Certificate
                    </button>
                  ) : (
                    <div className="text-[11px] font-bold text-amber-300/80 italic self-end sm:self-center">
                      {world.totalStampsNeeded - count} stamps to Certificate
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Modal Viewer */}
        {selectedWorldCert && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-30">
            <Confetti show={true} />
            <div className="bg-amber-50 text-slate-900 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 space-y-4 animate-pop-in">
              <div className="text-4xl">📜</div>
              <div className="border-b-2 border-dashed border-amber-300 pb-3">
                <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                  Official Kidora Adventure World Certificate
                </span>
                <h3 className="text-xl font-black font-display text-slate-900 mt-1">
                  {selectedWorldCert.certificateTitle}
                </h3>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-600 font-medium">This hereby honors</p>
                <p className="text-lg font-black font-display text-amber-600">{childName}</p>
                <p className="text-slate-600 font-medium leading-relaxed">
                  For completing all journeys and mastering the secrets of <strong>{selectedWorldCert.name}</strong>!
                </p>
              </div>

              <div className="bg-amber-100 rounded-2xl p-2.5 text-center text-xs font-bold text-amber-900 flex items-center justify-center gap-2">
                <span className="text-xl">{selectedWorldCert.emoji}</span>
                <span>Stamp Seal Verified • 5/5 Stars</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedWorldCert(null)}
                className="btn-press w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black font-display text-xs rounded-2xl shadow-soft cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs font-bold text-slate-400">
          <span>Keep exploring realms to complete your passport!</span>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
