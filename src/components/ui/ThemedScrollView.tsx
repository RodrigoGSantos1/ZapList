import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';

interface ThemedScrollViewProps extends ScrollViewProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
}

export const ThemedScrollView: React.FC<ThemedScrollViewProps> = ({
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { getBackgroundClasses } = useThemeClasses();
  return <ScrollView className={`${getBackgroundClasses(variant)} ${className}`} {...props} />;
};
