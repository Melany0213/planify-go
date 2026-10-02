import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'planify-go:theme';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark') setColorScheme(stored);
      })
      .catch(() => {});
  }, [setColorScheme]);

  const toggle = () => {
    const next = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(next);
    AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
  };

  return (
    <Pressable onPress={toggle} hitSlop={8} className="h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
      <Feather name={colorScheme === 'dark' ? 'sun' : 'moon'} size={18} color={colorScheme === 'dark' ? '#f4f1ff' : '#191030'} />
    </Pressable>
  );
}
