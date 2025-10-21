import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { TaskProvider } from './src/contexts/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppNavigator />
      </TaskProvider>
    </ThemeProvider>
  );
}
