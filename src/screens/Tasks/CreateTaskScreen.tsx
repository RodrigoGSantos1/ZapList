import React, { useState } from 'react';
import { ThemedScrollView } from '../../components/ui/ThemedScrollView';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { View, Alert } from 'react-native';
import { ThemedText, ThemedView } from '../../components/ui';
import { useTasks } from '../../contexts/TaskContext';
import { ImagePickerComponent } from '../../components/ImagePicker';
import { LocationPickerComponent } from '../../components/LocationPicker';
import { useNavigation } from '@react-navigation/native';

export function CreateTaskScreen() {
  const { createTask } = useTasks();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    imageUri: '',
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [hasLocation, setHasLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number; address?: string } | undefined
  >();

  const navigateToTaskList = () => {
    navigation.navigate('TaskList' as never);
  };

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
        latitude: 0,
        longitude: 0,
      });
      setHasImage(false);
      setHasLocation(false);
      setCurrentLocation(undefined);
      setImageKey(prev => prev + 1);

      Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
        { text: 'OK', onPress: navigateToTaskList },
      ]);
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

  const handleLocationSelected = (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => {
    setFormData({
      ...formData,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setCurrentLocation(location);
    setHasLocation(location.latitude !== 0 && location.longitude !== 0);
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

        <View className='space-y-6 gap-y-6'>
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
            key={imageKey}
          />

          <LocationPickerComponent
            onLocationSelected={handleLocationSelected}
            currentLocation={currentLocation}
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
            {loading
              ? 'Criando...'
              : `Criar Tarefa${hasImage ? ' com Imagem' : ''}${hasLocation ? ' e Localização' : ''}`}
          </Button>
        </View>
      </ThemedView>
    </ThemedScrollView>
  );
}
