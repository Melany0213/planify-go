import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-bg-light px-6 dark:bg-bg-dark">
      <Text className="text-lg font-semibold text-ink-light dark:text-ink-dark">
        Esta pantalla no existe
      </Text>
      <Link href="/" className="text-accent">
        Volver al inicio
      </Link>
    </View>
  );
}
