import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (timeSlot: string, description: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ timeSlot?: string; description?: string }>({});

  const validateTimeSlot = (value: string): boolean => {
    const pattern = /^\d{1,2}[–-]\d{1,2}$/;
    if (!pattern.test(value)) {
      return false;
    }
    const parts = value.split(/[–-]/);
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10);
    return start >= 0 && start <= 23 && end >= 0 && end <= 24 && start < end;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { timeSlot?: string; description?: string } = {};

    if (!timeSlot.trim()) {
      newErrors.timeSlot = 'Time slot is required';
    } else if (!validateTimeSlot(timeSlot.trim())) {
      newErrors.timeSlot = 'Invalid format. Use "09–10" or "9-10"';
    }

    if (!description.trim()) {
      newErrors.description = 'Task description is required';
    } else if (description.trim().length > 200) {
      newErrors.description = 'Description must be under 200 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask(timeSlot.trim(), description.trim());
    setTimeSlot('');
    setDescription('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="stat-card">
      <h3 className="font-semibold text-foreground mb-4">Add Work Block</h3>
      <div className="grid grid-cols-[140px_1fr_auto] gap-4 items-start">
        <div>
          <Input
            type="text"
            placeholder="09–10"
            value={timeSlot}
            onChange={e => {
              setTimeSlot(e.target.value);
              setErrors(prev => ({ ...prev, timeSlot: undefined }));
            }}
            className={errors.timeSlot ? 'border-destructive' : ''}
          />
          {errors.timeSlot && (
            <p className="text-xs text-destructive mt-1">{errors.timeSlot}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Task description..."
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              setErrors(prev => ({ ...prev, description: undefined }));
            }}
            className={errors.description ? 'border-destructive' : ''}
          />
          {errors.description && (
            <p className="text-xs text-destructive mt-1">{errors.description}</p>
          )}
        </div>
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>
    </form>
  );
};
