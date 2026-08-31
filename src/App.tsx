import { useState } from 'react';
import { AppProvider, useApp } from '@/lib/store';
import { Onboarding } from '@/screens/Onboarding';
import { Home } from '@/screens/Home';
import { Adventure } from '@/screens/Adventure';
import { WorldMap } from '@/screens/WorldMap';
import { Collections } from '@/screens/Collections';
import { Pets } from '@/screens/Pets';
import { Create } from '@/screens/Create';
import { ParentDashboard } from '@/screens/ParentDashboard';
import { MyKidora } from '@/screens/MyKidora';
import { PlayHub } from '@/screens/PlayHub';
import { LearnHub } from '@/screens/LearnHub';
import { Challenges } from '@/screens/Challenges';
import { ParentsSection } from '@/screens/ParentsSection';
import type { Screen } from '@/lib/types';

function AppContent() {
  const { profile, loading } = useApp();
  const [screen, setScreen] = useState<Screen>('home');

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

  const navigate = (s: Screen) => setScreen(s);

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
    default: return <Home onNavigate={navigate} />;
  }
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
