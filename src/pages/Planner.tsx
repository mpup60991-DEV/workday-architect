import { AppLayout } from '@/components/layout/AppLayout';
import { TaskForm } from '@/components/planner/TaskForm';
import { TaskTable } from '@/components/planner/TaskTable';
import { useTasks } from '@/hooks/useTasks';

const Planner = () => {
  const { addTask, toggleTaskStatus, deleteTask, getTodaysTasks } = useTasks();
  const todaysTasks = getTodaysTasks();

  return (
    <AppLayout title="Planner">
      <div className="space-y-6">
        <TaskForm onAddTask={addTask} />
        <TaskTable
          tasks={todaysTasks}
          onToggleStatus={toggleTaskStatus}
          onDelete={deleteTask}
        />
      </div>
    </AppLayout>
  );
};

export default Planner;
