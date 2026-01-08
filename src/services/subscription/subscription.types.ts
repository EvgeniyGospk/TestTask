export type SubscriptionPlan = 'monthly' | 'yearly';

export type SubscriptionState = {
  isSubscribed: boolean;
  selectedPlan: SubscriptionPlan | null;
  updatedAt: number;
};

