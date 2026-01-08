import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  testID?: string;
};

export function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  testID,
}: Props) {
  const isDisabled = disabled || loading;
  const base =
    variant === 'primary'
      ? 'bg-white text-black'
      : 'bg-white/10 border border-white/15 text-white';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      className={`h-12 w-full flex-row items-center justify-center rounded-2xl ${base} ${
        isDisabled ? 'opacity-60' : 'opacity-100'
      }`}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      {loading ? (
        <View className="mr-2">
          <ActivityIndicator color={variant === 'primary' ? '#000' : '#fff'} />
        </View>
      ) : null}
      <Text
        className={`text-base font-semibold ${variant === 'primary' ? 'text-black' : 'text-white'}`}
      >
        {title}
      </Text>
    </Pressable>
  );
}

