import { useTheme } from '@/components/theme/ThemeProvider';
import { Icon } from '@/components/ui/Icon';

export function DarkModeToggle() {
  const { mode, toggleMode } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleMode}
      className="control-btn"
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      {mode === 'dark' ? <Icon name="sun" size={14} /> : <Icon name="moon" size={14} />}
    </button>
  );
}
