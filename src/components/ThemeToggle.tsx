import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getThemeClasses } = useThemeClasses();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`${getThemeClasses('bg-tertiary', 'bg-tertiary-dark')} rounded-xl px-4 py-2`}>
      <Text
        className={`${getThemeClasses('text-tertiary-foreground', 'text-tertiary-dark-foreground')} font-semibold`}>
        {isDark ? '☀️' : '🌙'} {isDark ? 'Claro' : 'Escuro'}
      </Text>
    </TouchableOpacity>
  );
};
