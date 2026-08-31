import { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import { PeriodTracker } from '@/components/PeriodTracker';
import { EarnPremiumModal } from '@/components/EarnPremiumModal';
import { ParentFeedbackReviews } from '@/components/ParentFeedbackReviews';
import { SleepTracker } from '@/components/SleepTracker';
import { HydrationTracker } from '@/components/HydrationTracker';
import { getParentGreeting, parentAffirmations } from '@/lib/greetings';
import { defaultAvatar, skinTones, hairColors } from '@/lib/avatar';
import {
  getWeekData,
  pregnancyFoodGuide,
  prenatalExercises,
  medicalDisclaimer,
  weightTrackingGuidance,
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
  Camera,
  Star,
  BookOpen,
  Droplets,
  MessageSquare,
} from 'lucide-react';
import type { Screen, ChildProfileControls, ActivityType, AvatarConfig } from '@/lib/types';

interface ParentDashboardProps {
  onNavigate: (screen: Screen) => void;
}

type MainHub =
  | 'overview'
  | 'cycle'
  | 'pregnancy'
  | 'baby'
  | 'children'
  | 'calendar'
  | 'sleep'
  | 'hydration'
  | 'reviews'
  | 'privacy';

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
    verifyParentPin,
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
    dailyLearningLogs,
    premiumState,
    earnPremiumModalOpen,
    setEarnPremiumModalOpen,
    sleepLogs,
    hydrationData,
    parentReviews,
  } = useApp();

  const [activeHub, setActiveHub] = useState<MainHub>('overview');
  const [selectedChildId, setSelectedChildId] = useState<string>(activeChildId);
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  const [parentName, setParentName] = useState<string>(() => {
    try {
      return localStorage.getItem('kidora_parent_name') || 'Anish';
    } catch {
      return 'Anish';
    }
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempNameInput, setTempNameInput] = useState('');

  const greeting = useMemo(() => getParentGreeting(parentName), [parentName]);

  const handleSaveParentName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempNameInput.trim()) {
      const clean = tempNameInput.trim();
      setParentName(clean);
      try {
        localStorage.setItem('kidora_parent_name', clean);
      } catch {}
    }
    setIsEditingName(false);
  };

  // Sub-tabs
  const [pregnancySubTab, setPregnancySubTab] = useState<'journey' | 'weight' | 'foods' | 'exercises'>('journey');
  const [babySubTab, setBabySubTab] = useState<'development' | 'moments' | 'names' | 'compare'>('development');

  // Baby Names state
  const [nameSearch, setNameSearch] = useState('');
  const [nameGenderFilter, setNameGenderFilter] = useState<'all' | 'boy' | 'girl' | 'unisex' | 'fav'>('all');
  const [nameOriginFilter, setNameOriginFilter] = useState<'all' | 'tamil' | 'indian' | 'global'>('all');
  const [nameLetterFilter, setNameLetterFilter] = useState<string>('ALL');

  // Modals
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(6);
  const [newChildGender, setNewChildGender] = useState<'son' | 'daughter' | 'child'>('son');

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('62.0');
  const [weightWeekInput, setWeightWeekInput] = useState(pregnancyCurrentWeek);

  const [showRecModal, setShowRecModal] = useState(false);
  const [recActivity, setRecActivity] = useState<ActivityType>('math');
  const [recTitle, setRecTitle] = useState('Math Mountain Challenge');
  const [recMessage, setRecMessage] = useState('Let us count crystals together today!');

  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [chalTitle, setChalTitle] = useState('');
  const [chalDesc, setChalDesc] = useState('');
  const [chalStars, setChalStars] = useState(15);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('Saturday');
  const [eventTime, setEventTime] = useState('10:00 AM');
  const [eventCategory, setEventCategory] = useState<'activity' | 'appointment' | 'celebration' | 'reminder'>('activity');

  const [showMomentModal, setShowMomentModal] = useState(false);
  const [momentTitle, setMomentTitle] = useState('');
  const [momentDate, setMomentDate] = useState(new Date().toISOString().split('T')[0]);
  const [momentNote, setMomentNote] = useState('');

  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  const selectedChild = familyChildren.find((c) => c.id === selectedChildId) ?? familyChildren[0];
  const activeChild = familyChildren.find((c) => c.id === activeChildId) ?? familyChildren[0];
  const currentWeekInfo = getWeekData(pregnancyCurrentWeek);

  // Name of the Day
  const nameOfTheDay = babyNamesDatabase[0]; // Iniyan

  // Filtered baby names with complete A-Z
  const alphabet = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
  const filteredBabyNames = babyNamesDatabase.filter((n) => {
    const matchesSearch =
      n.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
      n.meaning.toLowerCase().includes(nameSearch.toLowerCase()) ||
      n.origin.toLowerCase().includes(nameSearch.toLowerCase());
    if (!matchesSearch) return false;

    if (nameLetterFilter !== 'ALL' && !n.name.toUpperCase().startsWith(nameLetterFilter)) {
      return false;
    }

    if (nameOriginFilter === 'tamil' && !n.origin.toLowerCase().includes('tamil')) return false;
    if (nameOriginFilter === 'indian' && !n.origin.toLowerCase().includes('sanskrit') && !n.origin.toLowerCase().includes('tamil')) return false;
    if (nameOriginFilter === 'global' && n.origin.toLowerCase().includes('tamil')) return false;

    if (nameGenderFilter === 'fav') return favoriteBabyNames.includes(n.id);
    if (nameGenderFilter === 'all') return true;
    return n.gender === nameGenderFilter;
  });

  const favoriteNamesList = babyNamesDatabase.filter((n) => favoriteBabyNames.includes(n.id));

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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-100 flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="bg-slate-900 text-white shadow-soft sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-soft">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black font-display text-base tracking-tight text-white flex items-center gap-1.5">
                  <span>{greeting.title}</span>
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setTempNameInput(parentName);
                    setIsEditingName(true);
                  }}
                  className="text-xs text-slate-400 hover:text-emerald-300 transition-colors p-0.5 cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg px-1.5 py-0.5 flex items-center gap-1"
                  title="Change your name"
                >
                  <span className="text-[10px]">✏️ Edit</span>
                </button>
              </div>
              <p className="text-[10px] text-emerald-400 font-bold truncate max-w-xs sm:max-w-md">
                {greeting.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            ← Back to Kidora World 🏠
          </button>
        </div>

        {/* Real-App Main Hub Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800 pt-1">
          {[
            { id: 'overview' as MainHub, label: 'Dashboard', emoji: '🏠' },
            { id: 'sleep' as MainHub, label: 'Sleep Measure', emoji: '😴' },
            { id: 'hydration' as MainHub, label: 'Hydration', emoji: '💧' },
            { id: 'reviews' as MainHub, label: 'Feedback & Reviews', emoji: '⭐' },
            { id: 'cycle' as MainHub, label: 'Cycle & Period', emoji: '🌸' },
            { id: 'pregnancy' as MainHub, label: 'Pregnancy Journey', emoji: '🤰' },
            { id: 'baby' as MainHub, label: 'Baby Hub', emoji: '👶' },
            {
              id: 'children' as MainHub,
              label: `My Children ${pendingApprovalsCount > 0 ? `(${pendingApprovalsCount})` : ''}`,
              emoji: '🧒',
            },
            { id: 'calendar' as MainHub, label: 'Family Planner', emoji: '📅' },
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
        {/* HUB 0: REAL-APP MAIN DASHBOARD */}
        {/* ======================================================== */}
        {activeHub === 'overview' && (
          <div className="space-y-6 animate-pop-in">
            {/* 💖 FRIENDLY PARENT THOUGHT & ENCOURAGEMENT CARD */}
            <div
              onClick={() => setAffirmationIdx((prev) => (prev + 1) % parentAffirmations.length)}
              className="btn-press bg-gradient-to-r from-amber-50 via-rose-50 to-indigo-50 border border-amber-200/80 rounded-3xl p-4 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 transition-all shadow-xs"
              title="Click to see another friendly reminder"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💖</span>
                <div>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">
                    Parent Friend Note • Tap to refresh
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 italic mt-0.5">
                    "{parentAffirmations[affirmationIdx]}"
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-black text-amber-800 bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs shrink-0">
                Next 💫
              </span>
            </div>

            {/* 🚀 EARN PREMIUM & REFERRAL PROGRAM DASHBOARD CARD */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-amber-300/40">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white/25 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Earn Premium 🚀
                  </span>
                  <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black">
                    👑 {premiumState.daysRemaining} Days Remaining
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white leading-tight">
                  Invite 3 Families → Get 90 Days Premium Free!
                </h3>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-amber-100 pt-1">
                  <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xl">🔐 Login today +1d</span>
                  <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xl">🎮 Complete adventure +1d</span>
                  <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xl">🏆 Join challenge +7d</span>
                  <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xl">👨‍👩‍👧 Invite 3 families +90d</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setEarnPremiumModalOpen(true)}
                  className="btn-press bg-white text-orange-600 font-black font-display text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-pop whitespace-nowrap cursor-pointer hover:bg-amber-50 text-center transition-transform hover:scale-105"
                >
                  View Rewards & Invite 🎁
                </button>
              </div>
            </div>

            {/* 🌟 1. "WHAT DID MY CHILD LEARN TODAY?" 5-SECOND CLARITY CARD */}
            {(() => {
              const todayStr = new Date().toISOString().split('T')[0];
              const todayLog = dailyLearningLogs.find((l) => l.date === todayStr) || dailyLearningLogs[0] || {
                minutesSpent: 18,
                xpEarned: 85,
                activitiesCount: 4,
                topics: [
                  { name: 'Fractions & Shapes', emoji: '🧮' },
                  { name: 'Phonics & Sight Words', emoji: '📚' },
                  { name: 'Planets & Dinosaurs', emoji: '🧪' },
                ],
              };

              return (
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 text-white shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                        Daily Learning Summary • 5-Second Scan
                      </span>
                      <h2 className="text-2xl font-black font-display mt-1">
                        What Did {activeChild?.name || 'My Child'} Learn Today?
                      </h2>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl font-display font-black text-xs self-start sm:self-auto">
                      ⏱️ {todayLog.minutesSpent} min learning · ⭐ {todayLog.xpEarned} XP earned
                    </div>
                  </div>

                  {/* Core Topics Covered */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                      Concepts & Topics Explored:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {todayLog.topics.map((t, idx) => (
                        <div
                          key={idx}
                          className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/25 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                        >
                          <span className="text-base">{t.emoji}</span>
                          <span>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 🌟 2. ESSENTIAL 6 METRIC TILES (NO OVERLOADED CONFUSING CHARTS) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">⏱️</div>
                <div className="text-lg font-black font-display text-slate-800">
                  {dailyLearningLogs[0]?.minutesSpent || 18}m
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Today's Time</div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">🎯</div>
                <div className="text-lg font-black font-display text-slate-800">
                  {activeChild?.activitiesCompletedCount || 4}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Activities Done</div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">⭐</div>
                <div className="text-lg font-black font-display text-amber-600">
                  {activeChild?.stars || 85}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Total XP / Stars</div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">🔥</div>
                <div className="text-lg font-black font-display text-orange-600">
                  {activeChild?.streak || 2} Days
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Current Streak</div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">🗺️</div>
                <div className="text-lg font-black font-display text-emerald-600">
                  5 / 5
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Worlds Unlocked</div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-center space-y-1">
                <div className="text-2xl">🏅</div>
                <div className="text-xs font-black font-display text-purple-700 line-clamp-1 mt-1">
                  Master Scribe
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Recent Award</div>
              </div>
            </div>

            {/* 🌟 2B. WELLNESS & PARENT COMMUNITY MEASURES ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sleep Quick Card */}
              <div
                onClick={() => setActiveHub('sleep')}
                className="btn-press bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-5 border border-indigo-200/80 shadow-soft cursor-pointer hover:border-indigo-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
                    😴
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full">
                    Sleep Measure
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-display text-slate-900">
                    {sleepLogs[0] ? `${sleepLogs[0].durationHours}h Rest` : '10.25h Rest'}
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {sleepLogs[0]?.notes || 'Sound, uninterrupted deep sleep routine'}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-indigo-600 flex items-center gap-1 pt-1 border-t border-indigo-100">
                  <span>View Trends & Log</span>
                  <span>→</span>
                </div>
              </div>

              {/* Hydration Quick Card */}
              <div
                onClick={() => setActiveHub('hydration')}
                className="btn-press bg-gradient-to-br from-sky-50 to-teal-50 rounded-3xl p-5 border border-sky-200/80 shadow-soft cursor-pointer hover:border-sky-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xl shadow-xs">
                    💧
                  </div>
                  <span className="text-[10px] font-black uppercase text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
                    Hydration
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-display text-slate-900">
                    {hydrationData.dailyIntakeByChild[activeChildId] || 5} / {hydrationData.targetGlasses} Glasses
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {Math.round(((hydrationData.dailyIntakeByChild[activeChildId] || 5) / hydrationData.targetGlasses) * 100)}% of daily target reached
                  </p>
                </div>
                <div className="text-[11px] font-bold text-sky-600 flex items-center gap-1 pt-1 border-t border-sky-100">
                  <span>+ Quick Add Water</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feedback & Reviews Quick Card */}
              <div
                onClick={() => setActiveHub('reviews')}
                className="btn-press bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200/80 shadow-soft cursor-pointer hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
                    ⭐
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    Reviews & Voice
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-display text-slate-900">
                    4.9 ★ Community
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {parentReviews.length} Verified Parent Reviews & Suggestions
                  </p>
                </div>
                <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1 border-t border-amber-100">
                  <span>Give Star Feedback</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* 3. YOUR FAMILY QUICK BAR */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    Family Profiles
                  </span>
                  <h2 className="text-xl font-black font-display text-slate-800">Your Family</h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddChildModal(true)}
                  className="btn-press text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl cursor-pointer"
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
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">
                            {child.gender === 'daughter' ? '👧' : child.gender === 'son' ? '👦' : '🧒'}
                          </span>
                          <div>
                            <h4 className="font-black font-display text-sm text-slate-800">{child.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">Age {child.age}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          ⭐ {child.stars ?? 0} XP
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200/60">
                        <span>🎖️ {child.totalAdventures ?? 0} Badges</span>
                        <span className="text-emerald-600 font-bold">🟢 Active Today</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedChildId(child.id);
                            setShowRecModal(true);
                          }}
                          className="btn-press flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-xs cursor-pointer text-center"
                        >
                          Send Challenge →
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedChildId(child.id);
                            setActiveHub('children');
                          }}
                          className="btn-press px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                        >
                          ⚙️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. "☀️ TODAY FOR YOUR FAMILY" 4 ACTION CARDS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black font-display text-slate-800 flex items-center gap-2">
                  <span>☀️</span> Today for Your Family
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. For Child */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      🧒 For {activeChild?.name || 'Child'}
                    </span>
                    <h4 className="text-base font-black font-display mt-2">10-Min Puzzle Quest</h4>
                    <p className="text-xs text-indigo-100 leading-relaxed mt-1">
                      Momo's pattern puzzle for logical thinking and +15 bonus stars.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedChildId(activeChild?.id || '');
                      setShowRecModal(true);
                    }}
                    className="btn-press bg-white text-indigo-700 font-bold text-xs py-2 px-3 rounded-xl shadow-xs hover:bg-indigo-50 cursor-pointer text-center"
                  >
                    Send to {activeChild?.name} ❤️
                  </button>
                </div>

                {/* 2. For You (Pregnancy) */}
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      🤰 For You
                    </span>
                    <h4 className="text-base font-black font-display mt-2">
                      Week {pregnancyCurrentWeek} Guide ({currentWeekInfo.fruitEmoji})
                    </h4>
                    <p className="text-xs text-rose-100 leading-relaxed mt-1">
                      Baby is size of a {currentWeekInfo.fruitComparison}. Read wellness & stretches.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHub('pregnancy');
                      setPregnancySubTab('journey');
                    }}
                    className="btn-press bg-white text-rose-700 font-bold text-xs py-2 px-3 rounded-xl shadow-xs hover:bg-rose-50 cursor-pointer text-center"
                  >
                    Read Week Guide →
                  </button>
                </div>

                {/* 3. For Baby */}
                <div className="bg-gradient-to-br from-sky-500 to-teal-600 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      👶 For Baby
                    </span>
                    <h4 className="text-base font-black font-display mt-2">Talk & Smile Play</h4>
                    <p className="text-xs text-sky-100 leading-relaxed mt-1">
                      Spend 5 minutes making responsive face-to-face vocal coos and smiles.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveHub('baby');
                      setBabySubTab('development');
                    }}
                    className="btn-press bg-white text-sky-800 font-bold text-xs py-2 px-3 rounded-xl shadow-xs hover:bg-sky-50 cursor-pointer text-center"
                  >
                    View Activity →
                  </button>
                </div>

                {/* 4. Family Together */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      ❤️ Together
                    </span>
                    <h4 className="text-base font-black font-display mt-2">Rainbow Color Safari</h4>
                    <p className="text-xs text-amber-100 leading-relaxed mt-1">
                      Find 5 colorful objects around the house together before dinner!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveHub('calendar')}
                    className="btn-press bg-white text-amber-800 font-bold text-xs py-2 px-3 rounded-xl shadow-xs hover:bg-amber-50 cursor-pointer text-center"
                  >
                    Start Mission 🚀
                  </button>
                </div>
              </div>
            </div>

            {/* 3. FAMILY JOURNEY & TOOLS HUB DIRECTORY TILES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Pregnancy Journey', desc: 'Week-by-week guide', emoji: '🤰', hub: 'pregnancy' as MainHub, sub: 'journey' },
                { title: 'Baby Development', desc: '0–3y 5-Domain stages', emoji: '👶', hub: 'baby' as MainHub, sub: 'development' },
                { title: 'Baby Moments', desc: 'Private milestone timeline', emoji: '📸', hub: 'baby' as MainHub, sub: 'moments' },
                { title: 'Baby Names Directory', desc: `${favoriteBabyNames.length} saved favorites ❤️`, emoji: '👶', hub: 'baby' as MainHub, sub: 'names' },
                { title: 'Weight Tracker', desc: 'Supportive health curve', emoji: '⚖️', hub: 'pregnancy' as MainHub, sub: 'weight' },
                { title: 'Pregnancy Foods', desc: 'Superfoods & safety', emoji: '🥗', hub: 'pregnancy' as MainHub, sub: 'foods' },
                { title: 'Exercise Guide', desc: 'Trimester safe stretches', emoji: '🧘‍♀️', hub: 'pregnancy' as MainHub, sub: 'exercises' },
                { title: 'Family Planner', desc: 'Weekly schedule & dates', emoji: '📅', hub: 'calendar' as MainHub, sub: '' },
              ].map((tile, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveHub(tile.hub);
                    if (tile.hub === 'pregnancy') setPregnancySubTab(tile.sub as any);
                    if (tile.hub === 'baby') setBabySubTab(tile.sub as any);
                  }}
                  className="btn-press bg-white p-4 rounded-3xl border border-slate-200 shadow-soft text-left hover:border-slate-300 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                >
                  <span className="text-3xl">{tile.emoji}</span>
                  <div>
                    <h4 className="font-black font-display text-xs text-slate-800">{tile.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-tight">{tile.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB: PRIVATE PERIOD & OVULATION TRACKER */}
        {/* ======================================================== */}
        {activeHub === 'cycle' && (
          <div className="animate-pop-in">
            <PeriodTracker />
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 1: UNIFIED PREGNANCY JOURNEY */}
        {/* ======================================================== */}
        {activeHub === 'pregnancy' && (
          <div className="space-y-6 animate-pop-in">
            {/* Sub-Nav Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft">
              {[
                { id: 'journey' as const, label: 'Weekly Journey', emoji: '🤰' },
                { id: 'weight' as const, label: 'Weight Tracker', emoji: '⚖️' },
                { id: 'foods' as const, label: 'Food Guide', emoji: '🥗' },
                { id: 'exercises' as const, label: 'Safe Exercises', emoji: '🧘‍♀️' },
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

            {/* Medical Disclaimer Banner */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 leading-relaxed flex items-start gap-3">
              <span className="text-lg">🩺</span>
              <p>{medicalDisclaimer}</p>
            </div>

            {/* 1. Weekly Journey Integrated Flow */}
            {pregnancySubTab === 'journey' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                {/* Week Selector Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                      Trimester {currentWeekInfo.trimester} • Week {pregnancyCurrentWeek} of 40
                    </span>
                    <h2 className="text-2xl font-black font-display text-slate-800 mt-0.5">
                      Baby is the size of a {currentWeekInfo.fruitComparison} {currentWeekInfo.fruitEmoji}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Jump to Week:</span>
                    <select
                      value={pregnancyCurrentWeek}
                      onChange={(e) => setPregnancyWeek(parseInt(e.target.value, 10))}
                      className="text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white shadow-xs"
                    >
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                        <option key={w} value={w}>
                          Week {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Integrated Journey Cascade Cards */}
                <div className="space-y-4">
                  {/* Step 1: Baby Development */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                      <span>👶</span> Baby Development ({currentWeekInfo.lengthCm} cm • {currentWeekInfo.weightGrams} g)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentWeekInfo.babyDevelopment}
                    </p>
                  </div>

                  {/* Step 2: Mother's Wellbeing */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                      <span>🌸</span> Mother's Wellbeing & Changes
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentWeekInfo.motherBody} 💡 <em>{currentWeekInfo.weeklyTip}</em>
                    </p>
                  </div>

                  {/* Step 3: Food & Nutrition */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                      <span>🥗</span> Weekly Nutrition Focus
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentWeekInfo.superfoods}
                    </p>
                  </div>

                  {/* Step 4: Safe Exercise */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                      <span>🧘‍♀️</span> Recommended Safe Activity
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentWeekInfo.safeExercise}
                    </p>
                  </div>

                  {/* Step 5: Doctor Question */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                      <span>🩺</span> Question for Your Doctor
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                      "{currentWeekInfo.doctorQuestion}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Weight Gain Tracker */}
            {pregnancySubTab === 'weight' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black font-display text-slate-800">
                      My Weight Journey
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{weightTrackingGuidance}</p>
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
                    <span>Weight History (kg)</span>
                    <span className="text-slate-400">Personal Health Record</span>
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

                {/* Weight Log List */}
                <div className="space-y-2">
                  {pregnancyWeightLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                    >
                      <span className="font-bold text-slate-800">Week {entry.week}</span>
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

            {/* 3. Foods Guide */}
            {pregnancySubTab === 'foods' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                  <h3 className="font-black font-display text-base text-slate-800 flex items-center gap-2">
                    <span>🥗</span> Pregnancy Superfoods
                  </h3>
                  <div className="space-y-3">
                    {pregnancyFoodGuide
                      .filter((f) => f.category === 'superfood')
                      .map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-600">{item.reason}</p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                  <h3 className="font-black font-display text-base text-slate-800 flex items-center gap-2">
                    <span>⚠️</span> Foods to Avoid
                  </h3>
                  <div className="space-y-3">
                    {pregnancyFoodGuide
                      .filter((f) => f.category === 'avoid')
                      .map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-600">{item.reason}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Exercise Guide */}
            {pregnancySubTab === 'exercises' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prenatalExercises.map((ex, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{ex.emoji}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {ex.trimesterSafe}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">{ex.title}</h4>
                    <p className="text-xs text-slate-600">{ex.benefit}</p>
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      {ex.steps}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 2: BABY HUB & MOMENTS */}
        {/* ======================================================== */}
        {activeHub === 'baby' && (
          <div className="space-y-6 animate-pop-in">
            {/* Sub-Nav Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft">
              {[
                { id: 'development' as const, label: '0–3y Development & Play', emoji: '🧠' },
                { id: 'moments' as const, label: '📸 Baby Moments Timeline', emoji: '📸' },
                { id: 'names' as const, label: `Find Baby Name (${favoriteBabyNames.length} ❤️)`, emoji: '👶' },
                { id: 'compare' as const, label: 'Compare Favorites', emoji: '⚖️' },
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

            {/* 1. 5-Domain Development Stages & "Try This Together" */}
            {babySubTab === 'development' && (
              <div className="space-y-4">
                {babyMilestoneStages.map((stage, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <span className="text-3xl">{stage.emoji}</span>
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                          {stage.ageRange}
                        </span>
                        <h3 className="text-xl font-black font-display text-slate-800">{stage.stageName}</h3>
                      </div>
                    </div>

                    {/* 5 Domains Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="font-black font-display text-indigo-600 flex items-center gap-1">
                          <span>🧠</span> Cognitive
                        </span>
                        <p className="text-slate-600 leading-snug">{stage.cognitive}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="font-black font-display text-teal-600 flex items-center gap-1">
                          <span>👀</span> Sensory
                        </span>
                        <p className="text-slate-600 leading-snug">{stage.sensory}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="font-black font-display text-amber-600 flex items-center gap-1">
                          <span>🗣️</span> Communication
                        </span>
                        <p className="text-slate-600 leading-snug">{stage.communication}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="font-black font-display text-rose-600 flex items-center gap-1">
                          <span>🏃</span> Movement
                        </span>
                        <p className="text-slate-600 leading-snug">{stage.movement}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 sm:col-span-2 md:col-span-2">
                        <span className="font-black font-display text-pink-600 flex items-center gap-1">
                          <span>❤️</span> Social & Emotional
                        </span>
                        <p className="text-slate-600 leading-snug">{stage.social}</p>
                      </div>
                    </div>

                    {/* "TRY THIS TOGETHER" INTERACTIVE ACTION CARD */}
                    <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-sky-700">
                          Try This Together
                        </span>
                        <h4 className="font-bold text-sm text-slate-800">{stage.tryThisTogether.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {stage.tryThisTogether.description}
                        </p>
                      </div>
                      <span className="text-3xl shrink-0">{stage.tryThisTogether.emoji}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Baby Moments Private Timeline */}
            {babySubTab === 'moments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black font-display text-slate-800">
                      Our Baby's Journey ❤️
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Private memory timeline stored safely on your device.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {babyMoments.map((moment) => (
                    <div
                      key={moment.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{moment.emoji}</span>
                        <div>
                          <h4 className="font-black font-display text-sm text-slate-800">{moment.title}</h4>
                          {moment.notes && <p className="text-xs text-slate-600 italic">"{moment.notes}"</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
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
                          placeholder="Note / memory..."
                          className="flex-1 sm:w-48 text-xs font-medium p-2 rounded-xl bg-white border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Advanced Baby Names Directory */}
            {babySubTab === 'names' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
                {/* Name of the Day Spotlight */}
                <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 rounded-3xl p-5 text-white shadow-soft flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      ✨ Name of the Day
                    </span>
                    <h4 className="text-xl font-black font-display">{nameOfTheDay.name}</h4>
                    <p className="text-xs text-amber-100">"{nameOfTheDay.meaning}" • {nameOfTheDay.origin}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavoriteBabyName(nameOfTheDay.id)}
                    className="text-2xl p-2 bg-white/20 rounded-2xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    {favoriteBabyNames.includes(nameOfTheDay.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                {/* Filters & Search */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                        placeholder="Search by name, meaning, or origin..."
                        className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                      {[
                        { id: 'all' as const, label: 'All' },
                        { id: 'boy' as const, label: '👦 Boys' },
                        { id: 'girl' as const, label: '👧 Girls' },
                        { id: 'unisex' as const, label: '✨ Unisex' },
                        { id: 'fav' as const, label: `❤️ (${favoriteBabyNames.length})` },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setNameGenderFilter(f.id)}
                          className={`btn-press text-xs font-bold px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                            nameGenderFilter === f.id
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Origin Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                    <span className="text-[10px] font-black uppercase text-slate-400 mr-1 tracking-wider shrink-0">
                      Origin:
                    </span>
                    {[
                      { id: 'all' as const, label: '🌟 All Origins' },
                      { id: 'tamil' as const, label: '🌺 Tamil Heritage (75+)' },
                      { id: 'indian' as const, label: '🇮🇳 Indian / Sanskrit' },
                      { id: 'global' as const, label: '🌍 Global & Nature' },
                    ].map((origin) => (
                      <button
                        key={origin.id}
                        type="button"
                        onClick={() => setNameOriginFilter(origin.id)}
                        className={`btn-press text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors ${
                          nameOriginFilter === origin.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                            : 'bg-amber-50/70 border border-amber-200/80 text-amber-900 hover:bg-amber-100'
                        }`}
                      >
                        {origin.label}
                      </button>
                    ))}
                  </div>

                  {/* A-Z Letter Filter Bar */}
                  <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
                    {alphabet.map((letter) => (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => setNameLetterFilter(letter)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          nameLetterFilter === letter
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Names Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredBabyNames.map((n) => {
                    const isFav = favoriteBabyNames.includes(n.id);
                    return (
                      <div
                        key={n.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 flex flex-col justify-between"
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

            {/* 4. Compare Favorites Table */}
            {babySubTab === 'compare' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <h3 className="text-xl font-black font-display text-slate-800">
                  Compare Favourite Names ({favoriteNamesList.length})
                </h3>

                {favoriteNamesList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase">
                          <th className="py-3 px-2">Name</th>
                          <th className="py-3 px-2">Gender</th>
                          <th className="py-3 px-2">Origin</th>
                          <th className="py-3 px-2">Meaning</th>
                          <th className="py-3 px-2">Remove</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {favoriteNamesList.map((n) => (
                          <tr key={n.id} className="hover:bg-slate-50">
                            <td className="py-3 px-2 font-black font-display text-slate-800">{n.name}</td>
                            <td className="py-3 px-2 text-slate-600 capitalize">{n.gender}</td>
                            <td className="py-3 px-2 text-slate-600">{n.origin}</td>
                            <td className="py-3 px-2 text-slate-600 italic">"{n.meaning}"</td>
                            <td className="py-3 px-2">
                              <button
                                type="button"
                                onClick={() => toggleFavoriteBabyName(n.id)}
                                className="text-rose-500 font-bold hover:underline cursor-pointer"
                              >
                                Remove ❤️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    No favourite names saved yet. Browse the Baby Names tab and tap ❤️ to add to your compare list!
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 3: MY CHILDREN & CO-LEARNING */}
        {/* ======================================================== */}
        {activeHub === 'children' && selectedChild && (
          <div className="space-y-6 animate-pop-in">
            {/* Child Selector */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Configuring Explorer
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

            {/* 1. WEEKLY ADVENTURE DOMAIN STARS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h3 className="font-black font-display text-base text-slate-800">
                🎯 {selectedChild.name}'s Weekly Learning Progress
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                  <span className="text-xs font-bold text-indigo-700">🧮 Mathematics</span>
                  <div className="text-base text-amber-500 font-bold">⭐⭐⭐⭐ (85%)</div>
                  <p className="text-[10px] text-slate-500">Addition & counting confidence</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <span className="text-xs font-bold text-emerald-700">🌳 Phonics & Reading</span>
                  <div className="text-base text-amber-500 font-bold">⭐⭐⭐ (70%)</div>
                  <p className="text-[10px] text-slate-500">Letter sound recognition</p>
                </div>
                <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-1">
                  <span className="text-xs font-bold text-pink-700">🎨 Creativity & Art</span>
                  <div className="text-base text-amber-500 font-bold">⭐⭐⭐⭐⭐ (100%)</div>
                  <p className="text-[10px] text-slate-500">Living sanctuary creations</p>
                </div>
              </div>
            </div>

            {/* 2. CONTROLS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Realm Access */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <h3 className="font-black font-display text-base text-slate-800">
                  🎮 Realm Access Permissions
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

              {/* Screen Time */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <h3 className="font-black font-display text-base text-slate-800">
                  ⏰ Daily Screen Time Limit
                </h3>
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
            </div>

            {/* 3. DANGER ZONE: DELETE CHILD PROFILE (COPPA) */}
            {familyChildren.length > 1 && (
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black font-display text-rose-900 flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>Delete {selectedChild.name}'s Profile</span>
                  </h4>
                  <p className="text-xs text-rose-700 font-medium mt-0.5">
                    Permanently removes this child's progress, stars, and living world records.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const entered = window.prompt(`Enter your 4-digit Parent PIN to permanently delete ${selectedChild.name}:`);
                    if (entered && verifyParentPin(entered)) {
                      deleteChild(selectedChild.id);
                    } else if (entered) {
                      alert('Incorrect Parent PIN. Deletion cancelled.');
                    }
                  }}
                  className="btn-press px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs cursor-pointer transition-colors shrink-0"
                >
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HUB 4: UNIFIED FAMILY CALENDAR & PLANNER */}
        {/* ======================================================== */}
        {activeHub === 'calendar' && (
          <div className="space-y-6 animate-pop-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black font-display text-slate-800">
                    📅 Unified Family Planner
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Single family schedule combining quests, activities, doctor checkups, and celebrations.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(true)}
                    className="btn-press bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChallengeModal(true)}
                    className="btn-press bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Mission
                  </button>
                </div>
              </div>

              {/* Master Calendar Feed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <h3 className="font-black font-display text-base text-slate-800">Data Portability (COPPA)</h3>
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

        {/* ======================================================== */}
        {/* HUB: SLEEP MEASURE */}
        {/* ======================================================== */}
        {activeHub === 'sleep' && <SleepTracker />}

        {/* ======================================================== */}
        {/* HUB: HYDRATION MEASURE */}
        {/* ======================================================== */}
        {activeHub === 'hydration' && <HydrationTracker />}

        {/* ======================================================== */}
        {/* HUB: FEEDBACK & REVIEWS */}
        {/* ======================================================== */}
        {activeHub === 'reviews' && <ParentFeedbackReviews />}
      </main>

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">Add Child Profile</h3>
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

      {showRecModal && selectedChild && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">
              Send Challenge to {selectedChild.name}
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
                  className="btn-press flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Send Challenge 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showChallengeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl shadow-pop max-w-sm w-full p-6 animate-pop-in">
            <h3 className="text-xl font-black font-display text-slate-800 mb-1">Create Family Mission</h3>
            <form onSubmit={handleAddChallengeSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={chalTitle}
                onChange={(e) => setChalTitle(e.target.value)}
                placeholder="Mission Title (e.g. Find 5 red objects)"
                className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
              />
              <textarea
                rows={2}
                required
                value={chalDesc}
                onChange={(e) => setChalDesc(e.target.value)}
                placeholder="Instructions..."
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="btn-press flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-3 rounded-xl bg-amber-500 text-white font-bold text-xs"
                >
                  Create Mission 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                placeholder="Event Title (e.g. Doctor Visit)"
                className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Date / Day"
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
                  Save Event ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Parent Name Editor Modal */}
      {isEditingName && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-pop-in">
          <form onSubmit={handleSaveParentName} className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-4xl">👋</span>
              <h3 className="text-lg font-black font-display text-slate-800">What is your name?</h3>
              <p className="text-xs text-slate-500">We'll personalize your greeting and dashboard notes!</p>
            </div>
            <input
              type="text"
              value={tempNameInput}
              onChange={(e) => setTempNameInput(e.target.value)}
              placeholder="e.g. Anish, Sarah, Mom, Dad"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
              autoFocus
              maxLength={25}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="btn-press flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-press flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-black font-display text-white shadow-soft cursor-pointer"
              >
                Save Name ✨
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Earn Premium Days & Referral Program Modal */}
      {earnPremiumModalOpen && (
        <EarnPremiumModal
          isOpen={earnPremiumModalOpen}
          onClose={() => setEarnPremiumModalOpen(false)}
        />
      )}
    </div>
  );
}
