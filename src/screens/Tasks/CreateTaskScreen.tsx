import React, { useState } from 'react';
import { ThemedScrollView } from '../../components/ui/ThemedScrollView';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { View, Alert, ActivityIndicator } from 'react-native';
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
  const [hasImage, setHasImage] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório');
      return;
    }

    if (formData.title.trim().length < 3) {
      Alert.alert('Erro', 'O título deve ter pelo menos 3 caracteres');
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
      setHasImage(false);

      Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [{ text: 'OK' }]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a tarefa. Tente novamente.', [
        { text: 'OK' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelected = (imageUri: string) => {
    setFormData({ ...formData, imageUri });
    setHasImage(!!imageUri);
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
              maxLength={100}
            />
            <ThemedText variant='muted' className='mt-1 text-xs'>
              {formData.title.length}/100 caracteres
            </ThemedText>
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
              maxLength={500}
            />
            <ThemedText variant='muted' className='mt-1 text-xs'>
              {formData.description.length}/500 caracteres
            </ThemedText>
          </FormField>

          <ImagePickerComponent
            onImageSelected={handleImageSelected}
            currentImage={formData.imageUri}
          />
        </View>

        <View className='mt-8'>
          <Button
            variant='primary'
            size='lg'
            className='bg-accent-blue w-full'
            onPress={handleSubmit}
            disabled={loading || !formData.title.trim()}
          >
            {loading ? (
              <View className='flex-row items-center'>
                <ActivityIndicator
                  size='small'
                  color='white'
                  className='mr-2'
                />
                <ThemedText variant='primary' className='text-white'>
                  Criando...
                </ThemedText>
              </View>
            ) : (
              <ThemedText variant='primary' className='text-white'>
                Criar Tarefa{hasImage ? ' com Imagem' : ''}
              </ThemedText>
            )}
          </Button>
        </View>
      </ThemedView>
    </ThemedScrollView>
  );
}
