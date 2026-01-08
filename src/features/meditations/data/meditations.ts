import { ImageSourcePropType } from 'react-native';

import { meditationCovers } from '../../../assets/meditationCovers';

export type MeditationSession = {
  id: string;
  title: string;
  durationMinutes: number;
  cover: ImageSourcePropType;
  premiumOnly: boolean;
};

export const meditations: MeditationSession[] = [
  {
    id: 'm1',
    title: 'Morning Calm',
    durationMinutes: 7,
    cover: meditationCovers.calm,
    premiumOnly: false,
  },
  {
    id: 'm2',
    title: 'Focus Reset',
    durationMinutes: 10,
    cover: meditationCovers.focus,
    premiumOnly: false,
  },
  {
    id: 'm3',
    title: 'Deep Sleep Wind‑Down',
    durationMinutes: 12,
    cover: meditationCovers.sleep,
    premiumOnly: true,
  },
  {
    id: 'm4',
    title: 'Release Anxiety',
    durationMinutes: 8,
    cover: meditationCovers.calm,
    premiumOnly: true,
  },
  {
    id: 'm5',
    title: 'Gratitude Flow',
    durationMinutes: 6,
    cover: meditationCovers.focus,
    premiumOnly: false,
  },
  {
    id: 'm6',
    title: 'Premium Breath + Body Scan',
    durationMinutes: 15,
    cover: meditationCovers.sleep,
    premiumOnly: true,
  },
];

