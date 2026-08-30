import { useState, type ReactNode } from 'react';
import { Button } from './Button';

interface ParentGateProps {
  onUnlock: () => void;
  onCancel: () => void;
}

export function ParentGate({ onUnlock, onCancel }: ParentGateProps) {
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);
  const [a] = useState(() => Math.floor(Math.random() * 5) + 2);
  const [b] = useState(() => Math.floor(Math.random() * 5) + 2);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (parseInt(answer) === a + b) {
      setSolved(true);
      setTimeout(onUnlock, 400);
    } else {
      setError(true);
      setAnswer('');
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-4xl shadow-pop p-8 max-w-sm w-full ${solved ? 'animate-pop-in' : ''} ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔒</div>
          <h2 className="text-xl font-display font-bold text-slate-700">Parent Area</h2>
          <p className="text-sm text-slate-500 mt-1">Ask a grown-up to solve this:</p>
        </div>
        <div className="text-center mb-6">
          <div className="text-3xl font-display font-bold text-slate-700 mb-4">
            {a} + {b} = ?
          </div>
          <input
            type="number"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="?"
            className="w-20 text-center text-2xl font-bold font-display border-2 border-slate-200 rounded-2xl py-3 focus:border-sky-400 focus:outline-none"
            autoFocus
          />
          {error && <p className="text-sm text-rose-500 mt-2">Oops! Try again.</p>}
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="md" fullWidth onClick={onCancel}>Back</Button>
          <Button variant="primary" size="md" fullWidth onClick={handleSubmit}>Unlock</Button>
        </div>
      </div>
    </div>
  );
}

export function withParentGate(action: () => void, cancel: () => void, children: ReactNode, gate: ReactNode) {
  return (
    <>
      {children}
      {gate}
    </>
  );
}
