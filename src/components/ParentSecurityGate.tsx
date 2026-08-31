import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Lock, ShieldCheck, HelpCircle } from 'lucide-react';

interface ParentSecurityGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ParentSecurityGate({ onSuccess, onCancel }: ParentSecurityGateProps) {
  const { verifyParentPin } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [useMathFallback, setUseMathFallback] = useState(false);
  const [mathProblem, setMathProblem] = useState({ q: '24 + 17 = ?', a: 41 });
  const [mathAnswer, setMathAnswer] = useState('');

  useEffect(() => {
    // Generate random adult arithmetic problem
    const num1 = Math.floor(Math.random() * 20) + 15;
    const num2 = Math.floor(Math.random() * 20) + 12;
    setMathProblem({ q: `${num1} + ${num2} = ?`, a: num1 + num2 });
  }, []);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (verifyParentPin(newPin)) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => setPin(''), 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(mathAnswer.trim(), 10) === mathProblem.a) {
      onSuccess();
    } else {
      setError(true);
      setMathAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 text-center animate-pop-in border-2 border-white">
        {/* Header */}
        <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-soft">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-black font-display text-slate-800 mb-1">
          Parent Security Gate
        </h3>
        <p className="text-xs text-slate-500 mb-5 max-w-xs mx-auto">
          This area contains parental controls & family settings. Enter your 4-digit Parent PIN to continue.
        </p>

        {!useMathFallback ? (
          <div>
            {/* PIN Dots */}
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      error
                        ? 'bg-rose-500 animate-bounce'
                        : filled
                        ? 'bg-emerald-600 scale-125 shadow-sm'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-bold mb-3 animate-shake">
                Incorrect PIN. Please try again or tap ? for Adult Math Challenge.
              </p>
            )}

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto mb-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDigit(d)}
                  className="btn-press h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-lg font-black font-display shadow-xs flex items-center justify-center cursor-pointer"
                >
                  {d}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setUseMathFallback(true)}
                className="btn-press h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center cursor-pointer"
                title="Adult Math Verification"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleDigit('0')}
                className="btn-press h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-lg font-black font-display shadow-xs flex items-center justify-center cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn-press h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center cursor-pointer"
              >
                ⌫
              </button>
            </div>
          </div>
        ) : (
          /* Adult Arithmetic Gate */
          <form onSubmit={handleMathSubmit} className="space-y-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Adult Verification Challenge:
              </label>
              <div className="text-xl font-black font-display text-slate-800 mb-3">
                {mathProblem.q}
              </div>
              <input
                type="number"
                required
                autoFocus
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-32 text-center text-lg font-bold border-2 border-slate-300 rounded-xl p-2 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-bold">Incorrect calculation. Try again.</p>
            )}

            <button
              type="submit"
              className="btn-press w-full py-3 rounded-2xl bg-emerald-600 text-white font-black font-display text-xs cursor-pointer"
            >
              Verify as Adult ✓
            </button>

            <button
              type="button"
              onClick={() => setUseMathFallback(false)}
              className="text-xs text-slate-400 underline font-bold"
            >
              Back to PIN Pad
            </button>
          </form>
        )}

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="btn-press w-full py-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
        >
          Cancel & Return to Adventure 🏠
        </button>
      </div>
    </div>
  );
}
