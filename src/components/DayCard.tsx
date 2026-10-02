import { Pressable, Text } from 'react-native';

import { dayNumber, isToday, weekdayShort } from '../lib/date';
import { ProgressBar } from './ProgressBar';

type Props = {
  date: string;
  done: number;
  total: number;
  onPress: () => void;
};

export function DayCard({ date, done, total, onPress }: Props) {
  const today = isToday(date);

  return (
    <Pressable
      onPress={onPress}
      className={`w-[31%] gap-2 rounded-2xl p-3 ${
        today
          ? 'bg-accent'
          : 'bg-surface-light dark:bg-surface-dark'
      }`}
    >
      <Text
        className={`text-xs font-medium uppercase ${
          today ? 'text-white/80' : 'text-muted-light dark:text-muted-dark'
        }`}
      >
        {weekdayShort(date)}
      </Text>
      <Text
        className={`text-xl font-semibold ${
          today ? 'text-white' : 'text-ink-light dark:text-ink-dark'
        }`}
      >
        {dayNumber(date)}
      </Text>
      {total > 0 ? (
        <>
          <ProgressBar done={done} total={total} />
          <Text className={`text-[11px] ${today ? 'text-white/80' : 'text-muted-light dark:text-muted-dark'}`}>
            {done}/{total} tareas
          </Text>
        </>
      ) : (
        <Text className={`text-[11px] ${today ? 'text-white/60' : 'text-muted-light/70 dark:text-muted-dark/70'}`}>
          Sin tareas
        </Text>
      )}
    </Pressable>
  );
}
