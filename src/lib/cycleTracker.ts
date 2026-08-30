import type { PeriodTrackerData, CycleEntry } from './types';

export const defaultPeriodData: PeriodTrackerData = {
  lastPeriodStart: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  periodDurationDays: 5,
  cycleLengthDays: 28,
  reminderEnabled: true,
  cycles: [
    {
      id: 'cycle-prev-2',
      startDate: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      flow: 'medium',
      symptoms: ['Mild Cramps'],
      notes: 'Standard 28-day cycle',
    },
    {
      id: 'cycle-prev-1',
      startDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      flow: 'medium',
      symptoms: ['Fatigue'],
      notes: 'Felt well rested',
    },
    {
      id: 'cycle-current',
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      flow: 'medium',
      symptoms: [],
      notes: 'Current active cycle',
    },
  ],
};

export interface CycleCalculations {
  lastStartDate: Date;
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  daysUntilNextPeriod: number;
  currentCycleDay: number;
  cyclePhase: 'period' | 'follicular' | 'ovulation' | 'luteal';
}

export function calculateCycleEstimates(data: PeriodTrackerData): CycleCalculations {
  const lastStart = new Date(data.lastPeriodStart);
  // Default to today if invalid
  const validLastStart = isNaN(lastStart.getTime()) ? new Date() : lastStart;

  const cycleLen = Math.max(21, Math.min(45, data.cycleLengthDays || 28));
  const periodDuration = Math.max(2, Math.min(10, data.periodDurationDays || 5));

  // Next Period Start
  const nextStart = new Date(validLastStart);
  nextStart.setDate(nextStart.getDate() + cycleLen);

  // Next Period End
  const nextEnd = new Date(nextStart);
  nextEnd.setDate(nextEnd.getDate() + periodDuration - 1);

  // Estimated Ovulation: approximately 14 days before next expected period
  const ovulation = new Date(nextStart);
  ovulation.setDate(ovulation.getDate() - 14);

  // Estimated Fertile Window: 5 days before ovulation up to ovulation day
  const fertileStart = new Date(ovulation);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = nextStart.getTime() - today.getTime();
  const daysUntilNext = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayFromLastStart = Math.floor((today.getTime() - validLastStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const currentCycleDay = Math.max(1, dayFromLastStart);

  let cyclePhase: 'period' | 'follicular' | 'ovulation' | 'luteal' = 'follicular';
  if (currentCycleDay <= periodDuration) {
    cyclePhase = 'period';
  } else if (today >= fertileStart && today <= fertileEnd) {
    cyclePhase = 'ovulation';
  } else if (today < fertileStart) {
    cyclePhase = 'follicular';
  } else {
    cyclePhase = 'luteal';
  }

  return {
    lastStartDate: validLastStart,
    nextPeriodStart: nextStart,
    nextPeriodEnd: nextEnd,
    ovulationDate: ovulation,
    fertileWindowStart: fertileStart,
    fertileWindowEnd: fertileEnd,
    daysUntilNextPeriod: daysUntilNext,
    currentCycleDay,
    cyclePhase,
  };
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
