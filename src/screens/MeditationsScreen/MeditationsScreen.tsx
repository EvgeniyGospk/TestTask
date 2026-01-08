import { Alert, FlatList, Pressable, Text, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { routes, RootStackParamList } from '../../app/navigation/routes';
import { useSubscription } from '../../app/providers/SubscriptionProvider';
import { Screen } from '../../components/ui/Screen';
import { MeditationCard } from '../../features/meditations/components/MeditationCard';
import { meditations } from '../../features/meditations/data/meditations';
import { getMeditationAccess } from '../../features/meditations/domain/access';

type Props = StackScreenProps<RootStackParamList, typeof routes.Meditations>;

export function MeditationsScreen({ navigation }: Props) {
  const { isSubscribed } = useSubscription();

  return (
    <Screen>
      <FlatList
        className="flex-1"
        data={meditations}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Header
            isSubscribed={isSubscribed}
            onOpenPaywall={() => navigation.navigate(routes.Paywall)}
            onOpenAI={() => navigation.navigate(routes.MoodAI)}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
        renderItem={({ item }) => {
          const { locked } = getMeditationAccess(item, isSubscribed);
          return (
            <MeditationCard
              session={item}
              locked={locked}
              onPress={() => {
                if (locked) {
                  navigation.navigate(routes.Paywall);
                  return;
                }
                Alert.alert('Сессия', `Запуск: ${item.title} (${item.durationMinutes} мин)`);
              }}
            />
          );
        }}
      />
    </Screen>
  );
}

function Header({
  isSubscribed,
  onOpenPaywall,
  onOpenAI,
}: {
  isSubscribed: boolean;
  onOpenPaywall: () => void;
  onOpenAI: () => void;
}) {
  return (
    <View className="mb-5">
      <View className="mb-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white">Meditations</Text>
            <Text className="mt-2 text-sm text-white/70">
              {isSubscribed
                ? 'Premium активен — все сессии доступны.'
                : 'Часть сессий заблокирована Premium.'}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onOpenPaywall}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <Text className="text-xs font-semibold text-white/80">Premium</Text>
          </Pressable>
        </View>
      </View>

      <View className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-5">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">AI Настрой дня</Text>
            <Text className="mt-2 text-sm text-white/70">
              Быстрая аффирмация или мини‑медитация под настроение.
            </Text>
          </View>
          <Pressable
            testID="open-ai-screen"
            accessibilityRole="button"
            onPress={onOpenAI}
            className="rounded-2xl bg-white px-4 py-3"
            style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
          >
            <Text className="text-sm font-semibold text-black">Открыть</Text>
          </Pressable>
        </View>
      </View>

      <Text className="mb-3 text-base font-semibold text-white">Сессии</Text>
    </View>
  );
}
