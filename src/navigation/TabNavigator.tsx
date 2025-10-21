import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TaskListScreen } from '../screens/Tasks/TaskListScreen';
import { useThemeClasses } from '../hooks/useThemeClasses';
import { Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { getBackgroundClasses, getTextClasses } = useThemeClasses();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: getBackgroundClasses('primary'),
          borderTopColor: getTextClasses('muted'),
        },
        tabBarActiveTintColor: getTextClasses('primary'),
        tabBarInactiveTintColor: getTextClasses('muted'),
        headerStyle: {
          backgroundColor: getBackgroundClasses('primary'),
        },
        headerTintColor: getTextClasses('primary'),
      }}>
      <Tab.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color={getTextClasses('primary')} />,
          title: 'Início',
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>📋</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
