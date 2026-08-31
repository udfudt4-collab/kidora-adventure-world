import { useState } from 'react';
import { StarCounter } from './StatBadges';
import { ParentSecurityGate } from './ParentSecurityGate';
import { BackpackModal } from './BackpackModal';
import { PassportModal } from './PassportModal';
import { EarnPremiumModal } from './EarnPremiumModal';
import { useApp } from '@/lib/store';
import { Menu, X, Compass, Gamepad2, BookOpen, Heart, Home as HomeIcon, ChevronDown, Sparkles, Gift } from 'lucide-react';
import type { Screen } from '@/lib/types';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navbar({ currentScreen, onNavigate }: NavbarProps) {
  const {
    profile,
    children: familyChildren,
    switchChild,
    backpackItems,
    passportStamps,
    premiumState,
    earnPremiumModalOpen,
    setEarnPremiumModalOpen,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showParentGate, setShowParentGate] = useState(false);
  const [showChildPicker, setShowChildPicker] = useState(false);
  const [showBackpack, setShowBackpack] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  const navLinks: { id: Screen; label: string; emoji: string; icon: any }[] = [
    { id: 'home', label: 'Home', emoji: '🏠', icon: HomeIcon },
    { id: 'play', label: 'Play', emoji: '🎮', icon: Gamepad2 },
    { id: 'learn', label: 'Learn', emoji: '📚', icon: BookOpen },
    { id: 'adventure', label: 'Adventure', emoji: '🗺️', icon: Compass },
    { id: 'challenges', label: 'Challenges', emoji: '⚔️', icon: Sparkles },
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

  const totalPassportStamps = Object.values(passportStamps).reduce((a, b) => a + b, 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs select-none">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 btn-press cursor-pointer group shrink-0"
            title="Kidora Adventure World Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-xl sm:text-2xl shadow-soft group-hover:scale-105 transition-transform">
              🦊
            </div>
            <div className="text-left">
              <span className="text-lg sm:text-xl font-black font-display tracking-tight text-slate-800 flex items-center gap-1">
                KIDORA <span className="text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">World</span>
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-black font-display transition-all flex items-center gap-1.5 cursor-pointer ${
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

          {/* Right Side HUD: Backpack, Passport, Stars & Multi-Child Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {profile && (
              <>
                {/* 🎒 Backpack Button (Visible on desktop/tablet) */}
                <button
                  type="button"
                  onClick={() => setShowBackpack(true)}
                  className="btn-press hidden sm:inline-flex p-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-sm items-center gap-1 shadow-xs cursor-pointer"
                  title="Open Adventure Backpack"
                >
                  <span>🎒</span>
                  <span className="text-xs font-black font-display">{backpackItems.length}</span>
                </button>

                {/* 🎟️ Passport Button (Visible on desktop/tablet) */}
                <button
                  type="button"
                  onClick={() => setShowPassport(true)}
                  className="btn-press hidden sm:inline-flex p-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-sm items-center gap-1 shadow-xs cursor-pointer"
                  title="Open Adventure Passport"
                >
                  <span>🎟️</span>
                  <span className="text-xs font-black font-display">{totalPassportStamps}</span>
                </button>

                {/* 👑 Premium Days Wallet Pill (Visible on desktop/tablet) */}
                <button
                  type="button"
                  onClick={() => setEarnPremiumModalOpen(true)}
                  className="btn-press hidden sm:inline-flex p-2 sm:px-3 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 hover:from-amber-400/30 hover:to-orange-400/30 border border-amber-300/60 text-amber-900 text-xs font-black font-display items-center gap-1 shadow-xs cursor-pointer"
                  title="Earn Premium Days & Invite Families"
                >
                  <span className="text-sm">👑</span>
                  <span className="font-black text-amber-900">{premiumState.daysRemaining}d</span>
                </button>

                {/* Stars Counter */}
                <div
                  onClick={() => handleNav('my-kidora')}
                  className="cursor-pointer shrink-0"
                  title="Your Stars & Badges"
                >
                  <StarCounter count={profile.stars} size="sm" />
                </div>

                {/* Child Switcher Button */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (familyChildren.length > 1) {
                        setShowChildPicker(!showChildPicker);
                      } else {
                        handleNav('my-kidora');
                      }
                    }}
                    className="btn-press flex items-center gap-1 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-black font-display text-sky-800 shadow-xs hover:border-sky-300 cursor-pointer"
                    title={familyChildren.length > 1 ? 'Switch child' : 'Open My Kidora Sanctuary'}
                  >
                    <span>{profile.gender === 'daughter' ? '👧' : profile.gender === 'son' ? '👦' : '🧒'}</span>
                    <span className="max-w-[60px] sm:max-w-none truncate">{profile.name}</span>
                    {familyChildren.length > 1 && <ChevronDown className="w-3 h-3 text-sky-600 shrink-0" />}
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
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
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
              className="md:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-pop-in">
            {/* Quick Mobile Wallet & Badges Bar */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowBackpack(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-press p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-0.5 cursor-pointer"
              >
                <div className="text-xl">🎒</div>
                <div className="text-[10px] font-black text-amber-900">Backpack</div>
                <div className="text-xs font-black text-amber-700">{backpackItems.length} items</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPassport(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-press p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-0.5 cursor-pointer"
              >
                <div className="text-xl">🎟️</div>
                <div className="text-[10px] font-black text-indigo-900">Passport</div>
                <div className="text-xs font-black text-indigo-700">{totalPassportStamps} stamps</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEarnPremiumModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-press p-2.5 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 text-center space-y-0.5 cursor-pointer"
              >
                <div className="text-xl">👑</div>
                <div className="text-[10px] font-black text-amber-900">Premium</div>
                <div className="text-xs font-black text-amber-800">{premiumState.daysRemaining} days</div>
              </button>
            </div>

            {/* Navigation links */}
            <div className="space-y-1.5">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full py-3 px-4 rounded-2xl text-sm font-black font-display text-left flex items-center justify-between transition-colors cursor-pointer ${
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
          </div>
        )}
      </header>

      {/* Backpack Modal */}
      {showBackpack && (
        <BackpackModal
          isOpen={showBackpack}
          onClose={() => setShowBackpack(false)}
          collectedItemIds={backpackItems}
        />
      )}

      {/* Passport Modal */}
      {showPassport && profile && (
        <PassportModal
          isOpen={showPassport}
          onClose={() => setShowPassport(false)}
          childName={profile.name}
          passportStamps={passportStamps}
        />
      )}

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

      {/* 🎁 Earn Premium & Referral Program Modal */}
      {earnPremiumModalOpen && (
        <EarnPremiumModal
          isOpen={earnPremiumModalOpen}
          onClose={() => setEarnPremiumModalOpen(false)}
        />
      )}
    </>
  );
}
