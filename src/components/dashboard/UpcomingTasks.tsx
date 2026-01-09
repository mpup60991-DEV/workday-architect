import { Task } from '@/types/task';
import { Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpcomingTasksProps {
  tasks: Task[];
}

export const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  const pendingTasks = tasks.filter(t => t.status === 'pending').slice(0, 5);

  return (
    <div className="stat-card">
      <h3 className="font-semibold text-foreground mb-4">Upcoming Tasks</h3>
      {pendingTasks.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
          <p className="text-muted-foreground">All caught up! No pending tasks.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task.description}</p>
                <p className="text-xs text-muted-foreground">{task.timeSlot}</p>
              </div>
              <span className="status-badge status-pending">Pending</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
