import { DayInfo, MonthData } from '../types';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const getWeekDays = () => WEEKDAYS;

export const generateCalendarData = (year: number): MonthData[] => {
  const months: MonthData[] = [];

  for (let i = 0; i < 12; i++) {
    const firstDayOfMonth = new Date(year, i, 1);
    const lastDayOfMonth = new Date(year, i + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: DayInfo[] = [];

    // Fill logic
    for (let d = 1; d <= totalDays; d++) {
      days.push({
        date: d,
        fullDate: new Date(year, i, d),
        isCurrentMonth: true
      });
    }

    months.push({
      name: MONTH_NAMES[i],
      year,
      index: i,
      days,
      startDayOfWeek
    });
  }

  return months;
};