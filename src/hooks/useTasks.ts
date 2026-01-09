import { useState, useEffect, useCallback } from 'react';
import { Task, DailyStats, WeeklyData } from '@/types/task';

const STORAGE_KEY = 'workday-planner-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const parseTimeSlot = (timeSlot: string): number => {
    const match = timeSlot.match(/^(\d{1,2})/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const addTask = useCallback((timeSlot: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      timeSlot,
      startTime: parseTimeSlot(timeSlot),
      description,
      status: 'pending',
      date: getTodayString(),
    };
    setTasks(prev => [...prev, newTask].sort((a, b) => a.startTime - b.startTime));
  }, []);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
              completedAt: task.status === 'pending' ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTodaysTasks = useCallback((): Task[] => {
    const today = getTodayString();
    return tasks.filter(task => task.date === today).sort((a, b) => a.startTime - b.startTime);
  }, [tasks]);

  const getDailyStats = useCallback((): DailyStats => {
    const todaysTasks = getTodaysTasks();
    const total = todaysTasks.length;
    const completed = todaysTasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [getTodaysTasks]);

  const getWeeklyData = useCallback((): WeeklyData[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result: WeeklyData[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayTasks = tasks.filter(t => t.date === dateString && t.status === 'completed');
      result.push({
        day: days[date.getDay()],
        completed: dayTasks.length,
        date: dateString,
      });
    }

    return result;
  }, [tasks]);

  const getWeeklyStats = useCallback(() => {
    const weeklyData = getWeeklyData();
    const totalCompleted = weeklyData.reduce((sum, d) => sum + d.completed, 0);
    const daysWithTasks = weeklyData.filter(d => d.completed > 0).length;
    const averageDaily = daysWithTasks > 0 ? Math.round(totalCompleted / daysWithTasks) : 0;
    return { totalCompleted, averageDaily };
  }, [getWeeklyData]);

  return {
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    getTodaysTasks,
    getDailyStats,
    getWeeklyData,
    getWeeklyStats,
  };
};
