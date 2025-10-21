import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TaskListScreen } from '../screens/Tasks/TaskListScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { useThemeClasses } from '../hooks/useThemeClasses';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTaskScreen } from '../screens';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { getThemeClasses } = useThemeClasses();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: getThemeClasses('bg-primary', 'bg-primary-dark'),
          borderTopColor: getThemeClasses('border-gray-200', 'border-gray-700'),
        },
        tabBarActiveTintColor: getThemeClasses('text-primary', 'text-primary-dark'),
        tabBarInactiveTintColor: getThemeClasses(
          'text-muted-foreground',
          'text-muted-dark-foreground'
        ),
        headerStyle: {
          backgroundColor: getThemeClasses('bg-primary', 'bg-primary-dark'),
        },
        headerTintColor: getThemeClasses('text-primary-foreground', 'text-primary-dark-foreground'),
      }}>
      <Tab.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={
                focused
                  ? getThemeClasses('text-primary', 'text-primary-dark') // ativo
                  : getThemeClasses('text-gray-400', 'text-gray-600') // inativo
              }
            />
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          tabBarIcon: () => <AntDesign name="plus" size={24} color="black" />,
          title: '',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="black" />,
          title: '',
        }}
      />
    </Tab.Navigator>
  );
}
