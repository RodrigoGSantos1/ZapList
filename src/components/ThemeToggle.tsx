import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';
import { ThemedText } from './ThemedText';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getButtonClasses } = useThemeClasses();

  return (
    <TouchableOpacity onPress={toggleTheme} className={getButtonClasses('tertiary')}>
      <ThemedText variant="primary" className="font-semibold">
        {isDark ? '☀️' : '🌙'} {isDark ? 'Claro' : 'Escuro'}
      </ThemedText>
    </TouchableOpacity>
  );
};
