import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { TaskDetailScreen } from '../screens/Tasks/TaskDetailScreen';
import { CreateTaskScreen } from '../screens/Tasks/CreateTaskScreen';
import { EditTaskScreen } from '../screens/Tasks/EditTaskScreen';
import { useThemeClasses } from '../hooks/useThemeClasses';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { getNavigationColors } = useThemeClasses();
  const colors = getNavigationColors();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.headerTint,
          headerBackTitle: 'Voltar',
        }}
      >
        <Stack.Screen
          name='MainTabs'
          component={TabNavigator}
          options={{
            headerShown: false,
            title: 'Listagem de Tarefas',
          }}
        />
        <Stack.Screen
          name='TaskDetail'
          component={TaskDetailScreen}
          options={{ title: 'Detalhes da Tarefa' }}
        />
        <Stack.Screen
          name='CreateTask'
          component={CreateTaskScreen}
          options={{ title: 'Nova Tarefa' }}
        />
        <Stack.Screen
          name='EditTask'
          component={EditTaskScreen}
          options={{ title: 'Editar Tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
