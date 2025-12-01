export interface DayInfo {
  date: number; // 1-31
  fullDate: Date;
  isCurrentMonth: boolean;
}

export interface MonthData {
  name: string;
  year: number;
  index: number; // 0-11
  days: DayInfo[];
  startDayOfWeek: number; // 0 (Sun) - 6 (Sat)
}

export interface AIInsight {
  theme: string;
  focusAreas: string[];
}