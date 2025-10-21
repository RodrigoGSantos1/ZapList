import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { isDark } = useTheme();

  const getThemeClasses = (lightClass: string, darkClass: string) => {
    return isDark ? darkClass : lightClass;
  };

  return {
    isDark,
    getThemeClasses,
  };
};
