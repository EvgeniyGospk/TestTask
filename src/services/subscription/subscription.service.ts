import { delay } from '../../utils/delay';
import { getItem, removeItem, setItem } from '../storage/storage';
import { SubscriptionPlan, SubscriptionState } from './subscription.types';

const STORAGE_KEY = 'subscription:state';

const defaultState: SubscriptionState = {
  isSubscribed: false,
  selectedPlan: null,
  updatedAt: Date.now(),
};

export async function loadSubscriptionState(): Promise<SubscriptionState> {
  const raw = await getItem(STORAGE_KEY);
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as SubscriptionState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export async function saveSubscriptionState(state: SubscriptionState): Promise<void> {
  await setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function buyPremiumMock(plan: SubscriptionPlan): Promise<SubscriptionState> {
  await delay(800);
  const next: SubscriptionState = {
    isSubscribed: true,
    selectedPlan: plan,
    updatedAt: Date.now(),
  };
  await saveSubscriptionState(next);
  return next;
}

export async function resetSubscription(): Promise<SubscriptionState> {
  await removeItem(STORAGE_KEY);
  return defaultState;
}

