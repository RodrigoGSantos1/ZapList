import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Selecione uma opção',
  options,
  value,
  onValueChange,
  error,
}) => {
  const { getInputClasses, getTextClasses, getBackgroundClasses } = useThemeClasses();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className="w-full">
      {label && (
        <ThemedText variant="primary" className="mb-2 text-sm font-medium">
          {label}
        </ThemedText>
      )}
      <TouchableOpacity
        className={`${getInputClasses()} flex-row items-center justify-between`}
        onPress={() => setIsOpen(!isOpen)}>
        <ThemedText variant={selectedOption ? 'primary' : 'muted'}>
          {selectedOption?.label || placeholder}
        </ThemedText>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={getTextClasses('muted')}
        />
      </TouchableOpacity>
      {isOpen && (
        <View
          className={`${getBackgroundClasses('primary')} absolute z-10 mt-1 w-full rounded-xl border shadow-lg`}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              className="border-b border-gray-200 px-4 py-3"
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}>
              <ThemedText variant="primary">{option.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error && (
        <ThemedText variant="muted" className="mt-1 text-xs text-red-500">
          {error}
        </ThemedText>
      )}
    </View>
  );
};
