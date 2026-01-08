import { Pressable, Text, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { routes, RootStackParamList } from '../../app/navigation/routes';
import { Screen } from '../../components/ui/Screen';

type Props = StackScreenProps<RootStackParamList, typeof routes.Paywall>;

export function PaywallScreen({ navigation }: Props) {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-white">ZenPulse Premium</Text>
        <Text className="mt-3 text-center text-sm text-white/70">
          Разблокируй премиальные медитации и AI “Настрой дня”.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate(routes.Meditations)}
          className="mt-6 rounded-2xl bg-white px-5 py-4"
          style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
        >
          <Text className="text-sm font-semibold text-black">Try free (mock)</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
