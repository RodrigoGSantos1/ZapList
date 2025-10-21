import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { ThemedText } from './ThemedText';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'primary',
  className = '',
  placeholder = '',
  ...props
}) => {
  const { getInputClasses } = useThemeClasses();

  return (
    <View className="w-full">
      {label && (
        <ThemedText variant="primary" className="mb-2 text-sm font-medium">
          {label}
        </ThemedText>
      )}
      <TextInput
        className={`${getInputClasses()} ${className} placeholder:text-muted-foreground min-h-16 placeholder:text-sm`}
        placeholderTextColor={error ? '#EF4444' : undefined}
        {...props}
        placeholder={placeholder}
      />
      {error && (
        <ThemedText variant="muted" className="mt-1 text-xs text-red-500">
          {error}
        </ThemedText>
      )}
    </View>
  );
};
