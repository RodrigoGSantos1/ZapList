import { Text, View } from 'react-native';
import { ThemeToggle } from '../../components/ThemeToggle';

export function TaskListScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Task List</Text>
      <ThemeToggle />
    </View>
  );
}
