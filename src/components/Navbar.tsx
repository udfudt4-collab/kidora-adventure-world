import { useState } from 'react';
import { StarCounter } from './StatBadges';
import { ParentSecurityGate } from './ParentSecurityGate';
import { useApp } from '@/lib/store';
import { Menu, X, Compass, Gamepad2, BookOpen, Heart, Home as HomeIcon, ChevronDown } from 'lucide-react';
import type { Screen } from '@/lib/types';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navbar({ currentScreen, onNavigate }: NavbarProps) {
  const { profile, children: familyChildren, switchChild } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showParentGate, setShowParentGate] = useState(false);
  const [showChildPicker, setShowChildPicker] = useState(false);

  const navLinks: { id: Screen; label: string; emoji: string; icon: any }[] = [
    { id: 'home', label: 'Home', emoji: '🏠', icon: HomeIcon },
    { id: 'play', label: 'Play', emoji: '🎮', icon: Gamepad2 },
    { id: 'learn', label: 'Learn', emoji: '📚', icon: BookOpen },
    { id: 'adventure', label: 'Adventure', emoji: '🗺️', icon: Compass },
    { id: 'parents', label: 'Parents', emoji: '👨‍👩‍👧', icon: Heart },
  ];

  const handleNav = (screen: Screen) => {
    if (screen === 'parents') {
      setShowParentGate(true);
      setMobileMenuOpen(false);
      return;
    }
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 btn-press cursor-pointer group"
            title="Kidora Adventure World Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-2xl shadow-soft group-hover:scale-105 transition-transform">
              🦊
            </div>
            <div className="text-left">
              <span className="text-xl font-black font-display tracking-tight text-slate-800 flex items-center gap-1">
                KIDORA <span className="text-amber-500 text-xs font-bold uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">World</span>
              </span>
              <p className="text-[10px] font-bold text-slate-400 leading-none hidden sm:block">
                Learn • Play • Explore
              </p>
            </div>
          </button>

          {/* Desktop Main Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((item) => {
              const isActive =
                currentScreen === item.id ||
                (item.id === 'parents' && ['parent', 'parents', 'about', 'privacy', 'safety', 'terms', 'contact', 'parent-guide'].includes(currentScreen)) ||
                (item.id === 'adventure' && ['adventure', 'world'].includes(currentScreen));

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-white shadow-soft scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side HUD: Stars & Multi-Child Switcher */}
          <div className="flex items-center gap-2.5">
            {profile && (
              <>
                <div
                  onClick={() => handleNav('my-kidora')}
                  className="cursor-pointer"
                  title="Your Stars & Badges"
                >
                  <StarCounter count={profile.stars} size="sm" />
                </div>

                {/* Child Switcher Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (familyChildren.length > 1) {
                        setShowChildPicker(!showChildPicker);
                      } else {
                        handleNav('my-kidora');
                      }
                    }}
                    className="btn-press flex items-center gap-1.5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 px-3 py-1.5 rounded-2xl text-xs font-black font-display text-sky-800 shadow-xs hover:border-sky-300 cursor-pointer"
                    title={familyChildren.length > 1 ? 'Switch child' : 'Open My Kidora Sanctuary'}
                  >
                    <span>{profile.gender === 'daughter' ? '👧' : profile.gender === 'son' ? '👦' : '🧒'}</span>
                    <span>{profile.name}</span>
                    {familyChildren.length > 1 && <ChevronDown className="w-3 h-3 text-sky-600" />}
                  </button>

                  {/* Multi-child dropdown */}
                  {showChildPicker && familyChildren.length > 1 && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-pop border border-slate-200 p-2 space-y-1 z-50 animate-pop-in">
                      <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">
                        Switch Explorer
                      </div>
                      {familyChildren.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            switchChild(c.id);
                            setShowChildPicker(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                            c.id === profile.id
                              ? 'bg-sky-50 text-sky-700'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{c.gender === 'daughter' ? '👧' : '👦'}</span>
                            <span>{c.name}</span>
                          </div>
                          {c.id === profile.id && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 animate-pop-in">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full py-3 px-4 rounded-2xl text-sm font-black font-display text-left flex items-center justify-between transition-colors ${
                  currentScreen === item.id
                    ? 'bg-amber-400 text-white shadow-soft'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs opacity-70">→</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Parent Security PIN Gate Modal */}
      {showParentGate && (
        <ParentSecurityGate
          onSuccess={() => {
            setShowParentGate(false);
            onNavigate('parent');
          }}
          onCancel={() => setShowParentGate(false)}
        />
      )}
    </>
  );
}

