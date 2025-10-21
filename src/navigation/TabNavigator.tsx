import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { TaskListScreen } from '../screens/Tasks/TaskListScreen';
import { CreateTaskScreen } from '../screens/Tasks/CreateTaskScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { useThemeClasses } from '../hooks/useThemeClasses';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { getNavigationColors } = useThemeClasses();
  const colors = getNavigationColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.borderColor,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerTint,
      }}
    >
      <Tab.Screen
        name='TaskList'
        component={TaskListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className=' items-center justify-center rounded-full'>
              <Entypo
                name='home'
                size={focused ? 30 : 24}
                color={
                  focused ? colors.tabBarActiveTint : colors.tabBarInactiveTint
                }
              />
              {focused && (
                <View className='bg-accent-orange mt-1 h-1 w-1 rounded-full' />
              )}
            </View>
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name='CreateTask'
        component={CreateTaskScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={['#8B5CF6', '#CD8BF6']}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <AntDesign name='plus' size={24} color='#FFFFFF' />
            </LinearGradient>
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className=' items-center justify-center rounded-full'>
              <Ionicons
                name='settings'
                size={focused ? 30 : 24}
                color={
                  focused ? colors.tabBarActiveTint : colors.tabBarInactiveTint
                }
              />
              {focused && (
                <View className='bg-accent-orange mt-1 h-1 w-1 rounded-full' />
              )}
            </View>
          ),
          title: '',
        }}
      />
    </Tab.Navigator>
  );
}
