import { useState } from 'react';
import { useApp } from '@/lib/store';
import { ShieldAlert, HeartHandshake } from 'lucide-react';

interface AskParentModalProps {
  actionType: 'unlock_realm' | 'change_avatar' | 'external_share' | 'custom';
  title: string;
  description: string;
  onClose: () => void;
}

export function AskParentModal({
  actionType,
  title,
  description,
  onClose,
}: AskParentModalProps) {
  const { profile, requestApproval } = useApp();
  const [requested, setRequested] = useState(false);

  const handleSendRequest = () => {
    if (!profile) return;
    requestApproval({
      childId: profile.id,
      childName: profile.name,
      actionType,
      details: `${title}: ${description}`,
    });
    setRequested(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 text-center animate-pop-in border-2 border-white">
        {!requested ? (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-soft animate-bounce-soft">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Parent Permission Needed
              </span>
              <h3 className="text-xl font-black font-display text-slate-800 mt-1">{title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-600 text-left">
              💬 <em>"Your parent helps guide your world and keep you safe!"</em>
            </div>

            <button
              type="button"
              onClick={handleSendRequest}
              className="btn-press w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black font-display text-sm shadow-soft flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ask a Parent</span>
              <span>👨‍👩‍👧</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Never mind, go back 🏠
            </button>
          </div>
        ) : (
          <div className="py-6 space-y-3 animate-pop-in">
            <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black font-display text-slate-800">Request Sent to Parent!</h3>
            <p className="text-xs text-slate-500">
              Your parent will see this request on their dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
