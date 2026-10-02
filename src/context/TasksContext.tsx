import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { cancelTaskReminder, scheduleTaskReminder } from '../lib/notifications';
import { loadTasks, persistTasks } from '../lib/storage';
import type { NewTaskInput, Task } from '../types';

type TasksContextValue = {
  tasks: Task[];
  loading: boolean;
  tasksByDate: (date: string) => Task[];
  progressByDate: (date: string) => { done: number; total: number };
  addTask: (input: NewTaskInput) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks().then((stored) => {
      setTasks(stored);
      setLoading(false);
    });
  }, []);

  const updateAndPersist = async (next: Task[]) => {
    setTasks(next);
    await persistTasks(next);
  };

  const addTask = async (input: NewTaskInput) => {
    const notificationId = await scheduleTaskReminder(input.title, input.date, input.time);

    const task: Task = {
      id: `${Date.now()}`,
      title: input.title,
      date: input.date,
      time: input.time,
      category: input.category,
      done: false,
      notificationId,
      createdAt: new Date().toISOString(),
    };

    await updateAndPersist([...tasks, task]);
  };

  const toggleTask = async (id: string) => {
    const next = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    await updateAndPersist(next);
  };

  const removeTask = async (id: string) => {
    const target = tasks.find((task) => task.id === id);
    if (target) await cancelTaskReminder(target.notificationId);
    await updateAndPersist(tasks.filter((task) => task.id !== id));
  };

  const tasksByDate = (date: string) =>
    tasks
      .filter((task) => task.date === date)
      .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'));

  const progressByDate = (date: string) => {
    const dayTasks = tasks.filter((task) => task.date === date);
    return { done: dayTasks.filter((task) => task.done).length, total: dayTasks.length };
  };

  const value = { tasks, loading, tasksByDate, progressByDate, addTask, toggleTask, removeTask };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks debe usarse dentro de <TasksProvider>');
  return ctx;
}
