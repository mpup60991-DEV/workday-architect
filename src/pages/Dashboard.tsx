import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { useTasks } from '@/hooks/useTasks';
import { ClipboardList, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { getTodaysTasks, getDailyStats } = useTasks();
  const todaysTasks = getTodaysTasks();
  const stats = getDailyStats();

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            label="Total Tasks Today"
            value={stats.total}
            icon={<ClipboardList className="w-5 h-5" />}
            variant="primary"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon={<CheckCircle2 className="w-5 h-5" />}
            variant="success"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            icon={<Clock className="w-5 h-5" />}
            variant="warning"
          />
          <StatCard
            label="Completion Rate"
            value={`${stats.completionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            variant="default"
          />
        </div>

        <UpcomingTasks tasks={todaysTasks} />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
