import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSenseSafeZone } from '@/components/AdSenseSafeZone';
import type { Screen } from '@/lib/types';

interface LearnHubProps {
  onNavigate: (screen: Screen) => void;
}

type TopicKey = 'math' | 'reading' | 'logic' | 'science' | 'creativity';

interface LearningModule {
  id: TopicKey;
  title: string;
  realm: string;
  emoji: string;
  mentor: string;
  mentorEmoji: string;
  summary: string;
  ageMilestones: { age: string; milestones: string[] }[];
  pedagogy: string;
  parentTips: string[];
  sampleQuestions: { q: string; a: string; explanation: string }[];
  relatedGame: string;
  gradient: string;
}

const learningModules: LearningModule[] = [
  {
    id: 'math',
    title: 'Mathematics & Number Sense',
    realm: 'Math Mountain',
    emoji: '🧮',
    mentor: 'Tiko',
    mentorEmoji: '🧮',
    summary: 'Developing early numeracy, visual arithmetic, pattern recognition, and geometric intuition through playful challenges.',
    ageMilestones: [
      {
        age: 'Ages 4–5 (Preschool & Kindergarten)',
        milestones: [
          'Recognizing numerals 1–20 and 1-to-1 object counting',
          'Comparing quantities (more than, less than, equal to)',
          'Identifying basic geometric 2D shapes (circle, square, triangle)',
        ],
      },
      {
        age: 'Ages 6–7 (Early Elementary)',
        milestones: [
          'Single-digit and double-digit visual addition & subtraction',
          'Understanding place value (tens and units)',
          'Recognizing repeating numerical and visual patterns',
        ],
      },
      {
        age: 'Ages 8–10 (Elementary)',
        milestones: [
          'Multi-step word problems and logical arithmetic',
          'Introductory fractions, grouping, and multiplication concepts',
          'Spatial geometry and coordinate grid navigation',
        ],
      },
    ],
    pedagogy: 'Kidora’s math curriculum uses the Concrete-Pictorial-Abstract (CPA) approach. Instead of memorizing rote formulas, children interact with animated gems, counting fruits, and spatial balance scales to understand the "why" behind mathematical relationships.',
    parentTips: [
      'Count everyday items together at home (spoons, steps, fruit in a bowl).',
      'Ask open-ended questions like "How many more do we need to make 10?"',
      'Celebrate effort and problem-solving strategies rather than just speed.',
    ],
    sampleQuestions: [
      {
        q: 'If Tiko finds 4 dragon crystals and then discovers 3 more in a cave, how many crystals does Tiko have in total?',
        a: '7 crystals (4 + 3 = 7)',
        explanation: 'Children combine the two groups using visual counting or number-line addition.',
      },
    ],
    relatedGame: 'Math Mountain Summit',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'reading',
    title: 'Phonics, Vocabulary & Reading',
    realm: 'Word Forest',
    emoji: '🌳',
    mentor: 'Kido',
    mentorEmoji: '🦊',
    summary: 'Mastering letter sounds, sight words, spelling patterns, and storytelling comprehension in a rich enchanted forest.',
    ageMilestones: [
      {
        age: 'Ages 4–5 (Preschool)',
        milestones: [
          'Phonemic awareness: identifying beginning sounds in common words',
          'Alphabet recognition (upper and lowercase letters)',
          'Listening to short stories and predicting what happens next',
        ],
      },
      {
        age: 'Ages 6–7 (Early Readers)',
        milestones: [
          'Blending consonant-vowel-consonant (CVC) words (e.g., c-a-t, s-u-n)',
          'Recognizing core sight words and high-frequency vocabulary',
          'Forming complete sentences and answering comprehension questions',
        ],
      },
      {
        age: 'Ages 8–10 (Fluent Readers)',
        milestones: [
          'Context clues for unfamiliar vocabulary in story quests',
          'Understanding narrative structure (character, conflict, resolution)',
          'Creative writing and branch-choice story creation',
        ],
      },
    ],
    pedagogy: 'Phonics instruction is embedded into engaging narrative quests. Children solve phonetic puzzles to unlock doors, decipher secret scrolls, and assist characters, building reading fluency through meaningful context.',
    parentTips: [
      'Read together for 15 minutes daily and talk about the characters’ emotions.',
      'Play "I Spy" with letter sounds (e.g., "I spy something that starts with the sound /b/").',
      'Encourage children to retell stories in their own words.',
    ],
    sampleQuestions: [
      {
        q: 'Fill in the missing letter to complete the flying animal: B _ R D',
        a: 'I (BIRD)',
        explanation: 'Reinforces vowel sound patterns in common sight words.',
      },
    ],
    relatedGame: 'Word Forest Adventure',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'logic',
    title: 'Logic, Memory & Critical Thinking',
    realm: 'Puzzle Castle',
    emoji: '🏰',
    mentor: 'Momo',
    mentorEmoji: '🧩',
    summary: 'Strengthening working memory, deductive reasoning, sequencing, and spatial problem-solving skills.',
    ageMilestones: [
      {
        age: 'Ages 4–5',
        milestones: [
          'Matching identical items and identifying what does not belong',
          'Sorting objects by 1 attribute (color, size, or shape)',
          'Remembering 2–3 item locations in memory matching games',
        ],
      },
      {
        age: 'Ages 6–7',
        milestones: [
          'Solving multi-step visual mazes without touching dead-ends',
          'Recognizing sequence patterns (e.g., Star, Moon, Star, ?)',
          'Deductive riddles with 2 clues',
        ],
      },
      {
        age: 'Ages 8–10',
        milestones: [
          'Complex spatial rotations and 3D perspective challenges',
          'Multi-variable logic grids and constraint-based puzzles',
          'Strategic planning and foreseeing 2–3 moves ahead',
        ],
      },
    ],
    pedagogy: 'Cognitive research shows that gamified logic puzzles stimulate neural plasticity and executive function. Momo’s puzzles encourage patience, trial-and-error resilience, and structured analytical thinking.',
    parentTips: [
      'Play board games and puzzle jigsaws as a family.',
      'When your child gets stuck, guide them with questions: "What have you tried so far?"',
      'Praise the strategy and persistent effort rather than getting it right on the first try.',
    ],
    sampleQuestions: [
      {
        q: 'Look at the pattern: ☀️ 🌙 ☀️ 🌙 ☀️ __ ? What comes next?',
        a: '🌙 (Moon)',
        explanation: 'Children identify the alternating AB pattern and predict the next element.',
      },
    ],
    relatedGame: 'Puzzle Castle Riddle Gate',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'science',
    title: 'Early Science, Nature & Space Inquiry',
    realm: 'Science Space',
    emoji: '🔬',
    mentor: 'Lumi',
    mentorEmoji: '🔬',
    summary: 'Igniting curiosity about planets, animals, ecosystems, dinosaur history, and basic physical sciences.',
    ageMilestones: [
      {
        age: 'Ages 4–5',
        milestones: [
          'Observing living vs non-living things in nature',
          'Understanding day/night cycles and basic weather types',
          'Recognizing baby animals and their natural habitats',
        ],
      },
      {
        age: 'Ages 6–7',
        milestones: [
          'Learning the order of planets in our solar system',
          'Understanding plant growth (seed, soil, water, sunlight)',
          'Identifying carnivores, herbivores, and prehistoric dinosaurs',
        ],
      },
      {
        age: 'Ages 8–10',
        milestones: [
          'Introduction to the Scientific Method (Question, Hypothesis, Test)',
          'Understanding gravity, magnetism, and states of matter',
          'Ecosystem food chains and environmental conservation',
        ],
      },
    ],
    pedagogy: 'Lumi’s science curriculum transforms passive facts into interactive discoveries. Children conduct virtual experiments, track plant life cycles in their living garden, and explore planetary physics.',
    parentTips: [
      'Take nature walks and collect leaves, rocks, and seed pods for examination.',
      'Look up at the night sky and point out the moon phases and bright constellations.',
      'Encourage questions: "Why do you think leaves change color in autumn?"',
    ],
    sampleQuestions: [
      {
        q: 'What do green plants need to make their own food through photosynthesis?',
        a: 'Sunlight, Water, and Carbon Dioxide',
        explanation: 'Introduces fundamental plant biology in an approachable visual format.',
      },
    ],
    relatedGame: 'Science Space Station',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'creativity',
    title: 'Creative Arts & World Expression',
    realm: 'Creative Island',
    emoji: '🎨',
    mentor: 'Ria',
    mentorEmoji: '🎨',
    summary: 'Empowering self-expression, color harmony, visual design, and emotional creativity.',
    ageMilestones: [
      {
        age: 'Ages 4–5',
        milestones: [
          'Exploring primary colors and mixing simple shades',
          'Developing fine-motor control through digital brush strokes',
          'Using drawings to express stories, feelings, and imaginary friends',
        ],
      },
      {
        age: 'Ages 6–7',
        milestones: [
          'Understanding symmetry, patterns, and background layers',
          'Creating themed artwork (nature, fantasy, space habitats)',
          'Placing creations into living world environments',
        ],
      },
      {
        age: 'Ages 8–10',
        milestones: [
          'Expressive character design and storytelling illustrations',
          'Digital composition, perspective, and lighting highlights',
          'Appreciating diverse artistic styles and color palettes',
        ],
      },
    ],
    pedagogy: 'Creativity is treated not just as a leisure activity, but as a cognitive bridge. Through Kidora Create’s "Living Creations" engine, every drawing becomes part of the child\'s personal ecosystem.',
    parentTips: [
      'Set aside unstructured creative time with paper, crayons, and clay.',
      'Ask your child to tell you the story behind their drawing.',
      'Display their artwork proudly on the fridge or digital gallery.',
    ],
    sampleQuestions: [
      {
        q: 'What secondary color do you get when you mix Yellow and Blue paint together?',
        a: 'Green! 💚',
        explanation: 'Teaches fundamental color theory and mixing concepts.',
      },
    ],
    relatedGame: 'Creative Island Studio',
    gradient: 'from-pink-500 to-rose-600',
  },
];

export function LearnHub({ onNavigate }: LearnHubProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('math');
  const activeModule = learningModules.find((m) => m.id === selectedTopic) ?? learningModules[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar currentScreen="learn" onNavigate={onNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 animate-pop-in">
          <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>📚</span> Kidora Learning Framework
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-800 tracking-tight mb-2">
            Educational Guides & Curricula
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Detailed learning roadmaps, developmental milestones, and pedagogical insights designed by educators for parents and curious learners.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {learningModules.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setSelectedTopic(mod.id)}
              className={`btn-press px-4 py-2.5 rounded-2xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-2 ${
                selectedTopic === mod.id
                  ? `bg-gradient-to-r ${mod.gradient} text-white shadow-soft scale-105`
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">{mod.emoji}</span>
              <span>{mod.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Module In-Depth Guide */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-soft overflow-hidden mb-10">
          {/* Header Banner */}
          <div className={`bg-gradient-to-r ${activeModule.gradient} p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {activeModule.realm}
                </span>
                <span className="text-xs font-bold">
                  Mentor: {activeModule.mentor} {activeModule.mentorEmoji}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display">{activeModule.title}</h2>
              <p className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed">
                {activeModule.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('play')}
              className="btn-press bg-white text-slate-900 font-black font-display px-5 py-3 rounded-2xl shadow-soft text-xs cursor-pointer whitespace-nowrap hover:bg-slate-100"
            >
              Play {activeModule.relatedGame} 🚀
            </button>
          </div>

          {/* Body Sections */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* 1. Age-by-Age Developmental Milestones */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🎯</span>
                <h3 className="text-lg font-black font-display text-slate-800">
                  Developmental Age Milestones
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeModule.ageMilestones.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2"
                  >
                    <h4 className="text-xs font-black font-display text-slate-700 border-b border-slate-200 pb-1.5">
                      {item.age}
                    </h4>
                    <ul className="space-y-1.5">
                      {item.milestones.map((ms, mIdx) => (
                        <li key={mIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Pedagogical Approach */}
            <div className="bg-sky-50/60 border border-sky-100 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-base font-black font-display text-sky-900">
                  How Kidora Teaches This Subject
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-sky-800 leading-relaxed font-medium">
                {activeModule.pedagogy}
              </p>
            </div>

            {/* 3. Sample Quiz / Problem Breakdown */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <h3 className="text-lg font-black font-display text-slate-800">
                  Sample Concept Exploration
                </h3>
              </div>
              <div className="space-y-3">
                {activeModule.sampleQuestions.map((q, idx) => (
                  <div key={idx} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                    <div className="text-xs font-bold text-amber-900">
                      <strong>Question:</strong> {q.q}
                    </div>
                    <div className="text-xs font-black text-emerald-700">
                      <strong>Answer:</strong> {q.a}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium pt-1 border-t border-amber-200/50">
                      <strong>Learning Benefit:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Parent Offline Tips */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👨‍👩‍👧</span>
                <h3 className="text-base font-black font-display text-slate-800">
                  Tips for Parents & Offline Co-Learning
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeModule.parentTips.map((tip, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    🌟 {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AdSense Safe Zone */}
        <AdSenseSafeZone format="horizontal" />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
