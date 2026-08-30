import { useState } from 'react';
import { Button } from '@/components/Button';
import { generateStory, type StoryData } from '@/lib/content';
import { useApp } from '@/lib/store';
import { getTodayTheme } from '@/lib/adventure';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function StoryActivity({ onComplete }: Props) {
  const { profile, addCreation } = useApp();
  const [story] = useState<StoryData>(() => generateStory(getTodayTheme()));
  const [segmentIdx, setSegmentIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const segment = story.segments[segmentIdx];

  const handleChoice = (next: number) => {
    if (next >= story.segments.length) {
      setFinished(true);
      addCreation('story', story.title, { segments: story.segments });
      setTimeout(() => onComplete(3), 2000);
    } else {
      setSegmentIdx(next);
    }
  };

  if (finished) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-pop text-center">
        <div className="text-6xl mb-3 animate-bounce-soft">📖</div>
        <h3 className="text-xl font-display font-bold text-slate-700 mb-2">The End! 🎉</h3>
        <p className="text-slate-500 mb-4">What a great story, {profile?.name ?? 'explorer'}! You made it your own adventure!</p>
        <div className="bg-grape-50 rounded-2xl p-4">
          <p className="text-sm text-slate-600">Your story "{story.title}" has been saved to your creations!</p>
        </div>
      </div>
    );
  }

  if (!segment) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-pop">
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase">{story.title}</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-float">{segment.emoji}</div>
        <div className="bg-grape-50 rounded-2xl p-4">
          <p className="text-lg text-slate-700 font-body leading-relaxed">{segment.text}</p>
        </div>
      </div>
      {segment.choices && segment.choices.length > 0 ? (
        <div className="space-y-2">
          <p className="text-center text-sm font-bold text-slate-400 mb-2">What do you do?</p>
          {segment.choices.map((choice, i) => (
            <Button
              key={i}
              variant="primary"
              size="md"
              fullWidth
              onClick={() => handleChoice(choice.next)}
            >
              {choice.emoji} {choice.text}
            </Button>
          ))}
        </div>
      ) : (
        <Button variant="success" size="lg" fullWidth onClick={() => handleChoice(story.segments.length)}>
          The End! 🎉
        </Button>
      )}
      <div className="flex justify-center gap-1.5 mt-4">
        {story.segments.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i <= segmentIdx ? 'bg-grape-400' : 'bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
}
