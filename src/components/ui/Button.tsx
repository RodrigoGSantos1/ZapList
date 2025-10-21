import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';
import { ThemedText } from './ThemedText';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const { getButtonClasses } = useThemeClasses();

  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const hasCustomBackground = className.includes('bg-');
  const baseClasses = hasCustomBackground
    ? `rounded-xl ${sizeClasses[size]}`
    : `${getButtonClasses(variant)} ${sizeClasses[size]}`;

  return (
    <TouchableOpacity className={`${baseClasses} ${className}`} {...props}>
      <ThemedText variant='primary' className='text-center font-semibold'>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};
