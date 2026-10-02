import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import type { Task } from '../types';
import { CategoryPill } from './CategoryPill';

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl bg-surface-light p-4 dark:bg-surface-dark">
      <Pressable
        onPress={onToggle}
        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
          task.done ? 'border-accent bg-accent' : 'border-muted-light dark:border-muted-dark'
        }`}
      >
        {task.done && <Feather name="check" size={14} color="#ffffff" />}
      </Pressable>

      <View className="flex-1 gap-1.5">
        <Text
          className={`text-base font-medium text-ink-light dark:text-ink-dark ${
            task.done ? 'line-through opacity-50' : ''
          }`}
        >
          {task.title}
        </Text>
        <View className="flex-row items-center gap-2">
          <CategoryPill category={task.category} />
          {task.time && (
            <Text className="text-xs text-muted-light dark:text-muted-dark">{task.time}</Text>
          )}
        </View>
      </View>

      <Pressable onPress={onDelete} hitSlop={8}>
        <Feather name="trash-2" size={18} color="#8a80aa" />
      </Pressable>
    </View>
  );
}
