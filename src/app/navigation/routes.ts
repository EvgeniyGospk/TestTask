export const routes = {
  Paywall: 'Paywall',
  Meditations: 'Meditations',
} as const;

export type RootStackParamList = {
  [routes.Paywall]: undefined;
  [routes.Meditations]: undefined;
};

