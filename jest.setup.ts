import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 320, height: 640 };

  const SafeAreaInsetsContext = React.createContext(insets);
  const SafeAreaFrameContext = React.createContext(frame);

  return {
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: View,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets, frame },
  };
});

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
