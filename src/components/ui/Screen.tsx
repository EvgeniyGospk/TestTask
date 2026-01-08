import { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#07070C' }}>
      <View className="flex-1 px-5 py-4">{children}</View>
    </SafeAreaView>
  );
}

