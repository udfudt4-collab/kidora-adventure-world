// Navigation & Back-Button Management System for Web and Native App
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import type { Screen } from './types';

type ModalCloseHandler = () => boolean | void; // return true if handled

const modalBackStack: ModalCloseHandler[] = [];
let screenNavigateHandler: ((screen: Screen) => void) | null = null;
let currentScreenGetter: (() => Screen) | null = null;
let lastBackPressTime = 0;

/**
 * Register a modal / overlay close handler.
 * When the user touches back (browser back or Android hardware back),
 * the top-most registered modal is closed first.
 */
export function registerModalBackHandler(handler: ModalCloseHandler): () => void {
  modalBackStack.push(handler);

  return () => {
    const idx = modalBackStack.indexOf(handler);
    if (idx !== -1) {
      modalBackStack.splice(idx, 1);
    }
  };
}

/**
 * Set the global screen navigator from App.tsx
 */
export function setupNavigationHandlers(
  onNavigate: (screen: Screen) => void,
  getCurrentScreen: () => Screen
) {
  screenNavigateHandler = onNavigate;
  currentScreenGetter = getCurrentScreen;
}

/**
 * Triggered on Back press (both browser popstate and Capacitor backButton)
 */
export function handleGlobalBack(): boolean {
  // 1. Check if any modal or overlay is open
  if (modalBackStack.length > 0) {
    const topHandler = modalBackStack.pop();
    if (topHandler) {
      try {
        const result = topHandler();
        if (result !== false) {
          return true;
        }
      } catch (err) {
        console.error('Error closing modal on back:', err);
      }
    }
  }

  // 2. Check if we are on a secondary screen (not home)
  const current = currentScreenGetter ? currentScreenGetter() : 'home';
  if (current !== 'home') {
    if (screenNavigateHandler) {
      screenNavigateHandler('home');
      return true;
    }
  }

  // 3. Already on home -> handle double-tap to exit on Android
  const now = Date.now();
  if (now - lastBackPressTime < 2000) {
    if (Capacitor.isNativePlatform()) {
      CapApp.exitApp();
    }
    return false;
  } else {
    lastBackPressTime = now;
    return true;
  }
}

/**
 * Initialize Web Popstate and Native Capacitor Back Listeners
 */
export function initBackButtonSupport() {
  if (typeof window === 'undefined') return;

  // Ensure initial history state is primed
  if (window.history && !window.history.state) {
    const initialScreen = (window.location.hash.replace('#', '') as Screen) || 'home';
    window.history.replaceState({ screen: initialScreen }, '', `#${initialScreen}`);
  }

  // 1. Web Browser Popstate (Back / Forward buttons & Mobile swipe-back)
  const handlePopState = (e: PopStateEvent) => {
    // If a modal was open, close it
    if (modalBackStack.length > 0) {
      const topHandler = modalBackStack.pop();
      if (topHandler) {
        topHandler();
        return;
      }
    }

    const validScreens: Screen[] = [
      'home', 'play', 'learn', 'adventure', 'challenges', 'world',
      'collections', 'my-kidora', 'pets', 'create', 'parent', 'parents',
      'parent-guide', 'about', 'safety', 'privacy', 'terms', 'contact', 'ideas'
    ];

    let targetScreen: Screen = 'home';
    if (e.state && e.state.screen && validScreens.includes(e.state.screen)) {
      targetScreen = e.state.screen;
    } else if (window.location.hash) {
      const parsed = window.location.hash.replace('#', '') as Screen;
      if (validScreens.includes(parsed)) {
        targetScreen = parsed;
      }
    }

    if (screenNavigateHandler) {
      screenNavigateHandler(targetScreen);
    }
  };

  window.addEventListener('popstate', handlePopState);

  // 2. Capacitor Native Android Back Button
  if (Capacitor.isNativePlatform()) {
    CapApp.addListener('backButton', () => {
      handleGlobalBack();
    });
  }

  return () => {
    window.removeEventListener('popstate', handlePopState);
    if (Capacitor.isNativePlatform()) {
      CapApp.removeAllListeners();
    }
  };
}
