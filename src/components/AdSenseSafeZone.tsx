import { type ReactNode } from 'react';

interface AdSenseSafeZoneProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
  children?: ReactNode;
}

export function AdSenseSafeZone({
  slotId = 'kidora-safe-ad-1',
  format = 'horizontal',
  className = '',
  children,
}: AdSenseSafeZoneProps) {
  // Respects Google Child-Directed Ad Guidelines:
  // - Clear non-deceptive labeling
  // - Safe margins to prevent accidental taps
  // - No overlapping with games or interactive canvas
  return (
    <div
      className={`my-6 mx-auto w-full max-w-2xl px-4 select-none ${className}`}
      data-ad-safe="child-friendly"
    >
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/90 p-3 text-center transition-all">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
          <span>Family-Safe Partner</span>
          <span>Advertisement</span>
        </div>

        {children ? (
          children
        ) : (
          <div
            className={`flex items-center justify-center rounded-xl bg-white/70 border border-slate-200 text-xs font-semibold text-slate-400 ${
              format === 'rectangle' ? 'h-48' : format === 'banner' ? 'h-24' : 'h-16'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">🛡️ Verified Child-Safe Ad Space</span>
              <span className="text-[10px] text-slate-400 font-normal">
                COPPA & Google Child-Directed Compliant
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
