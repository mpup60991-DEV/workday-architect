import { AppLayout } from '@/components/layout/AppLayout';
import { WeeklyChart } from '@/components/reports/WeeklyChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTasks } from '@/hooks/useTasks';
import { BarChart3, Target } from 'lucide-react';

const Reports = () => {
  const { getWeeklyData, getWeeklyStats } = useTasks();
  const weeklyData = getWeeklyData();
  const stats = getWeeklyStats();

  return (
    <AppLayout title="Reports">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <StatCard
            label="Total Completed This Week"
            value={stats.totalCompleted}
            icon={<BarChart3 className="w-5 h-5" />}
            variant="primary"
          />
          <StatCard
            label="Average Daily Completion"
            value={stats.averageDaily}
            icon={<Target className="w-5 h-5" />}
            variant="success"
          />
        </div>

        <WeeklyChart data={weeklyData} />
      </div>
    </AppLayout>
  );
};

export default Reports;
