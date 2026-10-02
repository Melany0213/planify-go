const DAY_NAMES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const todayISO = (): string => toISODate(new Date());

/** Devuelve un ISODate por cada día del mes que contiene `reference`. */
export const daysInMonth = (reference: Date): string[] => {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: lastDay }, (_, i) => toISODate(new Date(year, month, i + 1)));
};

export const monthLabel = (reference: Date): string =>
  `${MONTH_NAMES[reference.getMonth()]} ${reference.getFullYear()}`;

export const weekdayShort = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return DAY_NAMES[new Date(year, month - 1, day).getDay()];
};

export const dayNumber = (isoDate: string): number => Number(isoDate.split('-')[2]);

export const formatLongDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = DAY_NAMES[date.getDay()];
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalized}, ${day} de ${MONTH_NAMES[month - 1]}`;
};

export const isToday = (isoDate: string): boolean => isoDate === todayISO();

/** Combina una fecha ISO y una hora HH:mm en un Date; null si ya pasó o falta la hora. */
export const toFutureDate = (isoDate: string, time?: string): Date | null => {
  if (!time) return null;
  const [year, month, day] = isoDate.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const target = new Date(year, month - 1, day, hours, minutes);
  return target.getTime() > Date.now() ? target : null;
};
