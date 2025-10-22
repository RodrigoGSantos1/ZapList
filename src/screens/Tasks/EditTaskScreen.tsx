import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemedScrollView, ThemedView, ThemedText } from '../../components/ui';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ImagePickerComponent } from '../../components/ImagePicker';
import { LocationPickerComponent } from '../../components/LocationPicker';
import { useTasks } from '../../contexts/TaskContext';

export function EditTaskScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { getTaskById, updateTask } = useTasks();

  // @ts-ignore
  const { taskId } = route.params;

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

  useEffect(() => {
    const task = getTaskById(taskId);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed,
        imageUri: task.imageUri || '',
        latitude: task.latitude || 0,
        longitude: task.longitude || 0,
      });

      setHasImage(!!task.imageUri);
      setHasLocation((task.latitude || 0) !== 0 && (task.longitude || 0) !== 0);

      if (task.latitude && task.longitude) {
        setCurrentLocation({
          latitude: task.latitude,
          longitude: task.longitude,
        });
      }
    }
  }, [taskId, getTaskById]);

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

      const task = getTaskById(taskId);
      if (!task) {
        Alert.alert('Erro', 'Tarefa não encontrada');
        return;
      }

      const updatedTask = {
        ...task,
        title: formData.title.trim(),
        description: formData.description.trim(),
        completed: formData.completed,
        imageUri: formData.imageUri,
        latitude: formData.latitude,
        longitude: formData.longitude,
        updatedAt: new Date(),
      };

      await updateTask(updatedTask);

      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar a tarefa. Tente novamente.',
        [{ text: 'OK' }]
      );
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

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUri: '' });
    setHasImage(false);
    setImageKey(prev => prev + 1);
  };

  const handleRemoveLocation = () => {
    setFormData({
      ...formData,
      latitude: 0,
      longitude: 0,
    });
    setHasLocation(false);
    setCurrentLocation(undefined);
  };

  return (
    <ThemedScrollView variant='primary' className='flex-1'>
      <ThemedView variant='primary' className='flex-1 px-6 py-8'>
        <View className='mb-8'>
          <ThemedText variant='primary' className='text-3xl font-bold'>
            Editar Tarefa
          </ThemedText>
          <ThemedText variant='muted' className='mt-2 text-base'>
            Atualize os dados da tarefa
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
            key={`image-${imageKey}-${formData.imageUri}`}
          />

          <LocationPickerComponent
            onLocationSelected={handleLocationSelected}
            currentLocation={currentLocation}
            key={`location-${formData.latitude}-${formData.longitude}`}
          />
        </View>

        <View className='mt-8 gap-y-3'>
          <Button
            variant='primary'
            size='lg'
            className='bg-accent-blue w-full'
            onPress={handleSubmit}
            disabled={loading || !formData.title.trim()}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>

          <Button
            variant='secondary'
            size='lg'
            className='w-full'
            onPress={() => navigation.goBack()}
          >
            Cancelar
          </Button>
        </View>
      </ThemedView>
    </ThemedScrollView>
  );
}
