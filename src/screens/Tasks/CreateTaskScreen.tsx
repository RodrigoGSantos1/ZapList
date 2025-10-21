import React, { useState } from 'react';
import { ThemedScrollView } from '../../components/ui/ThemedScrollView';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { View, Alert } from 'react-native';
import { ThemedText, ThemedView } from '../../components/ui';
import { useTasks } from '../../contexts/TaskContext';
import { ImagePickerComponent } from '../../components/ImagePicker';

export function CreateTaskScreen() {
  const { createTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    imageUri: '',
  });
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório');
      return;
    }

    try {
      setLoading(true);
      await createTask(formData);

      setFormData({
        title: '',
        description: '',
        completed: false,
        imageUri: '',
      });

      setResetKey(prev => prev + 1);

      Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível criar a tarefa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedScrollView variant='primary' className='flex-1'>
      <ThemedView variant='primary' className='flex-1 px-6 py-8'>
        <View className='mb-8'>
          <ThemedText variant='primary' className='text-3xl font-bold'>
            Nova Tarefa
          </ThemedText>
          <ThemedText variant='muted' className='mt-2 text-base'>
            Preencha os dados para criar uma nova tarefa
          </ThemedText>
        </View>

        <View className='space-y-6'>
          <FormField label='Título da Tarefa' required>
            <Input
              placeholder='Digite o título da tarefa'
              value={formData.title}
              onChangeText={text => setFormData({ ...formData, title: text })}
            />
          </FormField>

          <FormField label='Descrição'>
            <Input
              placeholder='Descreva os detalhes da tarefa'
              value={formData.description}
              onChangeText={text =>
                setFormData({ ...formData, description: text })
              }
              multiline
              numberOfLines={4}
            />
          </FormField>

          <ImagePickerComponent
            onImageSelected={imageUri => setFormData({ ...formData, imageUri })}
            currentImage={formData.imageUri}
            resetKey={resetKey}
          />
        </View>

        <View className='mt-8'>
          <Button
            variant='primary'
            size='lg'
            className='bg-accent-blue w-full'
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Tarefa'}
          </Button>
        </View>
      </ThemedView>
    </ThemedScrollView>
  );
}
