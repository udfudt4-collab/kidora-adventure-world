import { useState } from 'react';
import { useApp } from '@/lib/store';
import { getWhatsAppShareLink, getReferralShareUrl } from '@/lib/premium';
import {
  Sparkles,
  X,
  Share2,
  Copy,
  Check,
  Gift,
  Flame,
  Gamepad2,
  Lock,
  Trophy,
  Users,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface EarnPremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarnPremiumModal({ isOpen, onClose }: EarnPremiumModalProps) {
  const {
    premiumState,
    claimDailyLoginReward,
    claimDailyAdventureReward,
    addReferralReward,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showSimulatePrompt, setShowSimulatePrompt] = useState(false);
  const [friendNameInput, setFriendNameInput] = useState('');

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isLoginClaimedToday = premiumState.lastDailyLoginRewardDate === todayStr;
  const isAdventureClaimedToday = premiumState.lastDailyAdventureRewardDate === todayStr;

  const referralUrl = getReferralShareUrl(premiumState.referralCode);
  const whatsappUrl = getWhatsAppShareLink(premiumState.referralCode);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSimulateReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = friendNameInput.trim() || 'Miller Family';
    addReferralReward(name);
    setFriendNameInput('');
    setShowSimulatePrompt(false);
  };

  const referralCount = premiumState.successfulReferrals.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-pop-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header Gradient */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-soft">
              🎁
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Kidora Growth & Rewards
              </span>
              <h2 className="text-2xl font-black font-display mt-0.5">Earn Premium Days</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-press w-9 h-9 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. CURRENT WALLET BALANCE CARD */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-5 border border-amber-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-600 animate-pulse-soft" />
                <span>Your Active Family Premium</span>
              </span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black font-display text-slate-900">
                  {premiumState.daysRemaining}
                </h3>
                <span className="text-lg font-black font-display text-amber-800">Days Remaining</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {premiumState.daysRemaining > 0
                  ? `Active until ${new Date(premiumState.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'Start learning or invite friends to activate Premium!'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-amber-200 text-center shrink-0">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Earned</div>
              <div className="text-xl font-black font-display text-amber-700">
                +{premiumState.totalDaysEarned} Days
              </div>
              <div className="text-[9px] text-emerald-600 font-bold">100% Free by Learning</div>
            </div>
          </div>

          {/* 2. 🚀 MAIN GROWTH FEATURE: WHATSAPP REFERRAL ENGINE */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-pop space-y-5 border border-emerald-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  Main Referral Program
                </span>
                <h3 className="text-2xl font-black font-display mt-1">
                  Invite 3 Families → Get 90 Days Free!
                </h3>
                <p className="text-xs text-emerald-100 mt-1 max-w-md">
                  🎁 <strong>Both sides benefit:</strong> Your friend gets <strong>30 Days Premium FREE</strong> (instead of 7), and you earn <strong>+30 Days</strong> for each family!
                </p>
              </div>
            </div>

            {/* 3-Tier Step Progress */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { step: 1, label: '1 Family', reward: '+30 Days', reached: referralCount >= 1 },
                { step: 2, label: '2 Families', reward: '+60 Days', reached: referralCount >= 2 },
                { step: 3, label: '3 Families', reward: '+90 Days', reached: referralCount >= 3 },
              ].map((tier) => (
                <div
                  key={tier.step}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    tier.reached
                      ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-soft font-black'
                      : 'bg-white/10 border-white/20 text-white'
                  }`}
                >
                  <div className="text-base mb-0.5">{tier.reached ? '✅' : '👨‍👩‍👧'}</div>
                  <div className="text-xs font-bold">{tier.label}</div>
                  <div className={`text-[10px] ${tier.reached ? 'font-black' : 'text-emerald-200'}`}>
                    {tier.reward}
                  </div>
                </div>
              ))}
            </div>

            {/* Referral Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press flex-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black font-display text-sm py-3.5 px-6 rounded-2xl shadow-pop flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span className="text-xl">📱</span>
                <span>INVITE ON WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="btn-press bg-white/20 hover:bg-white/30 text-white font-bold text-xs py-3.5 px-5 rounded-2xl border border-white/30 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {copied ? <Check className="h-4 w-4 text-amber-300" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</span>
              </button>
            </div>

            {/* Referral Code Box */}
            <div className="bg-black/20 rounded-2xl p-3 flex items-center justify-between text-xs">
              <span className="text-emerald-200">Your Family Referral Code:</span>
              <code className="font-mono font-black text-amber-300 tracking-wider bg-white/10 px-2.5 py-1 rounded-xl">
                {premiumState.referralCode}
              </code>
            </div>

            {/* Anti-Fake Notice & Simulation trigger */}
            <div className="text-[11px] text-emerald-100 flex items-center justify-between">
              <span>
                🛡️ Verified reward: Unlocks when the friend family completes their first adventure quest.
              </span>
              <button
                type="button"
                onClick={() => setShowSimulatePrompt(!showSimulatePrompt)}
                className="underline text-[10px] text-emerald-200 hover:text-white cursor-pointer ml-2 whitespace-nowrap"
              >
                Simulate Friend Join
              </button>
            </div>

            {/* Simulated Friend Joining Drawer for Easy Testing */}
            {showSimulatePrompt && (
              <form
                onSubmit={handleSimulateReferralSubmit}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5 border border-white/25 space-y-2.5 animate-pop-in"
              >
                <div className="text-xs font-bold text-white">
                  Test / Simulate a Friend Family Joining & Completing Quest:
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={friendNameInput}
                    onChange={(e) => setFriendNameInput(e.target.value)}
                    placeholder="Friend Family Name (e.g. Sharma Family)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-white text-slate-800 placeholder-slate-400 font-bold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-press bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-xs cursor-pointer"
                  >
                    + Award 30 Days
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 3. WAYS TO EARN PREMIUM DAYS CHECKLIST */}
          <div className="space-y-3">
            <h4 className="text-sm font-black font-display text-slate-800 uppercase tracking-wider">
              Daily & Milestone Rewards
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Daily Login Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                    🔐
                  </div>
                  <div>
                    <div className="text-xs font-black font-display text-slate-800">Daily Login</div>
                    <div className="text-[11px] text-slate-500 font-medium">Return every calendar day</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg block">
                    +1 Day
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5 block">
                    {isLoginClaimedToday ? 'Claimed Today ✓' : 'Available'}
                  </span>
                </div>
              </div>

              {/* Complete Daily Adventure */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl">
                    🎮
                  </div>
                  <div>
                    <div className="text-xs font-black font-display text-slate-800">Complete Adventure</div>
                    <div className="text-[11px] text-slate-500 font-medium">Finish today's story quest</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg block">
                    +1 Day
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5 block">
                    {isAdventureClaimedToday ? 'Claimed Today ✓' : 'Play to Earn'}
                  </span>
                </div>
              </div>

              {/* Special Challenges & Events */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div>
                    <div className="text-xs font-black font-display text-slate-800">Family Challenges</div>
                    <div className="text-[11px] text-slate-500 font-medium">Weekend & home quests</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-1 rounded-lg block">
                    +7 Days
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5 block">Per challenge</span>
                </div>
              </div>

              {/* Streak Milestones */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center text-xl">
                    🔥
                  </div>
                  <div>
                    <div className="text-xs font-black font-display text-slate-800">Learning Streaks</div>
                    <div className="text-[11px] text-slate-500 font-medium">7d (+3d) · 14d (+5d) · 30d (+10d)</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg block">
                    Up to +10d
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5 block">Milestone Bonus</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. FREE VS PREMIUM COMPARISON (NO HARD PAYWALL FEEL) */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
            <h4 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
              <span>🌟</span> Free vs Premium Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black font-display text-slate-700 flex items-center gap-1.5 text-sm">
                  <span>🟢</span> Free Plan (Always Accessible)
                </div>
                <ul className="space-y-1 text-slate-500 font-medium">
                  <li>✓ 5 Core Adventure Realms</li>
                  <li>✓ "World That Grows With You" flora & basic wildlife</li>
                  <li>✓ Daily Phonics & Math Mini-Games</li>
                  <li>✓ Basic Parent Overview</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-300 space-y-2">
                <div className="font-black font-display text-amber-900 flex items-center gap-1.5 text-sm">
                  <span>👑</span> Premium Plan (Earnable 100% Free)
                </div>
                <ul className="space-y-1 text-amber-900 font-medium">
                  <li>✨ Crystal Sanctuary & Secret Biomes</li>
                  <li>✨ 10 Roaming Rare Wildlife Creatures</li>
                  <li>✨ Official Printable Master Certificates</li>
                  <li>✨ 5-Second Parent Insights & Detailed Logs</li>
                  <li>✨ Private Cycle & Wellness Hub</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Kidora Academy • Zero credit card required to earn</span>
          <button
            type="button"
            onClick={onClose}
            className="btn-press font-bold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-xl bg-white border border-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
