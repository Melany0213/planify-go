import { FlatList, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TaskItem } from '../../components/TaskItem';
import { useTasks } from '../../context/TasksContext';
import { formatLongDate } from '../../lib/date';

export default function DayDetail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const { tasksByDate, toggleTask, removeTask } = useTasks();
  const tasks = tasksByDate(date);

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={22} color="#7c3aed" />
        </Pressable>
        <Text className="flex-1 text-lg font-semibold text-ink-light dark:text-ink-dark">
          {formatLongDate(date)}
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={{ gap: 10, padding: 20, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-muted-light dark:text-muted-dark">
            Todavía no hay tareas para este día.
          </Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => removeTask(item.id)}
          />
        )}
      />

      <Pressable
        onPress={() => router.push({ pathname: '/task/new', params: { date } })}
        className="absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg"
      >
        <Feather name="plus" size={26} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  );
}
