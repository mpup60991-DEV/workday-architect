import { AppLayout } from '@/components/layout/AppLayout';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppLayout title="Settings">
      <div className="max-w-2xl">
        <div className="stat-card">
          <h3 className="font-semibold text-foreground mb-6">Appearance</h3>
          
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
