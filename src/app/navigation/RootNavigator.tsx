import { createStackNavigator } from '@react-navigation/stack';

import { routes, RootStackParamList } from './routes';
import { PaywallScreen } from '../../screens/PaywallScreen/PaywallScreen';
import { MeditationsScreen } from '../../screens/MeditationsScreen/MeditationsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.Paywall} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.Paywall} component={PaywallScreen} />
      <Stack.Screen name={routes.Meditations} component={MeditationsScreen} />
    </Stack.Navigator>
  );
}
