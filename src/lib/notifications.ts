import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { toFutureDate } from './date';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const ensureNotificationPermission = async (): Promise<boolean> => {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const requested = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });
  return requested.granted;
};

/** Programa un recordatorio local para una tarea; null si no hay hora o ya pasó. */
export const scheduleTaskReminder = async (
  title: string,
  date: string,
  time?: string
): Promise<string | undefined> => {
  const target = toFutureDate(date, time);
  if (!target) return undefined;

  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) return undefined;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Planify Go',
      body: title,
      sound: Platform.OS === 'ios' ? 'default' : undefined,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: target,
    },
  });
};

export const cancelTaskReminder = async (notificationId?: string): Promise<void> => {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
