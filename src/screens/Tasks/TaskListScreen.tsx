import React, { useState } from 'react';
import { View, FlatList, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from '../../components/ui';
import { useTasks } from '../../contexts/TaskContext';
import { Task } from '../../types/task';
import { Button } from '../../components/ui/Button';

type TaskFilter = 'all' | 'active' | 'completed';

export function TaskListScreen() {
  const { tasks, loading, deleteTask, toggleTaskComplete, getTasksByFilter } =
    useTasks();
  const [filter, setFilter] = useState<TaskFilter>('all');

  const filteredTasks = getTasksByFilter(filter);

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ]
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <ThemedView variant='secondary' className='mb-3 rounded-lg p-4'>
      {!!item.imageUri && (
        <View className='mb-3'>
          <Image
            source={{ uri: item.imageUri }}
            className='h-40 w-full rounded-lg'
            resizeMode='cover'
          />
        </View>
      )}

      <View className='flex-row items-start justify-between'>
        <View className='flex-1'>
          <ThemedText variant='primary' className='text-lg font-semibold'>
            {item.title}
          </ThemedText>
          {!!item.description && (
            <ThemedText variant='muted' className='mt-1 text-sm'>
              {item.description}
            </ThemedText>
          )}
          <ThemedText variant='muted' className='mt-2 text-xs'>
            Criada em: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
          </ThemedText>

          {item.latitude !== 0 && item.longitude !== 0 && (
            <View className='mt-2 flex-row items-center'>
              <Ionicons name='location' size={14} color='#6B7280' />
              <ThemedText variant='muted' className='ml-1 text-xs'>
                {item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)}
              </ThemedText>
            </View>
          )}
        </View>

        <View className='ml-3'>
          <View
            className={`h-3 w-3 rounded-full ${item.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
          />
        </View>
      </View>

      <View className='mt-3 flex-row items-center justify-between'>
        <Button
          variant='secondary'
          size='sm'
          onPress={() => toggleTaskComplete(item.id)}
          className={item.completed ? 'bg-green-500' : 'bg-blue-500'}
        >
          {item.completed ? 'Concluída' : 'Pendente'}
        </Button>
        <Button
          variant='secondary'
          size='sm'
          onPress={() => handleDeleteTask(item.id)}
          className='bg-red-500'
        >
          Excluir
        </Button>
      </View>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView
        variant='primary'
        className='flex-1 items-center justify-center'
      >
        <ThemedText variant='primary'>Carregando tarefas...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView variant='primary' className='flex-1'>
      <View className='p-4'>
        <ThemedText variant='primary' className='mb-4 text-2xl font-bold'>
          Minhas Tarefas
        </ThemedText>

        <View className='mb-4 flex-row space-x-2'>
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size='sm'
            onPress={() => setFilter('all')}
          >
            Todas ({tasks.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size='sm'
            onPress={() => setFilter('active')}
          >
            Ativas ({getTasksByFilter('active').length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size='sm'
            onPress={() => setFilter('completed')}
          >
            Concluídas ({getTasksByFilter('completed').length})
          </Button>
        </View>

        {filteredTasks.length === 0 ? (
          <ThemedView
            variant='secondary'
            className='items-center rounded-lg p-8'
          >
            <ThemedText variant='muted' className='text-center text-lg'>
              {filter === 'all'
                ? 'Nenhuma tarefa encontrada.\nCrie sua primeira tarefa!'
                : `Nenhuma tarefa ${filter === 'active' ? 'ativa' : 'concluída'} encontrada.`}
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </ThemedView>
  );
}
