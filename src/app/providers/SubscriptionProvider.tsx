import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  buyPremiumMock,
  loadSubscriptionState,
  resetSubscription,
} from '../../services/subscription/subscription.service';
import { SubscriptionPlan, SubscriptionState } from '../../services/subscription/subscription.types';

type SubscriptionContextValue = {
  isReady: boolean;
  isSubscribed: boolean;
  selectedPlan: SubscriptionPlan | null;
  buyPremium: (plan: SubscriptionPlan) => Promise<void>;
  reset: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SubscriptionState | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadSubscriptionState().then((loaded) => {
      if (!isMounted) return;
      setState(loaded);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<SubscriptionContextValue>(() => {
    const isReady = state !== null;
    return {
      isReady,
      isSubscribed: state?.isSubscribed ?? false,
      selectedPlan: state?.selectedPlan ?? null,
      buyPremium: async (plan) => {
        const next = await buyPremiumMock(plan);
        setState(next);
      },
      reset: async () => {
        const next = await resetSubscription();
        setState(next);
      },
    };
  }, [state]);

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}

