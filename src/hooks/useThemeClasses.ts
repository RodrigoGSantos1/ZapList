import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { isDark } = useTheme();

  const getBackgroundClasses = (variant: 'primary' | 'secondary' | 'tertiary' | 'muted' = 'primary') => {
    const baseClasses = {
      primary: isDark ? 'bg-primary-dark' : 'bg-primary',
      secondary: isDark ? 'bg-secondary-dark' : 'bg-secondary',
      tertiary: isDark ? 'bg-tertiary-dark' : 'bg-tertiary',
      muted: isDark ? 'bg-muted-dark' : 'bg-muted',
    };
    return baseClasses[variant];
  };

  const getTextClasses = (variant: 'primary' | 'secondary' | 'muted' = 'primary') => {
    const baseClasses = {
      primary: isDark ? 'text-foreground-dark' : 'text-foreground',
      secondary: isDark ? 'text-secondary-dark-foreground' : 'text-secondary-foreground',
      muted: isDark ? 'text-muted-dark-foreground' : 'text-muted-foreground',
    };
    return baseClasses[variant];
  };

  const getButtonClasses = (variant: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
    const baseClasses = {
      primary: `${isDark ? 'bg-primary-dark text-primary-dark-foreground' : 'bg-primary text-primary-foreground'}`,
      secondary: `${isDark ? 'bg-secondary-dark text-secondary-dark-foreground' : 'bg-secondary text-secondary-foreground'}`,
      tertiary: `${isDark ? 'bg-tertiary-dark text-tertiary-dark-foreground' : 'bg-tertiary text-tertiary-foreground'}`,
    };
    return `${baseClasses[variant]} rounded-xl px-4 py-3`;
  };

  return {
    isDark,
    getBackgroundClasses,
    getTextClasses,
    getButtonClasses,
  };
};
