import '../../global.css';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}
