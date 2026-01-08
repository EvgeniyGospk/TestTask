import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { routes, RootStackParamList } from '../../app/navigation/routes';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { generateAffirmation } from '../../services/ai/ai.service';
import { Mood } from '../../services/ai/ai.types';

type Props = StackScreenProps<RootStackParamList, typeof routes.MoodAI>;

export function MoodAIScreen({ navigation }: Props) {
  const [mood, setMood] = useState<Mood | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <Screen scroll>
      <View className="mb-4 flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate(routes.Meditations))}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
          style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        >
          <Text className="text-lg text-white">←</Text>
        </Pressable>
        <Text className="text-lg font-semibold text-white">AI Настрой дня</Text>
        <View className="h-10 w-10" />
      </View>

      <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <Text className="text-base font-semibold text-white">Выбери настроение</Text>
        <Text className="mt-2 text-sm text-white/70">
          Выбери один из вариантов и нажми “Сгенерировать” — получишь короткую аффирмацию.
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
    </Screen>
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

