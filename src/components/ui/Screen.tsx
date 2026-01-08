import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#07070C' }}>
      {scroll ? (
        <ScrollView contentContainerClassName="px-5 py-4" keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-5 py-4">{children}</View>
      )}
    </SafeAreaView>
  );
}
