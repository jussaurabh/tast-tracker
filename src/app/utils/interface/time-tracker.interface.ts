import { DateTime } from 'luxon';

export interface TimeTracker {
  id: string;
  isActive: boolean;
  startTime: DateTime;
  endTime?: DateTime | null;
}

export interface Task {
  id: string;
  title: string;
  timers: string[];
}
