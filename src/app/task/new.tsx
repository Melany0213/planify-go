import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CATEGORY_OPTIONS, categoryLabel } from '../../components/CategoryPill';
import { useTasks } from '../../context/TasksContext';
import { formatLongDate } from '../../lib/date';
import type { TaskCategory } from '../../types';

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export default function NewTask() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<TaskCategory>('trabajo');
  const [saving, setSaving] = useState(false);

  const timeError = time.length > 0 && !TIME_PATTERN.test(time);
  const canSave = title.trim().length > 0 && !timeError && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    await addTask({
      title: title.trim(),
      date,
      time: time.length > 0 ? time : undefined,
      category,
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="x" size={22} color="#8a80aa" />
        </Pressable>
        <Text className="text-base font-semibold text-ink-light dark:text-ink-dark">
          {formatLongDate(date)}
        </Text>
        <View className="w-[22px]" />
      </View>

      <View className="gap-6 px-5 pt-6">
        <View className="gap-2">
          <Text className="text-sm font-medium text-muted-light dark:text-muted-dark">
            ¿Qué hay que hacer?
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Entregar reporte semanal"
            placeholderTextColor="#8a80aa"
            autoFocus
            className="rounded-xl bg-surface-light p-4 text-base text-ink-light dark:bg-surface-dark dark:text-ink-dark"
          />
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-muted-light dark:text-muted-dark">
            Recordatorio (opcional, formato HH:mm)
          </Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="14:30"
            placeholderTextColor="#8a80aa"
            keyboardType="numbers-and-punctuation"
            maxLength={5}
            className="rounded-xl bg-surface-light p-4 text-base text-ink-light dark:bg-surface-dark dark:text-ink-dark"
          />
          {timeError && (
            <Text className="text-xs text-red-500">Usa el formato 24h, por ejemplo 09:00</Text>
          )}
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-muted-light dark:text-muted-dark">
            Categoría
          </Text>
          <View className="flex-row gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => setCategory(option)}
                className={`flex-1 items-center rounded-xl py-3 ${
                  category === option
                    ? 'bg-accent'
                    : 'bg-surface-light dark:bg-surface-dark'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    category === option ? 'text-white' : 'text-ink-light dark:text-ink-dark'
                  }`}
                >
                  {categoryLabel(option)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!canSave}
          className={`items-center rounded-xl py-4 ${canSave ? 'bg-accent' : 'bg-accent/40'}`}
        >
          <Text className="text-base font-semibold text-white">Guardar tarea</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
