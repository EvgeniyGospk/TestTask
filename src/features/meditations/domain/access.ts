import { MeditationSession } from '../data/meditations';

export type MeditationAccess = {
  locked: boolean;
  reason: 'premium' | null;
};

export function getMeditationAccess(
  session: MeditationSession,
  isSubscribed: boolean,
): MeditationAccess {
  const locked = session.premiumOnly && !isSubscribed;
  return { locked, reason: locked ? 'premium' : null };
}

