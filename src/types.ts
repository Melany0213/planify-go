export type TaskCategory = 'trabajo' | 'estudio' | 'personal';

export type Task = {
  id: string;
  title: string;
  /** Fecha en formato YYYY-MM-DD */
  date: string;
  /** Hora opcional en formato HH:mm, usada para el recordatorio */
  time?: string;
  category: TaskCategory;
  done: boolean;
  /** Id de la notificación local programada, si existe */
  notificationId?: string;
  createdAt: string;
};

export type NewTaskInput = {
  title: string;
  date: string;
  time?: string;
  category: TaskCategory;
};
