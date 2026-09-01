import type { Screen } from '@/lib/types';

interface FooterProps {
  onNavigate: (screen: Screen) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-16 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-2xl">
                🦊
              </div>
              <span className="text-xl font-black font-display text-white tracking-wide">
                KIDORA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-body">
              An exciting, safe, and creative world of games, puzzles, and learning adventures designed for curious young minds.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-bold">
              <span>🛡️ Child Safe & COPPA Compliant</span>
            </div>
          </div>

          {/* Column 2: Explore & Play */}
          <div>
            <h4 className="text-xs font-black font-display uppercase tracking-wider text-slate-100 mb-3">
              Explore Worlds
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('play')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🎮</span> Play Educational Games
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('learn')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>📚</span> Learning Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('adventure')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🗺️</span> Daily Story Adventures
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('create')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🎨</span> Creative Island Art Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('my-kidora')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🌱</span> My Kidora Sanctuary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Kidora Characters Squad */}
          <div>
            <h4 className="text-xs font-black font-display uppercase tracking-wider text-slate-100 mb-3">
              Kidora Squad
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-base">🦊</span>
                <span><strong>Kido</strong> — Trail Explorer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">🎨</span>
                <span><strong>Ria</strong> — Creative Artist</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">🧩</span>
                <span><strong>Momo</strong> — Puzzle Master</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">🧮</span>
                <span><strong>Tiko</strong> — Math Champion</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">🔬</span>
                <span><strong>Lumi</strong> — Science Inquirer</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Parents & Legal (AdSense Mandated) */}
          <div>
            <h4 className="text-xs font-black font-display uppercase tracking-wider text-slate-100 mb-3">
              Parents & Safety
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Kidora & Educational Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('parent-guide')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Parent Guide & Screen Time
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('safety')}
                  className="hover:text-amber-400 transition-colors text-emerald-400 font-bold"
                >
                  Children's Privacy & Safety
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 Kidora Adventure World. All rights reserved.</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 font-mono text-[10px] font-bold border border-slate-700">
              v1.9.0
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button type="button" onClick={() => onNavigate('privacy')} className="hover:underline">
              Privacy Policy
            </button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('terms')} className="hover:underline">
              Terms of Use
            </button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('safety')} className="hover:underline">
              Child Safety
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
