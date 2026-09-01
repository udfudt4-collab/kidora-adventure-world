import { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from '@/lib/store';
import { setupNavigationHandlers, initBackButtonSupport } from '@/lib/navigation';
import { Onboarding } from '@/screens/Onboarding';
import { Home } from '@/screens/Home';
import { Adventure } from '@/screens/Adventure';
import { WorldMap } from '@/screens/WorldMap';
import { Pets } from '@/screens/Pets';
import { Create } from '@/screens/Create';
import { ParentDashboard } from '@/screens/ParentDashboard';
import { MyKidora } from '@/screens/MyKidora';
import { PlayHub } from '@/screens/PlayHub';
import { LearnHub } from '@/screens/LearnHub';
import { Challenges } from '@/screens/Challenges';
import { ParentsSection } from '@/screens/ParentsSection';
import { IdeaHub } from '@/screens/IdeaHub';
import { HydrationReminderModal } from '@/components/HydrationReminderModal';
import type { Screen } from '@/lib/types';

function AppContent() {
  const { profile, loading } = useApp();
  const [showHydrationReminder, setShowHydrationReminder] = useState(false);

  // Read initial screen from URL hash if available
  const [screen, setScreen] = useState<Screen>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const parsed = window.location.hash.replace('#', '') as Screen;
      const validScreens: Screen[] = [
        'home', 'play', 'learn', 'adventure', 'challenges', 'world',
        'collections', 'my-kidora', 'pets', 'create', 'parent', 'parents',
        'parent-guide', 'about', 'safety', 'privacy', 'terms', 'contact', 'ideas'
      ];
      if (validScreens.includes(parsed)) return parsed;
    }
    return 'home';
  });

  const screenRef = useRef<Screen>(screen);
  screenRef.current = screen;

  const navigate = (s: Screen, pushHistory = true) => {
    if (screenRef.current === s) return;
    setScreen(s);
    if (pushHistory && typeof window !== 'undefined' && window.history) {
      try {
        window.history.pushState({ screen: s }, '', `#${s}`);
      } catch (e) {
        // ignore
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Setup centralized navigation for back button
    setupNavigationHandlers(
      (newScreen) => navigate(newScreen, false),
      () => screenRef.current
    );

    const cleanup = initBackButtonSupport();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Automated Periodic Hydration Reminder Timer (with Sound)
  useEffect(() => {
    let reminderMins = 45;
    try {
      const stored = localStorage.getItem('kidora_hydration_reminder_mins');
      if (stored !== null) reminderMins = parseInt(stored, 10);
    } catch {}

    if (reminderMins <= 0) return;

    const intervalMs = reminderMins * 60 * 1000;
    const timer = setInterval(() => {
      if (profile) {
        setShowHydrationReminder(true);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-magic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce-soft mb-3">🌈</div>
          <div className="text-white font-display font-bold text-lg">Loading your adventure...</div>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Onboarding />;
  }

  const renderActiveScreen = () => {
    switch (screen) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'play': return <PlayHub onNavigate={navigate} />;
      case 'learn': return <LearnHub onNavigate={navigate} />;
      case 'adventure': return <Adventure onNavigate={navigate} />;
      case 'challenges': return <Challenges onNavigate={navigate} />;
      case 'world': return <WorldMap onNavigate={navigate} />;
      case 'collections': return <MyKidora onNavigate={navigate} />;
      case 'my-kidora': return <MyKidora onNavigate={navigate} />;
      case 'pets': return <Pets onNavigate={navigate} />;
      case 'create': return <Create onNavigate={navigate} />;
      case 'parent': return <ParentDashboard onNavigate={navigate} />;
      case 'parents': return <ParentsSection initialTab="guide" onNavigate={navigate} />;
      case 'parent-guide': return <ParentsSection initialTab="guide" onNavigate={navigate} />;
      case 'about': return <ParentsSection initialTab="about" onNavigate={navigate} />;
      case 'safety': return <ParentsSection initialTab="safety" onNavigate={navigate} />;
      case 'privacy': return <ParentsSection initialTab="privacy" onNavigate={navigate} />;
      case 'terms': return <ParentsSection initialTab="terms" onNavigate={navigate} />;
      case 'contact': return <ParentsSection initialTab="contact" onNavigate={navigate} />;
      case 'ideas': return <IdeaHub onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <>
      {renderActiveScreen()}
      <HydrationReminderModal
        isOpen={showHydrationReminder}
        onClose={() => setShowHydrationReminder(false)}
      />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
