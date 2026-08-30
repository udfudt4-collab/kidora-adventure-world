import { useState } from 'react';
import { useApp } from '@/lib/store';
import { defaultAvatar, skinTones, hairColors } from '@/lib/avatar';
import {
  getWeekData,
  pregnancyWeeks,
  pregnancyFoodGuide,
  prenatalExercises,
  doctorQuestions,
} from '@/lib/pregnancy';
import { babyNamesDatabase, babyMilestoneStages } from '@/lib/baby';
import {
  Users,
  Shield,
  Clock,
  Heart,
  Plus,
  Trash2,
  Lock,
  Download,
  Baby,
  Moon,
  Sparkles,
  ArrowRight,
  Search,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import type { Screen, ChildProfileControls, ActivityType, AvatarConfig } from '@/lib/types';

interface ParentDashboardProps {
  onNavigate: (screen: Screen) => void;
}

type MainHub = 'today' | 'pregnancy' | 'baby' | 'children' | 'family' | 'privacy';

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
    pregnancyCurrentWeek,
    setPregnancyWeek,
    pregnancyWeightLogs,
    addWeightLog,
    deleteWeightLog,
    favoriteBabyNames,
    toggleFavoriteBabyName,
    babyMoments,
    saveBabyMoment,
    familyPlannerEvents,
    addFamilyEvent,
    deleteFamilyEvent,
    toggleFamilyEventCompleted,
    exportFamilyData,
  } = useApp();

  const [activeHub, setActiveHub] = useState<MainHub>('today');
  const [selectedChildId, setSelectedChildId] = useState<string>(activeChildId);

  // Sub-tab states
  const [pregnancySubTab, setPregnancySubTab] = useState<'week' | 'weight' | 'food' | 'exercise' | 'doctor'>('week');
  const [babySubTab, setBabySubTab] = useState<'names' | 'milestones' | 'moments'>('names');

  // Baby Names filter
  const [nameSearch, setNameSearch] = useState('');
  const [nameGenderFilter, setNameGenderFilter] = useState<'all' | 'boy' | 'girl' | 'unisex' | 'fav'>('all');

  // Add child modal state
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(6);
  const [newChildGender, setNewChildGender] = useState<'son' | 'daughter' | 'child'>('son');

  // Weight log modal state
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('62.0');
  const [weightWeekInput, setWeightWeekInput] = useState(pregnancyCurrentWeek);

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

  // Family event state
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('Saturday');
  const [eventTime, setEventTime] = useState('10:00 AM');
  const [eventCategory, setEventCategory] = useState<'activity' | 'appointment' | 'celebration' | 'reminder'>('activity');

  // Notes state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'milestone' | 'growth' | 'memory' | 'health'>('milestone');

  // PIN state
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  // Active child & week data
  const selectedChild = familyChildren.find((c) => c.id === selectedChildId) ?? familyChildren[0];
  const activeChild = familyChildren.find((c) => c.id === activeChildId) ?? familyChildren[0];
  const currentWeekInfo = getWeekData(pregnancyCurrentWeek);

  // Handlers
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

  const handleAddWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightInput);
    if (!isNaN(w) && w > 0) {
      addWeightLog(weightWeekInput, w);
      setShowWeightModal(false);
    }
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

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const emojiMap = {
      activity: '🌳',
      appointment: '🩺',
      celebration: '🎉',
      reminder: '⏰',
    };

    addFamilyEvent({
      title: eventTitle.trim(),
      date: eventDate.trim(),
      time: eventTime.trim(),
      category: eventCategory,
      emoji: emojiMap[eventCategory],
    });

    setEventTitle('');
    setShowEventModal(false);
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

  // Filtered baby names
  const filteredBabyNames = babyNamesDatabase.filter((name) => {
    const matchesSearch =
      name.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
      name.meaning.toLowerCase().includes(nameSearch.toLowerCase()) ||
      name.origin.toLowerCase().includes(nameSearch.toLowerCase());

    if (!matchesSearch) return false;
    if (nameGenderFilter === 'fav') return favoriteBabyNames.includes(name.id);
    if (nameGenderFilter === 'all') return true;
    return name.gender === nameGenderFilter;
  });

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
                Good morning, Parent 👋
              </h1>
              <p className="text-[10px] text-emerald-400 font-bold">
                Kidora Family & Parenting Hub • Protected Zone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="btn-press bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to World 🏠
            </button>
          </div>
        </div>

        {/* Clean Hub Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800 pt-1">
          {[
            { id: 'today' as MainHub, label: 'Today for Family', emoji: '⭐' },
            { id: 'pregnancy' as MainHub, label: 'Pregnancy Journey', emoji: '🤰' },
            { id: 'baby' as MainHub, label: 'Baby Hub', emoji: '👶' },
            {
              id: 'children' as MainHub,
              label: `My Children ${pendingApprovalsCount > 0 ? `(${pendingApprovalsCount})` : ''}`,
              emoji: '🧒',
            },
            { id: 'family' as MainHub, label: 'Family & Planner', emoji: '❤️' },
            { id: 'privacy' as MainHub, label: 'Security & PIN', emoji: '🔒' },
          ].map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub.id)}
              className={`px-4 py-3 text-xs font-black font-display whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeHub === hub.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{hub.emoji}</span>
              <span>{hub.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* ======================================================== */}
        {/* HUB 0: TODAY FOR MY FAMILY (Daily 3 Dynamic Action Cards) */}
        {/* ======================================================== */}
        {activeHub === 'today' && (
          <div className="space-y-6 animate-pop-in">
            {/* 1. "TODAY FOR MY FAMILY" 3 DYNAMIC ACTION CARDS */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-black font-display text-slate-800 flex items-center gap-2">
                  <span>⭐</span> Today for My Family
                </h2>
                <span className="text-xs font-bold text-slate-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: For Active Child */}
                <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      🧒 For {activeChild?.name || 'Explorer'}
                    </span>
                    <h3 className="text-lg font-black font-display mt-1">Try Math Mountain Summit</h3>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                      Encourage {activeChild?.name} with 5 arithmetic riddles to earn +15 bonus stars today!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedChildId(activeChild?.id || '');
                      setShowRecModal(true);
                    }}
                    className="btn-press bg-white text-indigo-700 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs hover:bg-indigo-50 cursor-pointer text-center"
                  >
                    Send to {activeChild?.name} ❤️
                  </button>
                </div>

                {/* Card 2: Baby & Development */}
                <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      🤰 Week {pregnancyCurrentWeek} • {currentWeekInfo.fruitEmoji} Size of a {currentWeekInfo.fruitComparison}
                    </span>
                    <h3 className="text-lg font-black font-display mt-1">Fetal Growth Milestone</h3>
                    <p className="text-xs text-rose-100 leading-relaxed line-clamp-2">
                      {currentWeekInfo.babyDevelopment}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHub('pregnancy');
                      setPregnancySubTab('week');
                    }}
                    className="btn-press bg-white text-rose-700 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs hover:bg-rose-50 cursor-pointer text-center"
                  >
                    Open Week Tracker →
                  </button>
                </div>

                {/* Card 3: Family Activity */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      👨‍👩‍👧 Family Bonding
                    </span>
                    <h3 className="text-lg font-black font-display mt-1">Rainbow Color Safari</h3>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      Find 5 colorful objects around the house together before bedtime!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHub('family');
                    }}
                    className="btn-press bg-white text-emerald-800 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs hover:bg-emerald-50 cursor-pointer text-center"
                  >
                    View Family Missions 🚀
                  </button>
                </div>
              </div>
            </div>

            {/* 2. MY CHILDREN QUICK SUMMARY */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black font-display text-slate-800">
                    My Children ({familyChildren.length})
                  </h3>
                  <p className="text-xs text-slate-400">Independent learning journeys and controls.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddChildModal(true)}
                  className="btn-press text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  + Add Child
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {familyChildren.map((child) => {
                  const isActive = child.id === activeChildId;
                  return (
                    <div
                      key={child.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isActive ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">
                            {child.gender === 'daughter' ? '👧' : child.gender === 'son' ? '👦' : '🧒'}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-slate-800">{child.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">Age {child.age}</span>
                          </div>
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-200/60 mb-3">
                        <span>⭐ {child.stars ?? 0} Stars</span>
                        <span>🎮 {child.totalAdventures ?? 0} Quests</span>
                      </div>

                      <div className="flex gap-2">
                        {!isActive ? (
                          <button
                            type="button"
                            onClick={() => switchChild(child.id)}
                            className="btn-press flex-1 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs cursor-pointer"
                          >
                            Switch
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigate('home')}
                            className="btn-press flex-1 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                          >
                            Open World
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedChildId(child.id);
                            setActiveHub('children');
                          }}
                          className="btn-press px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                        >
                          ⚙️ Controls
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. QUICK ACCESS TOOLS TILES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Baby Names Directory', emoji: '👶', hub: 'baby' as MainHub, sub: 'names' },
                { label: 'Weight Tracker', emoji: '⚖️', hub: 'pregnancy' as MainHub, sub: 'weight' },
                { label: 'Pregnancy Foods', emoji: '🥗', hub: 'pregnancy' as MainHub, sub: 'food' },
                { label: 'Trimester Exercise', emoji: '🧘‍♀️', hub: 'pregnancy' as MainHub, sub: 'exercise' },
              ].map((tile, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveHub(tile.hub);
                    if (tile.hub === 'pregnancy') setPregnancySubTab(tile.sub as any);
                    if (tile.hub === 'baby') setBabySubTab(tile.sub as any);
                  }}
                  className="btn-press bg-white p-4 rounded-2xl border border-slate-200 shadow-soft text-left hover:border-slate-300 transition-all cursor-pointer flex items-center gap-3"
                >
                  <span className="text-2xl">{tile.emoji}</span>
                  <span className="text-xs font-black font-display text-slate-800">{tile.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 1: PREGNANCY JOURNEY */}
        {/* ======================================================== */}
        {activeHub === 'pregnancy' && (
          <div className="space-y-6 animate-pop-in">
            {/* Sub Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft">
              {[
                { id: 'week' as const, label: 'Week Tracker', emoji: '📅' },
                { id: 'weight' as const, label: 'Weight Tracker', emoji: '⚖️' },
                { id: 'food' as const, label: 'Food Guide', emoji: '🥗' },
                { id: 'exercise' as const, label: 'Exercises', emoji: '🧘‍♀️' },
                { id: 'doctor' as const, label: 'Doctor Questions', emoji: '🩺' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setPregnancySubTab(st.id)}
                  className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                    pregnancySubTab === st.id
                      ? 'bg-rose-500 text-white shadow-soft'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{st.emoji}</span>
                  <span>{st.label}</span>
                </button>
              ))}
            </div>

            {/* Sub-Tab 1: Week Tracker */}
            {pregnancySubTab === 'week' && (
              <div className="space-y-6">
                {/* Week Selector Slider & Hero */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                        Trimester {currentWeekInfo.trimester} • Week {pregnancyCurrentWeek} of 40
                      </span>
                      <h2 className="text-2xl font-black font-display text-slate-800 mt-0.5">
                        Your Baby is the Size of a {currentWeekInfo.fruitComparison} {currentWeekInfo.fruitEmoji}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Jump to Week:</span>
                      <select
                        value={pregnancyCurrentWeek}
                        onChange={(e) => setPregnancyWeek(parseInt(e.target.value, 10))}
                        className="text-xs font-bold p-2 rounded-xl border border-slate-300 bg-white"
                      >
                        {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                          <option key={w} value={w}>
                            Week {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Visual Fruit Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-rose-50/50 p-6 rounded-3xl border border-rose-200/80 items-center">
                    <div className="text-center md:text-left space-y-1">
                      <div className="text-6xl mb-2">{currentWeekInfo.fruitEmoji}</div>
                      <div className="text-sm font-black font-display text-slate-800">{currentWeekInfo.fruitComparison}</div>
                      <div className="text-xs text-slate-500 font-medium">
                        ~{currentWeekInfo.lengthCm} cm length • ~{currentWeekInfo.weightGrams} g weight
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs space-y-1">
                        <span className="text-[10px] font-bold text-rose-600 uppercase">Baby Development</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {currentWeekInfo.babyDevelopment}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs space-y-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">Mother's Body & Tip</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {currentWeekInfo.motherBody} 💡 <em>{currentWeekInfo.weeklyTip}</em>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Weight Tracker */}
            {pregnancySubTab === 'weight' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black font-display text-slate-800">
                      Pregnancy Weight Gain Tracker
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Monitor healthy weight progression across trimesters.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowWeightModal(true)}
                    className="btn-press bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Log Weight
                  </button>
                </div>

                {/* Interactive SVG Progress Chart */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Weight Progression (kg)</span>
                    <span className="text-emerald-600">Healthy Trajectory ✓</span>
                  </div>

                  <div className="h-40 w-full flex items-end justify-between gap-2 pt-4 border-b border-slate-200">
                    {pregnancyWeightLogs.map((log) => {
                      const heightPercent = Math.min(100, Math.max(20, (log.weightKg - 50) * 5));
                      return (
                        <div key={log.id} className="flex-1 flex flex-col items-center gap-1 group">
                          <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            {log.weightKg} kg
                          </span>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[36px] bg-gradient-to-t from-rose-400 to-pink-500 rounded-t-xl transition-all shadow-xs"
                          />
                          <span className="text-[10px] font-bold text-slate-400 truncate">W{log.week}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weight Logs Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Recent Log Entries</h4>
                  {pregnancyWeightLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">Week {entry.week}</span>
                        {entry.note && <span className="text-slate-400 ml-2">({entry.note})</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-rose-600">{entry.weightKg} kg</span>
                        <button
                          type="button"
                          onClick={() => deleteWeightLog(entry.id)}
                          className="text-slate-300 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Food Guide */}
            {pregnancySubTab === 'food' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 pb-2 border-b border-slate-100">
                    <span className="text-2xl">🥗</span>
                    <h3 className="font-black font-display text-base text-slate-800">Pregnancy Superfoods</h3>
                  </div>
                  <div className="space-y-3">
                    {pregnancyFoodGuide
                      .filter((f) => f.category === 'superfood')
                      .map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">{item.reason}</p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                  <div className="flex items-center gap-2 text-rose-600 pb-2 border-b border-slate-100">
                    <span className="text-2xl">⚠️</span>
                    <h3 className="font-black font-display text-base text-slate-800">Foods to Strictly Avoid</h3>
                  </div>
                  <div className="space-y-3">
                    {pregnancyFoodGuide
                      .filter((f) => f.category === 'avoid')
                      .map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">{item.reason}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Exercise Guide */}
            {pregnancySubTab === 'exercise' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Safe Prenatal Exercises & Stretches
                  </h3>
                  <p className="text-xs text-slate-400">Gentle routines to support stamina, flexibility, and pelvic health.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prenatalExercises.map((ex, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{ex.emoji}</span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                          {ex.trimesterSafe}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800">{ex.title}</h4>
                      <p className="text-xs text-slate-600 font-medium">{ex.benefit}</p>
                      <p className="text-xs text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-200/60">
                        {ex.steps}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 5: Doctor Questions */}
            {pregnancySubTab === 'doctor' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Doctor Checkup Discussion Questions
                  </h3>
                  <p className="text-xs text-slate-400">Handy checklist to discuss at your next prenatal appointment.</p>
                </div>

                <div className="space-y-2.5">
                  {doctorQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium flex items-start gap-3"
                    >
                      <span className="text-emerald-600 font-bold">Q{idx + 1}.</span>
                      <p className="leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 2: BABY HUB */}
        {/* ======================================================== */}
        {activeHub === 'baby' && (
          <div className="space-y-6 animate-pop-in">
            {/* Sub Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft">
              {[
                { id: 'names' as const, label: `Baby Names (${favoriteBabyNames.length} ❤️)`, emoji: '👶' },
                { id: 'milestones' as const, label: '0–2y Milestones', emoji: '👣' },
                { id: 'moments' as const, label: 'Baby Moments Journal', emoji: '📖' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setBabySubTab(st.id)}
                  className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                    babySubTab === st.id
                      ? 'bg-sky-500 text-white shadow-soft'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{st.emoji}</span>
                  <span>{st.label}</span>
                </button>
              ))}
            </div>

            {/* Sub-Tab 1: Baby Names Directory */}
            {babySubTab === 'names' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black font-display text-slate-800">
                      Baby Names Directory
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Explore meaningful names and save your favorites with ❤️.
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={nameSearch}
                      onChange={(e) => setNameSearch(e.target.value)}
                      placeholder="Search names or meanings..."
                      className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all' as const, label: 'All Names' },
                    { id: 'boy' as const, label: '👦 Boys' },
                    { id: 'girl' as const, label: '👧 Girls' },
                    { id: 'unisex' as const, label: '✨ Unisex' },
                    { id: 'fav' as const, label: `❤️ Favorites (${favoriteBabyNames.length})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setNameGenderFilter(f.id)}
                      className={`btn-press text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        nameGenderFilter === f.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Names Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredBabyNames.map((n) => {
                    const isFav = favoriteBabyNames.includes(n.id);
                    return (
                      <div
                        key={n.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-black font-display text-base text-slate-800">{n.name}</h4>
                              <span className="text-xs">
                                {n.gender === 'boy' ? '👦' : n.gender === 'girl' ? '👧' : '✨'}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">{n.origin}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleFavoriteBabyName(n.id)}
                            className="text-lg p-1 hover:scale-110 transition-transform cursor-pointer"
                            title="Toggle Favorite"
                          >
                            {isFav ? '❤️' : '🤍'}
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug">"{n.meaning}"</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Milestones 0-2y */}
            {babySubTab === 'milestones' && (
              <div className="space-y-4">
                {babyMilestoneStages.map((stage, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <span className="text-3xl">{stage.emoji}</span>
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                          {stage.ageRange}
                        </span>
                        <h4 className="text-lg font-black font-display text-slate-800">{stage.stageName}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                        <span className="font-bold text-slate-700 block">Motor Skills</span>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {stage.motorSkills.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                        <span className="font-bold text-slate-700 block">Social & Cognitive</span>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {stage.cognitiveSocial.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100 text-xs text-sky-900 leading-relaxed">
                      💡 <strong>Parent Tip:</strong> {stage.parentTips}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-Tab 3: Baby Moments Journal */}
            {babySubTab === 'moments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Baby Moments & Memory Log
                  </h3>
                  <p className="text-xs text-slate-400">Record private milestone dates and notes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {babyMoments.map((moment) => (
                    <div
                      key={moment.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{moment.emoji}</span>
                        <h4 className="font-bold text-sm text-slate-800">{moment.title}</h4>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={moment.dateAchieved || ''}
                          onChange={(e) => saveBabyMoment(moment.id, e.target.value, moment.notes)}
                          className="text-xs font-bold p-2 rounded-xl bg-white border border-slate-300"
                        />
                        <input
                          type="text"
                          value={moment.notes}
                          onChange={(e) => saveBabyMoment(moment.id, moment.dateAchieved || '', e.target.value)}
                          placeholder="Memories / notes..."
                          className="flex-1 text-xs font-medium p-2 rounded-xl bg-white border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 3: MY CHILDREN (Controls & Multi-Child Manager) */}
        {/* ======================================================== */}
        {activeHub === 'children' && selectedChild && (
          <div className="space-y-6 animate-pop-in">
            {/* Child Picker Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Configuring Controls for:
                </span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-0.5">
                  {selectedChild.name} (Age {selectedChild.age})
                </h2>
              </div>

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

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Realm Access */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <h3 className="font-black font-display text-base text-slate-800">
                  🎮 Realm & Game Permissions
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'math', name: 'Math Mountain Summit', emoji: '🏔️' },
                    { id: 'words', name: 'Word Forest Adventure', emoji: '🌳' },
                    { id: 'creative', name: 'Creative Island Studio', emoji: '🏝️' },
                    { id: 'puzzle', name: 'Puzzle Castle Riddle Gate', emoji: '🏰' },
                    { id: 'science', name: 'Science Space Station', emoji: '🚀' },
                  ].map((realm) => {
                    const isAllowed = selectedChild.controls?.allowedRealms?.includes(realm.id) ?? true;
                    return (
                      <div
                        key={realm.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className="flex items-center gap-2">
                          <span>{realm.emoji}</span>
                          <span className="text-xs font-bold text-slate-800">{realm.name}</span>
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
                          className={`btn-press w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                            isAllowed ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Screen Time & Bedtime Limits */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <h3 className="font-black font-display text-base text-slate-800">
                  ⏰ Screen Time Limits
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Daily Session Limit</label>
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

                <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-950">🌙 Bedtime Quiet Hours</span>
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 4: FAMILY & PLANNER */}
        {/* ======================================================== */}
        {activeHub === 'family' && (
          <div className="space-y-6 animate-pop-in">
            {/* Weekly Schedule Planner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black font-display text-slate-800">
                    Weekly Family Planner
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Organize family activities and important appointments.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEventModal(true)}
                  className="btn-press bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {familyPlannerEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{evt.emoji}</span>
                        <button
                          type="button"
                          onClick={() => toggleFamilyEventCompleted(evt.id)}
                          className={`text-xs font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                            evt.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {evt.completed ? 'Done ✓' : 'Pending'}
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 mt-1">{evt.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {evt.date} {evt.time && `• ${evt.time}`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteFamilyEvent(evt.id)}
                      className="text-slate-300 hover:text-rose-500 text-xs font-bold text-left pt-2 border-t border-slate-200/60"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Challenges */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xl font-black font-display text-slate-800">
                  Family Real-World Missions
                </h3>
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(true)}
                  className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  + New Mission
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {familyChallenges.map((chal) => (
                  <div key={chal.id} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{chal.emoji}</span>
                      <span className="text-xs font-black text-amber-700">+{chal.starsReward} ⭐</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">{chal.title}</h4>
                    <p className="text-xs text-slate-600 leading-snug">{chal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 5: SECURITY & PRIVACY */}
        {/* ======================================================== */}
        {activeHub === 'privacy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pop-in">
            {/* PIN Settings */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Lock className="w-5 h-5 text-slate-700" />
                <h3 className="font-black font-display text-base text-slate-800">Parent Security PIN</h3>
              </div>
              <p className="text-xs text-slate-600">
                Current PIN: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold">{parentPin}</code>
              </p>
              <form onSubmit={handleSavePin} className="space-y-3">
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Set 4 digits"
                  className="w-32 text-center text-lg font-mono font-bold tracking-widest border border-slate-300 rounded-xl p-2"
                />
                <button
                  type="submit"
                  className="btn-press bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Save PIN
                </button>
              </form>
              {pinSaved && <p className="text-xs text-emerald-600 font-bold">✓ PIN updated successfully!</p>}
            </div>

            {/* COPPA Data Portability */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black font-display text-base text-slate-800">Data Portability</h3>
              </div>
              <p className="text-xs text-slate-600">
                Download a complete JSON export of all family records, learning metrics, and pregnancy logs.
              </p>
              <button
                type="button"
                onClick={handleExportData}
                className="btn-press w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export Family Data (.JSON)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: ADD CHILD */}
      {/* ======================================================== */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">Add Child Profile</h3>
            <p className="text-xs text-slate-400 mb-4">Each child gets their own adventure world.</p>
            <form onSubmit={handleAddChildSubmit} className="space-y-4">
              <input
                type="text"
                required
                autoFocus
                maxLength={15}
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Child's Name"
                className="w-full text-sm font-bold border border-slate-300 rounded-xl p-3"
              />
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
                    className={`btn-press py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      newChildGender === g.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChildModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Add Child ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: LOG WEIGHT */}
      {/* ======================================================== */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">Log Pregnancy Weight</h3>
            <form onSubmit={handleAddWeightSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Pregnancy Week</label>
                <input
                  type="number"
                  min={1}
                  max={42}
                  value={weightWeekInput}
                  onChange={(e) => setWeightWeekInput(parseInt(e.target.value, 10))}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Weight in kg</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold text-xs"
                >
                  Save Log ✓
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
            <form onSubmit={handleSendRecommendationSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Activity</label>
                <select
                  value={recActivity}
                  onChange={(e) => {
                    const val = e.target.value as ActivityType;
                    setRecActivity(val);
                    setRecTitle(`${val.toUpperCase()} Mountain Challenge`);
                  }}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="math">🧮 Math Mountain</option>
                  <option value="words">🌳 Word Forest (Reading)</option>
                  <option value="brain">🧩 Puzzle Castle (Logic)</option>
                  <option value="science">🔬 Science Space</option>
                  <option value="creativity">🎨 Creative Island</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Encouraging Note</label>
                <input
                  type="text"
                  required
                  value={recMessage}
                  onChange={(e) => setRecMessage(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold text-xs"
                >
                  Send ❤️
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD EVENT */}
      {/* ======================================================== */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">Add Family Event</h3>
            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="e.g. Park Walk or Doctor Visit"
                className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Day/Date"
                  className="w-1/2 text-xs font-medium p-3 rounded-xl border border-slate-300"
                />
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="Time"
                  className="w-1/2 text-xs font-medium p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Add Event ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
