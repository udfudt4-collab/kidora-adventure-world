import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/Button';
import { registerModalBackHandler } from '@/lib/navigation';
import { type ShareableReward, APP_PUBLIC_URL } from '@/lib/rewards';
import { shareAchievementAsImage } from '@/lib/imageCardGenerator';

interface ShareRewardProps {
  reward: ShareableReward;
  childName: string;
  onClose: () => void;
}

type Tab = 'certificate' | 'challenge' | 'showcase';

export function ShareReward({ reward, childName, onClose }: ShareRewardProps) {
  const [tab, setTab] = useState<Tab>('certificate');
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    return registerModalBackHandler(() => {
      onClose();
      return true;
    });
  }, [onClose]);

  const handleDownload = async () => {
    try {
      const { generateAchievementImageBlob } = await import('@/lib/imageCardGenerator');
      const blob = await generateAchievementImageBlob({
        childName,
        emoji: reward.certificateEmoji || '🏆',
        headline: `BADGE UNLOCKED! 🏆`,
        subtext: `${childName} ${reward.certificateMessage}`,
        stars: 3,
        badgeName: reward.badgeName,
        theme: reward.theme,
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Kidora-Certificate-${childName.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShareFeedback('✅ Certificate PNG saved to your downloads!');
      setTimeout(() => setShareFeedback(null), 3000);
    } catch (e) {
      console.error('Download error', e);
    }
  };

  const getShareTextForTab = () => {
    let mainText = '';
    if (tab === 'certificate') {
      mainText = `🌟 Proud moment! My child *${childName}* earned the *${reward.badgeName}* Badge on Kidora! ${reward.certificateEmoji}\n${childName} ${reward.certificateMessage}`;
    } else if (tab === 'challenge') {
      mainText = `🧩 *Kidora Brain Challenge* ${reward.challengeEmoji}\n\n${reward.challengeQuestion}\n\nCan your kids solve it?`;
    } else {
      mainText = `🏆 *Kidora Adventure Showcase* ${reward.showcaseEmoji}\n\n${childName} ${reward.showcaseDescription}`;
    }

    return `${mainText}\n\n🎮 *Play & Download App:* ${APP_PUBLIC_URL}`;
  };

  const handleShareWhatsApp = async () => {
    const res = await shareAchievementAsImage({
      childName,
      emoji: reward.certificateEmoji || '🏆',
      headline: `BADGE UNLOCKED! 🏆`,
      subtext: `${childName} ${reward.certificateMessage}`,
      stars: 3,
      badgeName: reward.badgeName,
      theme: reward.theme,
    });

    if (res.downloaded) {
      setShareFeedback('✅ Certificate PNG downloaded & copied to clipboard! Paste directly in WhatsApp!');
      setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  const handleShareText = () => {
    const text = getShareTextForTab();

    if (navigator.share) {
      navigator.share({ text, title: 'Kidora Adventure World', url: APP_PUBLIC_URL }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyInviteLink = () => {
    const inviteText = `Join us on Kidora Adventure World! Play, learn, and create: ${APP_PUBLIC_URL}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full overflow-hidden my-auto animate-pop-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-sun-400 to-tangerine-400 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-white">Share Achievement! 🎉</h2>
            <p className="text-xs text-white/90">Share with family or WhatsApp Status</p>
          </div>
          <button onClick={onClose} className="btn-press text-white text-xl w-8 h-8 flex items-center justify-center rounded-full bg-white/20">✕</button>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-100">
          {([
            { id: 'certificate' as Tab, label: 'Certificate', emoji: '📜' },
            { id: 'challenge' as Tab, label: 'Challenge', emoji: '🧩' },
            { id: 'showcase' as Tab, label: 'Showcase', emoji: '🏆' },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-sm font-display font-bold transition-colors ${
                tab === t.id ? 'text-sky-500 border-b-2 border-sky-400 bg-sky-50/50' : 'text-slate-400'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Card content */}
        <div className="p-4">
          <div ref={cardRef} className="rounded-3xl overflow-hidden shadow-soft" style={{ width: '100%', maxWidth: 360 }}>
            {tab === 'certificate' && (
              <div className="bg-[#fefdfb] border-2 border-amber-400 p-5 text-center rounded-3xl shadow-sm" style={{ minHeight: 400 }}>
                {/* Logo & Header */}
                <div className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-0.5">K I D O R A</div>
                <div className="text-[10px] font-bold text-amber-700 tracking-wider uppercase mb-1">★ KIDORA INTERNATIONAL ACADEMY ★</div>
                
                {/* Title */}
                <div className="text-base font-display font-black text-blue-900 tracking-wide mt-1">CERTIFICATE OF EXCELLENCE</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest my-1">This is proudly presented to</div>
                
                {/* Child Name Focus */}
                <div className="my-1 py-1 border-b-2 border-amber-400 max-w-[200px] mx-auto">
                  <div className="text-2xl font-display font-black text-slate-900">{childName}</div>
                </div>

                {/* Achievement */}
                <div className="my-1.5 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full text-[11px] font-bold text-amber-800">
                  ⭐⭐⭐ MASTER LEVEL
                </div>
                <div className="text-xs font-bold text-blue-900 mb-1">Math & Logic Champion</div>

                {/* Description */}
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed my-1 max-w-[270px] mx-auto">
                  For outstanding excellence, curiosity, perseverance, and mastery in Mathematics & Logic.
                </p>

                {/* 3 Skill Badges */}
                <div className="flex justify-center gap-1 my-2 flex-wrap">
                  <span className="text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">🧠 Logic & Problem Solving</span>
                  <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">🔍 Curiosity & Inquiry</span>
                  <span className="text-[9px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">🎯 Focus & Mastery</span>
                </div>

                <div className="text-[10px] font-bold text-sky-600 my-0.5">🌟 OFFICIAL JUNIOR EXPLORER & SCHOLAR</div>
                <div className="text-[10px] font-bold text-amber-600 mb-2">Keep Exploring. Keep Learning. Keep Shining! 🚀</div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-200 text-[9px] text-slate-500 font-medium flex justify-between items-center px-1">
                  <span>Awarded: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-amber-700 font-bold">★ Official Seal ★</span>
                  <span>ID: KID-{new Date().getFullYear()}-{(childName.length * 137).toString().padStart(4, '0')}</span>
                </div>
              </div>
            )}

            {tab === 'challenge' && (
              <div className="bg-gradient-to-b from-grape-100 to-sky-50 p-6 text-center" style={{ minHeight: 380 }}>
                <div className="text-5xl mb-2">{reward.challengeEmoji}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kidora Adventure Challenge</div>
                <div className="text-lg font-display font-extrabold text-slate-700 mt-1 mb-3">{reward.challengeTitle}</div>
                <div className="bg-white rounded-2xl p-5 shadow-soft">
                  <p className="text-base font-display font-bold text-grape-600 mb-3">{reward.challengeQuestion}</p>
                  <div className="flex justify-center gap-2">
                    {['🤔', '💡', '✨'].map((e, i) => (
                      <div key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-sm font-bold text-slate-600">Can you solve it?</div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold">
                  Play & Download APK: kidora-liard.vercel.app
                </div>
              </div>
            )}

            {tab === 'showcase' && (
              <div className="bg-gradient-to-b from-sun-100 to-berry-50 p-6 text-center" style={{ minHeight: 380 }}>
                <div className="text-5xl mb-2">{reward.showcaseEmoji}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kidora Adventure Showcase</div>
                <div className="text-lg font-display font-extrabold text-slate-700 mt-1 mb-3">{reward.showcaseTitle}</div>
                <div className="bg-white rounded-2xl p-5 shadow-soft">
                  <div className="text-xl font-display font-bold text-sky-600 mb-2">{childName}</div>
                  <p className="text-sm text-slate-500">{childName} {reward.showcaseDescription}</p>
                  <div className="flex justify-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="text-lg animate-twinkle" style={{ animationDelay: `${i * 0.1}s` }}>⭐</div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold">
                  Play & Download APK: kidora-liard.vercel.app
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="btn-press w-full mt-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold rounded-2xl py-3 shadow-soft flex items-center justify-center gap-2 text-sm"
          >
            <span className="text-lg">💬</span> Share on WhatsApp / Status
          </button>

          {/* Feedback Alert Banner */}
          {shareFeedback && (
            <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold text-center animate-pop-in">
              {shareFeedback}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="md" onClick={handleDownload} className="flex-1">
              📥 Download PNG
            </Button>
            <Button variant="primary" size="md" onClick={handleShareText} className="flex-1">
              {copied ? '✅ Copied!' : '📤 More Apps'}
            </Button>
          </div>

          {/* Viral Invite & Download link button */}
          <button
            onClick={handleCopyInviteLink}
            className="btn-press w-full mt-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-display font-bold rounded-xl py-2 text-xs flex items-center justify-center gap-1.5"
          >
            <span>🔗</span> {copiedLink ? '✅ Link Copied to Clipboard!' : 'Copy App Download Link to Invite Friends'}
          </button>

          <p className="text-[11px] text-slate-400 text-center mt-2">
            Parents: Share your child achievement on WhatsApp Status and invite other parents! 🌈
          </p>
        </div>
      </div>
    </div>
  );
}
