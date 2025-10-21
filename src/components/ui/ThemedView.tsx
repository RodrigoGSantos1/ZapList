import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { getBackgroundClasses } = useThemeClasses();
  return <View className={`${getBackgroundClasses(variant)} ${className}`} {...props} />;
};
