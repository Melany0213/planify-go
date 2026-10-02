import '../../global.css';

import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <TasksProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="day/[date]" options={{ presentation: 'card' }} />
          <Stack.Screen name="task/new" options={{ presentation: 'modal' }} />
        </Stack>
      </TasksProvider>
    </SafeAreaProvider>
  );
}
