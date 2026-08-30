import { useState } from 'react';
import { initialBackpackCatalog, getBackpackItemById } from '@/lib/backpack';
import type { BackpackItem } from '@/lib/types';
import { X, Sparkles, Compass, Award, Shield, Eye } from 'lucide-react';

interface BackpackModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedItemIds: string[];
}

export function BackpackModal({ isOpen, onClose, collectedItemIds }: BackpackModalProps) {
  const [selectedItem, setSelectedItem] = useState<BackpackItem | null>(null);

  if (!isOpen) return null;

  const allCatalogIds = Object.keys(initialBackpackCatalog);

  const categoryColor: Record<string, string> = {
    tool: 'bg-blue-100 text-blue-800 border-blue-200',
    relic: 'bg-amber-100 text-amber-800 border-amber-200',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
    nature: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cosmic: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-4xl shadow-2xl border-4 border-amber-400/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Leather Backpack Header Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-400/30 rounded-2xl flex items-center justify-center text-2xl border-2 border-amber-300">
              🎒
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight flex items-center gap-1.5">
                Adventure Backpack
              </h2>
              <p className="text-xs font-bold text-amber-200">
                {collectedItemIds.length} of {allCatalogIds.length} Collectibles Found
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-press w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Backpack Contents Grid */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="bg-amber-100/60 rounded-2xl p-3.5 border border-amber-200 flex items-center gap-2.5 text-xs font-bold text-amber-900">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0 animate-pulse-soft" />
            <span>Collect relics and magical artifacts by solving daily mysteries, discovering realms, and mastering missions!</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allCatalogIds.map((id) => {
              const isCollected = collectedItemIds.includes(id);
              const item = isCollected
                ? getBackpackItemById(id)
                : {
                    ...initialBackpackCatalog[id],
                    dateFound: '',
                  };

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => isCollected && setSelectedItem(item as BackpackItem)}
                  disabled={!isCollected}
                  className={`relative p-3.5 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    isCollected
                      ? 'bg-white border-2 border-amber-300 shadow-pop hover:scale-105 hover:border-amber-500 cursor-pointer'
                      : 'bg-slate-100/80 border-2 border-dashed border-slate-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="text-4xl mb-2 filter drop-shadow-sm">
                    {isCollected ? item.emoji : '❓'}
                  </div>
                  <div className="text-xs font-black font-display text-slate-800 line-clamp-1">
                    {isCollected ? item.title : 'Undiscovered'}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 capitalize mt-0.5">
                    {isCollected ? item.category : 'Mystery Item'}
                  </div>
                  {isCollected && (
                    <div className="absolute top-2 right-2 text-xs">✨</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Item Detail Inspector Popup */}
        {selectedItem && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-20">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300 space-y-4 animate-pop-in">
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center text-5xl shadow-inner border border-amber-200">
                {selectedItem.emoji}
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${categoryColor[selectedItem.category] || 'bg-slate-100'}`}>
                  {selectedItem.category}
                </span>
                <h3 className="text-lg font-black font-display text-slate-800 mt-1.5">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 text-left space-y-1 text-xs border border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span className="font-bold">Origin Realm:</span>
                  <span className="font-semibold text-slate-800">{selectedItem.worldOrigin}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span className="font-bold">Discovered:</span>
                  <span className="font-semibold text-slate-800">{selectedItem.dateFound || 'Active'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="btn-press w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black font-display text-sm rounded-2xl shadow-soft cursor-pointer"
              >
                Back to Backpack
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="bg-amber-100/80 px-6 py-3 border-t border-amber-200 flex justify-between items-center text-xs font-bold text-amber-900">
          <span>✨ Keep exploring to fill your bag!</span>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-800 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
