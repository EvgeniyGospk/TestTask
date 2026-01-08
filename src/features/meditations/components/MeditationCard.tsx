import { Image, Pressable, Text, View } from 'react-native';

import { MeditationSession } from '../data/meditations';

type Props = {
  session: MeditationSession;
  locked: boolean;
  onPress: () => void;
};

export function MeditationCard({ session, locked, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      <View className="h-36 w-full">
        <Image source={session.cover} className="h-full w-full" resizeMode="cover" />
        {locked ? (
          <View className="absolute inset-0 items-center justify-center bg-black/55">
            <Text className="text-2xl">🔒</Text>
            <Text className="mt-2 text-sm font-semibold text-white/90">Premium</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-1 pr-3">
          <Text className="text-base font-semibold text-white" numberOfLines={1}>
            {session.title}
          </Text>
          <Text className="mt-1 text-xs text-white/70">{session.durationMinutes} min</Text>
        </View>
        {session.premiumOnly ? (
          <View className="rounded-full bg-white/10 px-3 py-1">
            <Text className="text-xs font-semibold text-white/80">Premium</Text>
          </View>
        ) : (
          <View className="rounded-full bg-emerald-500/15 px-3 py-1">
            <Text className="text-xs font-semibold text-emerald-200">Free</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

