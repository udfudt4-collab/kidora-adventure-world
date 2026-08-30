import { useState } from 'react';
import { useApp } from '@/lib/store';
import { defaultAvatar, skinTones, hairStyles, hairColors } from '@/lib/avatar';
import {
  Users,
  Shield,
  Clock,
  Heart,
  BookOpen,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Lock,
  Download,
  Baby,
  Moon,
  Sparkles,
  ArrowRight,
  Smile,
} from 'lucide-react';
import type { Screen, ChildProfileControls, ActivityType, AvatarConfig } from '@/lib/types';

interface ParentDashboardProps {
  onNavigate: (screen: Screen) => void;
}

type Tab = 'family' | 'controls' | 'connect' | 'approvals' | 'parent-only' | 'privacy';

export function ParentDashboard({ onNavigate }: ParentDashboardProps) {
  const {
    children: familyChildren,
    activeChildId,
    switchChild,
    addChild,
    updateChild,
    deleteChild,
    parentPin,
    setParentPin,
    recommendations,
    sendRecommendation,
    familyChallenges,
    addFamilyChallenge,
    toggleChallengeComplete,
    approvalRequests,
    resolveApproval,
    parentNotes,
    addParentNote,
    deleteParentNote,
    exportFamilyData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<Tab>('family');
  const [selectedChildId, setSelectedChildId] = useState<string>(activeChildId);

  // Add child modal state
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(6);
  const [newChildGender, setNewChildGender] = useState<'son' | 'daughter' | 'child'>('son');

  // Recommendation modal state
  const [showRecModal, setShowRecModal] = useState(false);
  const [recActivity, setRecActivity] = useState<ActivityType>('math');
  const [recTitle, setRecTitle] = useState('Math Mountain Challenge');
  const [recMessage, setRecMessage] = useState('Let us count crystals together today!');

  // Challenge modal state
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [chalTitle, setChalTitle] = useState('');
  const [chalDesc, setChalDesc] = useState('');
  const [chalStars, setChalStars] = useState(15);

  // Notes state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'milestone' | 'growth' | 'memory' | 'health'>('milestone');

  // PIN state
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  const selectedChild = familyChildren.find((c) => c.id === selectedChildId) ?? familyChildren[0];

  const handleAddChildSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    const newId = await addChild({
      name: newChildName.trim(),
      age: newChildAge,
      gender: newChildGender,
      avatar: {
        ...defaultAvatar,
        skin: skinTones[0],
        hair: newChildGender === 'daughter' ? 'curly' : 'short',
        hairColor: hairColors[0],
      },
    });

    setSelectedChildId(newId);
    setNewChildName('');
    setShowAddChildModal(false);
  };

  const handleUpdateControls = (updates: Partial<ChildProfileControls>) => {
    if (!selectedChild) return;
    const currentControls = selectedChild.controls ?? {
      allowedRealms: ['words', 'math', 'creative', 'puzzle', 'science'],
      dailyLimitMinutes: 45,
      bedtimeQuietHoursEnabled: true,
      bedtimeStart: '20:00',
      bedtimeEnd: '07:00',
      priorityLearningAreas: ['math', 'reading'],
    };

    updateChild(selectedChild.id, {
      controls: { ...currentControls, ...updates },
    });
  };

  const handleSendRecommendationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    const emojiMap: Record<ActivityType, string> = {
      math: '🧮',
      words: '🌳',
      brain: '🧩',
      science: '🔬',
      creativity: '🎨',
      story: '📖',
    };

    sendRecommendation({
      childId: selectedChild.id,
      activityType: recActivity,
      title: recTitle,
      emoji: emojiMap[recActivity] || '⭐',
      message: recMessage,
    });

    setShowRecModal(false);
  };

  const handleAddChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chalTitle.trim()) return;

    addFamilyChallenge({
      title: chalTitle.trim(),
      description: chalDesc.trim(),
      emoji: '👨‍👩‍👧',
      starsReward: chalStars,
      assignedChildIds: familyChildren.map((c) => c.id),
    });

    setChalTitle('');
    setChalDesc('');
    setShowChallengeModal(false);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    addParentNote({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      category: newNoteCategory,
    });

    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      setParentPin(newPin);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 3000);
      setNewPin('');
    }
  };

  const handleExportData = () => {
    const dataStr = exportFamilyData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kidora-FamilyData-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pendingApprovalsCount = approvalRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="bg-slate-900 text-white shadow-soft sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-soft">
              🛡️
            </div>
            <div>
              <h1 className="font-black font-display text-base tracking-tight text-white flex items-center gap-2">
                Kidora Family Administrator
              </h1>
              <p className="text-[10px] text-emerald-400 font-bold">
                Parent Protected Zone • Admin Control
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            ← Back to Kidora World
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800 pt-1">
          {[
            { id: 'family' as Tab, label: 'My Family', emoji: '👨‍👩‍👧' },
            { id: 'controls' as Tab, label: 'Child Controls', emoji: '🎮' },
            { id: 'connect' as Tab, label: 'Connect & Recommend', emoji: '❤️' },
            {
              id: 'approvals' as Tab,
              label: `Approvals ${pendingApprovalsCount > 0 ? `(${pendingApprovalsCount})` : ''}`,
              emoji: '🛡️',
            },
            { id: 'parent-only' as Tab, label: 'Parent-Only Suite', emoji: '🤰' },
            { id: 'privacy' as Tab, label: 'Security & Privacy', emoji: '🔒' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-black font-display whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ======================================================== */}
        {/* TAB 1: MY FAMILY (Multi-Child Administrator) */}
        {/* ======================================================== */}
        {activeTab === 'family' && (
          <div className="space-y-6 animate-pop-in">
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Family Administrator
                </span>
                <h2 className="text-2xl font-black font-display text-slate-800">
                  Children & Family Profiles
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage independent learning journeys, progress, and screen time for each child.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewChildGender('son');
                    setShowAddChildModal(true);
                  }}
                  className="btn-press bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Son
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewChildGender('daughter');
                    setShowAddChildModal(true);
                  }}
                  className="btn-press bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Daughter
                </button>
              </div>
            </div>

            {/* Child Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyChildren.map((child) => {
                const isActive = child.id === activeChildId;
                return (
                  <div
                    key={child.id}
                    className={`bg-white rounded-3xl border transition-all p-6 shadow-soft space-y-4 ${
                      isActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                    }`}
                  >
                    {/* Top Row: Avatar, Name, Gender */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-200 to-sky-200 flex items-center justify-center text-3xl shadow-xs">
                          {child.gender === 'daughter' ? '👧' : child.gender === 'son' ? '👦' : '🧒'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-black font-display text-lg text-slate-800">
                              {child.name}
                            </h3>
                            {isActive && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-bold">
                            Age {child.age} • {child.gender === 'daughter' ? 'Daughter' : child.gender === 'son' ? 'Son' : 'Child'}
                          </p>
                        </div>
                      </div>

                      {familyChildren.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteChild(child.id)}
                          className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Remove child profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Stats Metrics */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                      <div>
                        <div className="text-sm font-black font-display text-amber-600">
                          ⭐ {child.stars ?? 0}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold">Stars</div>
                      </div>
                      <div>
                        <div className="text-sm font-black font-display text-sky-600">
                          🎮 {child.totalAdventures ?? 0}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold">Quests</div>
                      </div>
                      <div>
                        <div className="text-sm font-black font-display text-emerald-600">
                          🌱 {child.gardenItems?.length ?? 0}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold">Plants</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      {!isActive ? (
                        <button
                          type="button"
                          onClick={() => switchChild(child.id)}
                          className="btn-press flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs hover:bg-slate-800 cursor-pointer"
                        >
                          Switch to {child.name}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onNavigate('home')}
                          className="btn-press flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Open Adventure</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedChildId(child.id);
                          setActiveTab('controls');
                        }}
                        className="btn-press px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
                        title="Configure Controls"
                      >
                        ⚙️ Controls
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CHILD CONTROLS (Game Access, Time Limit & Goals) */}
        {/* ======================================================== */}
        {activeTab === 'controls' && selectedChild && (
          <div className="space-y-6 animate-pop-in">
            {/* Child Selector Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Configuring Controls for:
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-2xl font-black font-display text-slate-800">
                    {selectedChild.name} (Age {selectedChild.age})
                  </h2>
                </div>
              </div>

              {/* Child Picker Pill */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
                {familyChildren.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedChildId(c.id)}
                    className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
                      selectedChildId === c.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Game & Realm Access Controls */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="text-xl">🎮</span>
                  <div>
                    <h3 className="font-black font-display text-base text-slate-800">
                      Realm & Game Access
                    </h3>
                    <p className="text-[11px] text-slate-400">Choose which realms {selectedChild.name} can explore.</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: 'math', name: 'Math Mountain Summit', emoji: '🏔️', desc: 'Numbers, counting & problem-solving' },
                    { id: 'words', name: 'Word Forest Adventure', emoji: '🌳', desc: 'Phonics, vocabulary & spelling' },
                    { id: 'creative', name: 'Creative Island Studio', emoji: '🏝️', desc: 'Drawing, colors & world crafting' },
                    { id: 'puzzle', name: 'Puzzle Castle Riddle Gate', emoji: '🏰', desc: 'Logic, memory & spatial riddles' },
                    { id: 'science', name: 'Science Space Station', emoji: '🚀', desc: 'Planets, dinosaur fossils & nature' },
                  ].map((realm) => {
                    const isAllowed = selectedChild.controls?.allowedRealms?.includes(realm.id) ?? true;
                    return (
                      <div
                        key={realm.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{realm.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{realm.name}</div>
                            <div className="text-[10px] text-slate-500">{realm.desc}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const currentList = selectedChild.controls?.allowedRealms ?? ['words', 'math', 'creative', 'puzzle', 'science'];
                            const nextList = isAllowed
                              ? currentList.filter((r) => r !== realm.id)
                              : [...currentList, realm.id];
                            handleUpdateControls({ allowedRealms: nextList });
                          }}
                          className={`btn-press w-12 h-7 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                            isAllowed ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-white shadow-xs" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Screen Time & Bedtime Hours */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  <div>
                    <h3 className="font-black font-display text-base text-slate-800">
                      Screen Time & Bedtime Limits
                    </h3>
                    <p className="text-[11px] text-slate-400">Gentle session management and quiet hours.</p>
                  </div>
                </div>

                {/* Daily Play Time Slider / Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Daily Session Limit</label>
                    <span className="text-xs font-black font-display text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {selectedChild.controls?.dailyLimitMinutes ?? 45} minutes
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => handleUpdateControls({ dailyLimitMinutes: mins })}
                        className={`btn-press py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          (selectedChild.controls?.dailyLimitMinutes ?? 45) === mins
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedtime Quiet Hours */}
                <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-indigo-950">Bedtime Quiet Hours</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateControls({
                          bedtimeQuietHoursEnabled: !(selectedChild.controls?.bedtimeQuietHoursEnabled ?? true),
                        })
                      }
                      className={`btn-press w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        (selectedChild.controls?.bedtimeQuietHoursEnabled ?? true)
                          ? 'bg-indigo-600 justify-end'
                          : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">Lock Starts</span>
                      <input
                        type="time"
                        value={selectedChild.controls?.bedtimeStart ?? '20:00'}
                        onChange={(e) => handleUpdateControls({ bedtimeStart: e.target.value })}
                        className="w-full text-xs font-bold p-2 rounded-xl bg-white border border-indigo-200"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">Unlocks At</span>
                      <input
                        type="time"
                        value={selectedChild.controls?.bedtimeEnd ?? '07:00'}
                        onChange={(e) => handleUpdateControls({ bedtimeEnd: e.target.value })}
                        className="w-full text-xs font-bold p-2 rounded-xl bg-white border border-indigo-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Priority Learning Area Focus */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Priority Learning Focus Areas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'math', label: '🧮 Mathematics' },
                      { id: 'reading', label: '🌳 Phonics & Reading' },
                      { id: 'logic', label: '🧩 Logic & Riddles' },
                      { id: 'science', label: '🔬 Science Discovery' },
                      { id: 'creativity', label: '🎨 Creative Art' },
                    ].map((area) => {
                      const isPriority = selectedChild.controls?.priorityLearningAreas?.includes(area.id) ?? false;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => {
                            const current = selectedChild.controls?.priorityLearningAreas ?? [];
                            const next = isPriority
                              ? current.filter((x) => x !== area.id)
                              : [...current, area.id];
                            handleUpdateControls({ priorityLearningAreas: next });
                          }}
                          className={`btn-press px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPriority
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-500 border border-transparent hover:bg-slate-200'
                          }`}
                        >
                          {area.label} {isPriority ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONNECT & RECOMMEND (Parent Recommendations & Family Challenges) */}
        {/* ======================================================== */}
        {activeTab === 'connect' && (
          <div className="space-y-6 animate-pop-in">
            {/* Section 1: Parent Recommendations */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                    Parent → Child Recommendations
                  </span>
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Send Activities to Your Child
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your child sees: <em>"❤️ A new activity recommended by your parent!"</em> on their home screen.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRecModal(true)}
                  className="btn-press bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Heart className="w-4 h-4" /> Recommend Activity
                </button>
              </div>

              {/* Recommendations Feed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec) => {
                  const targetChild = familyChildren.find((c) => c.id === rec.childId);
                  return (
                    <div
                      key={rec.id}
                      className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{rec.emoji}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            rec.completed
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {rec.completed ? 'Completed ✓' : 'Sent to Child'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800">{rec.title}</h4>
                      <p className="text-xs text-slate-600 italic">"{rec.message}"</p>
                      <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-rose-100">
                        Assigned to: <strong>{targetChild?.name || 'Explorer'}</strong>
                      </div>
                    </div>
                  );
                })}

                {recommendations.length === 0 && (
                  <div className="col-span-3 text-center py-6 text-slate-400 text-xs font-medium">
                    No recommendations sent yet. Tap "Recommend Activity" to suggest a fun puzzle or story!
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Family Challenges */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Family Bonding & Real World Missions
                  </span>
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Family Challenges
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fun real-world activities to complete together for bonus stars.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowChallengeModal(true)}
                  className="btn-press bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Create Family Challenge
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {familyChallenges.map((chal) => (
                  <div
                    key={chal.id}
                    className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-3xl">{chal.emoji}</span>
                        <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          +{chal.starsReward} Stars ⭐
                        </span>
                      </div>
                      <h4 className="font-black font-display text-sm text-slate-800">{chal.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{chal.description}</p>
                    </div>

                    {/* Per-Child Mark Complete Buttons */}
                    <div className="space-y-1.5 pt-2 border-t border-amber-200/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Completed by:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {familyChildren.map((c) => {
                          const isDone = chal.completedBy.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => toggleChallengeComplete(chal.id, c.id)}
                              className={`btn-press text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                isDone
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <span>{c.name}</span>
                              <span>{isDone ? '✓' : '○'}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: APPROVALS QUEUE ("Ask a Parent") */}
        {/* ======================================================== */}
        {activeTab === 'approvals' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6 animate-pop-in">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Permission Management
              </span>
              <h2 className="text-2xl font-black font-display text-slate-800 mt-1">
                Child Approval Requests
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and approve child requests for parent-supervised actions.
              </p>
            </div>

            <div className="space-y-3">
              {approvalRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black font-display text-sm text-slate-800">
                        {req.childName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : req.status === 'denied'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{req.details}</p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(req.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                  </div>

                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => resolveApproval(req.id, 'approved')}
                        className="btn-press bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => resolveApproval(req.id, 'denied')}
                        className="btn-press bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {approvalRequests.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs font-medium space-y-2">
                  <div className="text-4xl">🛡️</div>
                  <p>No pending approval requests. Everything is safe and secure!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PARENT-ONLY SUITE (Health, Baby, Private Notes) */}
        {/* ======================================================== */}
        {activeTab === 'parent-only' && (
          <div className="space-y-6 animate-pop-in">
            {/* 1. Family & Baby Growth Milestones */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Baby className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-black font-display text-lg text-slate-800">
                    Family & Child Growth Milestones
                  </h3>
                  <p className="text-xs text-slate-400">Track key early childhood development markers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: 'Early Communication', desc: 'Uses full sentences, expresses thoughts & asks questions', age: 'Ages 3–5' },
                  { title: 'Numeracy Sense', desc: 'Recognizes quantities, counts 1–20, identifies shapes', age: 'Ages 4–6' },
                  { title: 'Self-Regulation', desc: 'Transitions away from screens peacefully, follows routines', age: 'Ages 5–8' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-pink-50/40 border border-pink-100 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest">{item.age}</span>
                    <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Private Parent Notes & Memories */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black font-display text-lg text-slate-800">
                    Private Family Notes & Memories
                  </h3>
                  <p className="text-xs text-slate-400">Stored locally on your device — never accessible to child accounts.</p>
                </div>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNoteSubmit} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    required
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Note Title (e.g., Aarav read first full book)"
                    className="flex-1 text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                  <select
                    value={newNoteCategory}
                    onChange={(e) => setNewNoteCategory(e.target.value as any)}
                    className="text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="milestone">Milestone 🏅</option>
                    <option value="growth">Growth 📈</option>
                    <option value="memory">Family Memory ❤️</option>
                    <option value="health">Health / Sleep 🌙</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Details or memories..."
                  className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white"
                />
                <button
                  type="submit"
                  className="btn-press bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  + Add Private Note
                </button>
              </form>

              {/* Notes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {parentNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 relative group">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{note.category}</span>
                      <span>{note.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">{note.title}</h4>
                    {note.content && <p className="text-xs text-slate-600 leading-relaxed">{note.content}</p>}
                    <button
                      type="button"
                      onClick={() => deleteParentNote(note.id)}
                      className="text-slate-300 hover:text-rose-500 text-xs font-bold mt-1"
                    >
                      Delete Note
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: SECURITY & PRIVACY (PIN Management & Data Export) */}
        {/* ======================================================== */}
        {activeTab === 'privacy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pop-in">
            {/* 1. Parent Security PIN */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Lock className="w-5 h-5 text-slate-700" />
                <div>
                  <h3 className="font-black font-display text-base text-slate-800">
                    Parent Security PIN
                  </h3>
                  <p className="text-[11px] text-slate-400">Controls access to this dashboard.</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Current PIN is active: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold">{parentPin}</code>
              </p>

              <form onSubmit={handleSavePin} className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Set New 4-Digit PIN</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="4 digits"
                    className="w-32 text-center text-lg font-mono font-bold tracking-widest border border-slate-300 rounded-xl p-2"
                  />
                  <button
                    type="submit"
                    className="btn-press bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Save PIN
                  </button>
                </div>
                {pinSaved && <p className="text-xs text-emerald-600 font-bold">✓ PIN updated successfully!</p>}
              </form>
            </div>

            {/* 2. Privacy & Data Rights (COPPA) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-black font-display text-base text-slate-800">
                    Data Portability & Deletion
                  </h3>
                  <p className="text-[11px] text-slate-400">COPPA & GDPR-K Privacy Rights.</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You have the full right to export all family learning records or delete stored data at any time.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="btn-press w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Export Family Data (.JSON)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: ADD CHILD (Son / Daughter / Child) */}
      {/* ======================================================== */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">
              Add New Child Profile
            </h3>
            <p className="text-xs text-slate-400 mb-4">Each child gets their own adventure world and rewards.</p>

            <form onSubmit={handleAddChildSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Child's Name</label>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={15}
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="e.g. Ananya"
                  className="w-full text-sm font-bold border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Relationship</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'son' as const, label: '👦 Son' },
                    { id: 'daughter' as const, label: '👧 Daughter' },
                    { id: 'child' as const, label: '🧒 Child' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setNewChildGender(g.id)}
                      className={`btn-press py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        newChildGender === g.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Age</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setNewChildAge(a)}
                      className={`btn-press py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        newChildAge === a
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {a} yrs
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChildModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-soft cursor-pointer"
                >
                  Add Child ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: RECOMMEND ACTIVITY */}
      {/* ======================================================== */}
      {showRecModal && selectedChild && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">
              Recommend to {selectedChild.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">Send a customized learning prompt to your child.</p>

            <form onSubmit={handleSendRecommendationSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Learning Subject</label>
                <select
                  value={recActivity}
                  onChange={(e) => {
                    const val = e.target.value as ActivityType;
                    setRecActivity(val);
                    const defaultTitles: Record<ActivityType, string> = {
                      math: 'Math Mountain Summit',
                      words: 'Word Forest Phonics Safari',
                      brain: 'Puzzle Castle Riddle Gate',
                      science: 'Science Space Exploration',
                      creativity: 'Creative Island Painting',
                      story: 'Legends of Kidora Story',
                    };
                    setRecTitle(defaultTitles[val] || 'Learning Activity');
                  }}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="math">🧮 Math Mountain</option>
                  <option value="words">🌳 Word Forest (Reading)</option>
                  <option value="brain">🧩 Puzzle Castle (Logic)</option>
                  <option value="science">🔬 Science Space</option>
                  <option value="creativity">🎨 Creative Island</option>
                  <option value="story">📖 Story Adventure</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Encouraging Note</label>
                <input
                  type="text"
                  required
                  value={recMessage}
                  onChange={(e) => setRecMessage(e.target.value)}
                  placeholder="e.g. Try this fun math puzzle today!"
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-soft cursor-pointer"
                >
                  Send to {selectedChild.name} ❤️
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CREATE FAMILY CHALLENGE */}
      {/* ======================================================== */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">
              Create Family Challenge
            </h3>
            <p className="text-xs text-slate-400 mb-4">Design a real-world task for your kids to complete.</p>

            <form onSubmit={handleAddChallengeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Challenge Title</label>
                <input
                  type="text"
                  required
                  value={chalTitle}
                  onChange={(e) => setChalTitle(e.target.value)}
                  placeholder="e.g. Find 5 red objects"
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Instructions</label>
                <textarea
                  rows={2}
                  required
                  value={chalDesc}
                  onChange={(e) => setChalDesc(e.target.value)}
                  placeholder="Walk around the house and name 5 red items together..."
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Star Reward</label>
                <select
                  value={chalStars}
                  onChange={(e) => setChalStars(parseInt(e.target.value, 10))}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-white"
                >
                  <option value={10}>10 Stars ⭐</option>
                  <option value={15}>15 Stars ⭐</option>
                  <option value={20}>20 Stars ⭐</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-soft cursor-pointer"
                >
                  Post Challenge 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
