import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../ui/ThemedText';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
}) => {
  return (
    <View className="mb-4">
      <ThemedText variant="primary" className="mb-2 text-sm font-medium">
        {label}
        {required && (
          <ThemedText variant="muted" className="text-red-500">
            {' '}
            *
          </ThemedText>
        )}
      </ThemedText>
      {children}
      {error && (
        <ThemedText variant="muted" className="mt-1 text-xs text-red-500">
          {error}
        </ThemedText>
      )}
    </View>
  );
};
