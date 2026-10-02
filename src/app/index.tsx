import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DayCard } from '../components/DayCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTasks } from '../context/TasksContext';
import { daysInMonth, monthLabel, todayISO } from '../lib/date';

export default function Home() {
  const router = useRouter();
  const { progressByDate, loading } = useTasks();
  const today = new Date();
  const days = daysInMonth(today);

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark" edges={['top']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View>
          <Text className="text-2xl font-semibold text-ink-light dark:text-ink-dark">
            Planify Go
          </Text>
          <Text className="text-sm capitalize text-muted-light dark:text-muted-dark">
            {monthLabel(today)}
          </Text>
        </View>
        <ThemeToggle />
      </View>

      {!loading && (
        <FlatList
          data={days}
          keyExtractor={(date) => date}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
          contentContainerStyle={{ gap: 12, paddingTop: 8, paddingBottom: 100 }}
          renderItem={({ item: date }) => {
            const { done, total } = progressByDate(date);
            return (
              <DayCard
                date={date}
                done={done}
                total={total}
                onPress={() => router.push({ pathname: '/day/[date]', params: { date } })}
              />
            );
          }}
        />
      )}

      <Pressable
        onPress={() =>
          router.push({ pathname: '/task/new', params: { date: todayISO() } })
        }
        className="absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg"
      >
        <Feather name="plus" size={26} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  );
}
