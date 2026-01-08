export const routes = {
  Paywall: 'Paywall',
  Meditations: 'Meditations',
  MoodAI: 'MoodAI',
} as const;

export type RootStackParamList = {
  [routes.Paywall]: undefined;
  [routes.Meditations]: undefined;
  [routes.MoodAI]: undefined;
};
