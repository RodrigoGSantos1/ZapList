import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'muted';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { getTextClasses } = useThemeClasses();
  return <Text className={`${getTextClasses(variant)} ${className}`} {...props} />;
};
