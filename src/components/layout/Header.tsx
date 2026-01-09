import { format } from 'date-fns';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{today}</span>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">JD</span>
        </div>
      </div>
    </header>
  );
};
