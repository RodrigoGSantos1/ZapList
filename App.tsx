import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { HomeScreen } from './src/screens';
import './global.css';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <HomeScreen />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
