import React from 'react';
import { ThemedView } from '../ui/ThemedView';

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children, className = '' }) => {
  return (
    <ThemedView variant="primary" className={`flex-1 p-6 ${className}`}>
      {children}
    </ThemedView>
  );
};
