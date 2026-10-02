import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Task } from '../types';

const TASKS_KEY = 'planify-go:tasks';

export const loadTasks = async (): Promise<Task[]> => {
  const raw = await AsyncStorage.getItem(TASKS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
};

export const persistTasks = async (tasks: Task[]): Promise<void> => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
