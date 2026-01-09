export interface Task {
  id: string;
  timeSlot: string;
  startTime: number;
  description: string;
  status: 'pending' | 'completed';
  date: string;
  completedAt?: string;
}

export interface DailyStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface WeeklyData {
  day: string;
  completed: number;
  date: string;
}
