import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Check, Trash2, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskTableProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskTable = ({ tasks, onToggleStatus, onDelete }: TaskTableProps) => {
  if (tasks.length === 0) {
    return (
      <div className="stat-card text-center py-12">
        <ClipboardList className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks scheduled</h3>
        <p className="text-muted-foreground">Add your first work block to get started.</p>
      </div>
    );
  }

  return (
    <div className="stat-card overflow-hidden p-0">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
              Time Block
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
              Task Description
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
              Status
            </th>
            <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="task-row">
              <td className="px-6 py-4">
                <span className="font-medium text-foreground">{task.timeSlot}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-foreground">{task.description}</span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={cn(
                    'status-badge',
                    task.status === 'completed' ? 'status-completed' : 'status-pending'
                  )}
                >
                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(task.id)}
                    className={cn(
                      task.status === 'completed' && 'text-success border-success/30 hover:bg-success/10'
                    )}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {task.status === 'completed' ? 'Undo' : 'Complete'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
