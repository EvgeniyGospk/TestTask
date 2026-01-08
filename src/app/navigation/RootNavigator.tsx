import { Text, View } from 'react-native';

import { useSubscription } from '../providers/SubscriptionProvider';
import { PaywallScreen } from '../../screens/PaywallScreen/PaywallScreen';
import { MeditationsScreen } from '../../screens/MeditationsScreen/MeditationsScreen';
import { routes, RootStackParamList } from './routes';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isSubscribed, isReady } = useSubscription();

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-[#07070C]">
        <Text className="text-sm text-white/70">Loading…</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isSubscribed ? routes.Meditations : routes.Paywall}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.Paywall} component={PaywallScreen} />
      <Stack.Screen name={routes.Meditations} component={MeditationsScreen} />
    </Stack.Navigator>
  );
}
