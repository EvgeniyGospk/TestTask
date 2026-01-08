import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import { routes, RootStackParamList } from '../../app/navigation/routes';
import { useSubscription } from '../../app/providers/SubscriptionProvider';
import { Button } from '../../components/ui/Button';

type Props = StackScreenProps<RootStackParamList, typeof routes.Paywall>;

type Plan = 'monthly' | 'yearly';

const benefits = [
  'Премиум медитации без ограничений',
  'AI “Настрой дня” — персональные аффирмации',
  'Офлайн‑режим (в расширении)',
  'Новые сессии каждую неделю',
];

export function PaywallScreen({ navigation }: Props) {
  const { buyPremium } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [isBuying, setIsBuying] = useState(false);
  const canGoBack = navigation.canGoBack();

  const priceLabel = useMemo(() => {
    if (selectedPlan === 'monthly') return '299 ₽ / месяц';
    return '1 990 ₽ / год';
  }, [selectedPlan]);

  const secondaryLabel = useMemo(() => {
    if (selectedPlan === 'monthly') return 'Отмена в любой момент';
    return 'Экономия ~45% по сравнению с помесячной';
  }, [selectedPlan]);

  return (
    <LinearGradient
      colors={['#0A0A12', '#120A2B', '#0A0A12']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 28 }}
          keyboardShouldPersistTaps="handled"
        >
          {canGoBack ? (
            <View className="mb-3 flex-row justify-end">
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
                style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              >
                <Text className="text-lg font-semibold text-white">✕</Text>
              </Pressable>
            </View>
          ) : null}

          <View className="mb-6">
            <Text className="text-sm font-semibold text-white/70">ZenPulse Premium</Text>
            <Text className="mt-2 text-4xl font-bold text-white">Сфокусируйся{'\n'}и дыши глубже</Text>
            <Text className="mt-3 text-base text-white/70">
              Разблокируй премиальные сессии и получай ежедневную поддержку через AI‑настрой.
            </Text>
          </View>

          <View className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <Text className="text-base font-semibold text-white">Что входит в Premium</Text>
            <View className="mt-4 gap-3">
              {benefits.map((b) => (
                <View key={b} className="flex-row items-start">
                  <Text className="mr-3 mt-0.5 text-base text-white/80">✦</Text>
                  <Text className="flex-1 text-sm text-white/80">{b}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-base font-semibold text-white">Выбери тариф</Text>

            <PlanCard
              title="Годовой"
              subtitle="Лучшее предложение"
              price="1 990 ₽ / год"
              badge="Выгодно"
              selected={selectedPlan === 'yearly'}
              onPress={() => setSelectedPlan('yearly')}
            />
            <View className="h-3" />
            <PlanCard
              title="Месячный"
              subtitle="Гибкий вариант"
              price="299 ₽ / месяц"
              selected={selectedPlan === 'monthly'}
              onPress={() => setSelectedPlan('monthly')}
            />
          </View>

          <View className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <Text className="text-sm font-semibold text-white/80">{priceLabel}</Text>
            <Text className="mt-1 text-xs text-white/60">{secondaryLabel}</Text>

            <View className="mt-4">
              <Button
                testID="paywall-try-free"
                title="Попробовать бесплатно"
                loading={isBuying}
                onPress={async () => {
                  if (isBuying) return;
                  try {
                    setIsBuying(true);
                    await buyPremium(selectedPlan);
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      navigation.replace(routes.Meditations);
                    }
                  } finally {
                    setIsBuying(false);
                  }
                }}
              />
            </View>

            <Text className="mt-3 text-center text-xs text-white/50">
              Тестовый прототип: покупка имитируется, списаний нет.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  badge,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
  selected: boolean;
  onPress: () => void;
}) {
  const border = selected ? 'border-violet-300/60' : 'border-white/10';
  const bg = selected ? 'bg-violet-400/15' : 'bg-white/5';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`rounded-3xl border ${border} ${bg} p-5`}
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-base font-semibold text-white">{title}</Text>
          <Text className="mt-1 text-xs text-white/60">{subtitle}</Text>
        </View>
        {badge ? (
          <View className="rounded-full bg-violet-300/25 px-3 py-1">
            <Text className="text-xs font-semibold text-violet-100">{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text className="mt-3 text-sm font-semibold text-white/90">{price}</Text>
    </Pressable>
  );
}
