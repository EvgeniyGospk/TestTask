import { Text, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import { routes, RootStackParamList } from './routes';

const Stack = createStackNavigator<RootStackParamList>();

type PaywallProps = StackScreenProps<RootStackParamList, typeof routes.Paywall>;
function PaywallPlaceholder({ navigation }: PaywallProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Paywall</Text>
      <Text onPress={() => navigation.navigate(routes.Meditations)} style={{ color: '#2563EB' }}>
        Try free (mock)
      </Text>
    </View>
  );
}

function MeditationsPlaceholder() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Meditations</Text>
      <Text style={{ color: '#6B7280' }}>Coming soon…</Text>
    </View>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.Paywall}>
      <Stack.Screen name={routes.Paywall} component={PaywallPlaceholder} />
      <Stack.Screen name={routes.Meditations} component={MeditationsPlaceholder} />
    </Stack.Navigator>
  );
}

