import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';
import { ThemedText } from './ui/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getButtonClasses } = useThemeClasses();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={getButtonClasses('tertiary')}
    >
      <View className='flex-row items-center'>
        <MaterialIcons
          name={isDark ? 'light-mode' : 'dark-mode'}
          size={20}
          color={isDark ? '#F59E0B' : '#1F2937'}
        />
        <ThemedText variant='primary' className='font-semibold ml-2'>
          {isDark ? 'Claro' : 'Escuro'}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};
