import useTheme from '@/hooks/useTheme';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={toggleTheme}
    />
  );
};

export default ThemeToggle;
