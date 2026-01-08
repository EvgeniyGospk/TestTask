import '../../global.css';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { SubscriptionProvider } from './providers/SubscriptionProvider';

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

