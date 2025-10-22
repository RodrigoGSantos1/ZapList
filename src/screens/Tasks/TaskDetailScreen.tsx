import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemedText, ThemedView } from '../../components/ui';
import { Button } from '../../components/ui/Button';
import { useTasks } from '../../contexts/TaskContext';

export function TaskDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { getTaskById, deleteTask, toggleTaskComplete } = useTasks();

  // @ts-ignore
  const { taskId } = route.params;

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <ThemedView
        variant='primary'
        className='flex-1 items-center justify-center'
      >
        <ThemedText variant='primary' className='text-lg'>
          Tarefa não encontrada
        </ThemedText>
        <Button
          variant='primary'
          onPress={() => navigation.goBack()}
          className='mt-4'
        >
          Voltar
        </Button>
      </ThemedView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleToggleComplete = async () => {
    await toggleTaskComplete(task.id);
  };

  const handleEdit = () => {
    // @ts-ignore
    navigation.navigate('EditTask', { taskId: task.id });
  };

  return (
    <ThemedView variant='primary' className='flex-1'>
      <View className='p-4'>
        <View className='mb-6'>
          <ThemedText variant='primary' className='text-2xl font-bold'>
            {task.title}
          </ThemedText>
          <View className='mt-2 flex-row items-center'>
            <View
              className={`h-3 w-3 rounded-full mr-2 ${
                task.completed ? 'bg-green-500' : 'bg-yellow-500'
              }`}
            />
            <ThemedText variant='muted' className='text-sm'>
              {task.completed ? 'Concluída' : 'Pendente'}
            </ThemedText>
          </View>
        </View>

        {task.imageUri && (
          <View className='mb-6'>
            <ThemedText variant='primary' className='mb-2 font-semibold'>
              Foto Anexada
            </ThemedText>
            <Image
              source={{ uri: task.imageUri }}
              className='h-48 w-full rounded-lg'
              resizeMode='cover'
            />
          </View>
        )}

        {task.description && (
          <View className='mb-6'>
            <ThemedText variant='primary' className='mb-2 font-semibold'>
              Descrição
            </ThemedText>
            <ThemedText variant='muted' className='text-base'>
              {task.description}
            </ThemedText>
          </View>
        )}

        {task.latitude !== 0 && task.longitude !== 0 && (
          <View className='mb-6'>
            <ThemedText variant='primary' className='mb-2 font-semibold'>
              Localização
            </ThemedText>
            <View className='flex-row items-center'>
              <Ionicons name='location' size={16} color='#6B7280' />
              <ThemedText variant='muted' className='ml-2 text-sm'>
                {task.latitude?.toFixed(4)}, {task.longitude?.toFixed(4)}
              </ThemedText>
            </View>
          </View>
        )}

        <View className='mb-6'>
          <ThemedText variant='primary' className='mb-2 font-semibold'>
            Informações
          </ThemedText>
          <ThemedText variant='muted' className='text-sm'>
            Criada em: {new Date(task.createdAt).toLocaleDateString('pt-BR')} às{' '}
            {new Date(task.createdAt).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </ThemedText>
          {task.updatedAt.getTime() !== task.createdAt.getTime() && (
            <ThemedText variant='muted' className='text-sm'>
              Atualizada em:{' '}
              {new Date(task.updatedAt).toLocaleDateString('pt-BR')} às{' '}
              {new Date(task.updatedAt).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ThemedText>
          )}
        </View>

        <View className='gap-y-3'>
          <Button
            variant='primary'
            onPress={handleEdit}
            className='bg-blue-500'
          >
            Editar Tarefa
          </Button>

          <Button
            variant='secondary'
            onPress={handleToggleComplete}
            className={task.completed ? 'bg-yellow-500' : 'bg-green-500'}
          >
            {task.completed ? 'Marcar como Pendente' : 'Marcar como Concluída'}
          </Button>

          <Button
            variant='secondary'
            onPress={handleDelete}
            className='bg-red-500'
          >
            Excluir Tarefa
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}
