import { Text, View } from 'react-native';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useThemeClasses } from '../../hooks/useThemeClasses';

export function SettingsScreen() {
  const { getBackgroundClasses, getTextClasses } = useThemeClasses();
  return (
    <View className={`${getBackgroundClasses('primary')} flex-1 items-center justify-center`}>
      <Text className={getTextClasses('primary')}>Configurações</Text>
      <ThemeToggle />
    </View>
  );
}
