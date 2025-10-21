import React from 'react';
import { View } from 'react-native';
import { useThemeClasses } from '../hooks/useThemeClasses';
import { ThemeToggle } from '../components/ThemeToggle';

export function HomeScreen() {
  const { getThemeClasses } = useThemeClasses();

  return (
    <View
      className={`${getThemeClasses('bg-primary', 'bg-primary-dark')} flex-1 items-center justify-center`}>
      <ThemeToggle />
    </View>
  );
}
