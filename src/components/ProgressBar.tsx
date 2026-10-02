import { View } from 'react-native';

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const ratio = total === 0 ? 0 : done / total;

  return (
    <View className="h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
      <View
        className="h-full rounded-full bg-accent"
        style={{ width: `${Math.round(ratio * 100)}%` }}
      />
    </View>
  );
}
