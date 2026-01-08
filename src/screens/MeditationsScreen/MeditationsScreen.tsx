import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { routes, RootStackParamList } from '../../app/navigation/routes';
import { useSubscription } from '../../app/providers/SubscriptionProvider';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { MeditationCard } from '../../features/meditations/components/MeditationCard';
import { meditations } from '../../features/meditations/data/meditations';
import { getMeditationAccess } from '../../features/meditations/domain/access';
import { generateAffirmation } from '../../services/ai/ai.service';
import { Mood } from '../../services/ai/ai.types';

type Props = StackScreenProps<RootStackParamList, typeof routes.Meditations>;

export function MeditationsScreen({ navigation }: Props) {
  const { isSubscribed } = useSubscription();

  const data = useMemo(() => meditations, []);

  return (
    <Screen>
      <FlatList
        className="flex-1"
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header isSubscribed={isSubscribed} />}
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

function Header({ isSubscribed }: { isSubscribed: boolean }) {
  const [mood, setMood] = useState<Mood | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <View className="mb-5">
      <View className="mb-4">
        <Text className="text-3xl font-bold text-white">Meditations</Text>
        <Text className="mt-2 text-sm text-white/70">
          {isSubscribed ? 'Premium активен — все сессии доступны.' : 'Часть сессий заблокирована Premium.'}
        </Text>
      </View>

      <View className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-5">
        <Text className="text-base font-semibold text-white">AI Настрой дня</Text>
        <Text className="mt-2 text-sm text-white/70">
          Выбери настроение и получи короткую аффирмацию.
        </Text>

        <View className="mt-4 flex-row gap-3">
          <MoodChip
            emoji="🙂"
            label="Спокойно"
            selected={mood === 'calm'}
            onPress={() => setMood('calm')}
          />
          <MoodChip
            emoji="😐"
            label="Нейтрально"
            selected={mood === 'neutral'}
            onPress={() => setMood('neutral')}
          />
          <MoodChip
            emoji="😣"
            label="Стресс"
            selected={mood === 'stressed'}
            onPress={() => setMood('stressed')}
          />
        </View>

        <View className="mt-4">
          <Button
            title={isGenerating ? 'Генерируем…' : 'Сгенерировать'}
            loading={isGenerating}
            onPress={async () => {
              if (!mood) {
                Alert.alert('Выбери настроение', 'Нужно выбрать один из 3 вариантов.');
                return;
              }
              try {
                setIsGenerating(true);
                const res = await generateAffirmation(mood);
                setResult(res.text);
              } catch {
                Alert.alert('Ошибка', 'Не удалось сгенерировать текст. Попробуй ещё раз.');
              } finally {
                setIsGenerating(false);
              }
            }}
          />
        </View>

        {result ? (
          <View className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
            <Text className="text-sm text-white/90">{result}</Text>
          </View>
        ) : null}
      </View>

      <Text className="mb-3 text-base font-semibold text-white">Сессии</Text>
    </View>
  );
}

function MoodChip({
  emoji,
  label,
  selected,
  onPress,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const border = selected ? 'border-emerald-300/60' : 'border-white/10';
  const bg = selected ? 'bg-emerald-400/15' : 'bg-white/5';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`flex-1 rounded-2xl border ${border} ${bg} px-3 py-3`}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      <Text className="text-xl">{emoji}</Text>
      <Text className="mt-1 text-xs font-semibold text-white/80">{label}</Text>
    </Pressable>
  );
}
