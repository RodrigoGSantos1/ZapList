import { Text, View } from 'react-native';
import { useThemeClasses } from '../../hooks/useThemeClasses';

export function CreateTaskScreen() {
  const { getBackgroundClasses, getTextClasses } = useThemeClasses();
  return (
    <View className={`${getBackgroundClasses('primary')} flex-1 items-center justify-center`}>
      <Text className={getTextClasses('primary')}>Create Task</Text>
    </View>
  );
}
