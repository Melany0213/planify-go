import { Text, View } from 'react-native';

import type { TaskCategory } from '../types';

const LABELS: Record<TaskCategory, string> = {
  trabajo: 'Trabajo',
  estudio: 'Estudio',
  personal: 'Personal',
};

const BG: Record<TaskCategory, string> = {
  trabajo: 'bg-accent/15 dark:bg-accent-soft/20',
  estudio: 'bg-sky-500/15 dark:bg-sky-400/20',
  personal: 'bg-emerald-500/15 dark:bg-emerald-400/20',
};

const TEXT: Record<TaskCategory, string> = {
  trabajo: 'text-accent dark:text-accent-soft',
  estudio: 'text-sky-600 dark:text-sky-300',
  personal: 'text-emerald-600 dark:text-emerald-300',
};

export function CategoryPill({ category }: { category: TaskCategory }) {
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${BG[category]}`}>
      <Text className={`text-xs font-medium ${TEXT[category]}`}>{LABELS[category]}</Text>
    </View>
  );
}

export const CATEGORY_OPTIONS: TaskCategory[] = ['trabajo', 'estudio', 'personal'];
export const categoryLabel = (category: TaskCategory): string => LABELS[category];
