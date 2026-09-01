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

  // Push a state into browser history so browser back triggers popstate instead of exiting
  if (typeof window !== 'undefined' && window.history) {
    try {
      window.history.pushState({ isModal: true, depth: modalBackStack.length }, '', window.location.href);
    } catch (e) {
      // ignore
    }
  }

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
        topHandler();
        return true;
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

  // 3. Already on home
  const now = Date.now();
  if (now - lastBackPressTime < 2000) {
    // Double tap back within 2s on Home -> allow exit if native
    if (Capacitor.isNativePlatform()) {
      CapApp.exitApp();
    }
    return false;
  } else {
    lastBackPressTime = now;
    // Push home state back to keep web user inside app
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ screen: 'home' }, '', '#home');
    }
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
    window.history.replaceState({ screen: initialScreen }, '', window.location.href);
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

    if (e.state && e.state.screen) {
      if (screenNavigateHandler) {
        screenNavigateHandler(e.state.screen);
      }
    } else {
      // Fallback: if no state, go to Home
      const current = currentScreenGetter ? currentScreenGetter() : 'home';
      if (current !== 'home' && screenNavigateHandler) {
        screenNavigateHandler('home');
      }
    }
  };

  window.addEventListener('popstate', handlePopState);

  // 2. Capacitor Native Android Back Button
  if (Capacitor.isNativePlatform()) {
    CapApp.addListener('backButton', ({ canGoBack }) => {
      const handled = handleGlobalBack();
      if (!handled && canGoBack) {
        window.history.back();
      }
    });
  }

  return () => {
    window.removeEventListener('popstate', handlePopState);
    if (Capacitor.isNativePlatform()) {
      CapApp.removeAllListeners();
    }
  };
}
