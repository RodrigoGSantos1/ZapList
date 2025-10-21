import React, { useState, useEffect } from 'react';
import { View, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText, ThemedView } from './ui';
import { Button } from './ui/Button';

interface ImagePickerProps {
  readonly onImageSelected: (imageUri: string) => void;
  readonly currentImage?: string;
  readonly resetKey?: number;
}

export function ImagePickerComponent({
  onImageSelected,
  currentImage,
  resetKey,
}: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentImage || null
  );

  useEffect(() => {
    if (resetKey !== undefined && resetKey > 0) {
      setSelectedImage(null);
      onImageSelected('');
    }
  }, [resetKey]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar suas fotos para anexar imagens às tarefas.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images' as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      onImageSelected(imageUri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar sua câmera para capturar fotos das tarefas.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      onImageSelected(imageUri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    onImageSelected('');
  };

  return (
    <ThemedView variant='secondary' className='rounded-lg p-4'>
      <ThemedText variant='primary' className='mb-3 text-base font-semibold'>
        Imagem da Tarefa
      </ThemedText>

      {selectedImage ? (
        <View className='mb-3'>
          <Image
            source={{ uri: selectedImage }}
            className='h-32 w-full rounded-lg'
          />
          <Button
            variant='secondary'
            size='sm'
            onPress={removeImage}
            className='mt-2 bg-red-500'
          >
            Remover Imagem
          </Button>
        </View>
      ) : (
        <View className='mb-3 flex-row space-x-2'>
          <Button
            variant='secondary'
            size='sm'
            onPress={pickImage}
            className='flex-1 bg-blue-500'
          >
            Galeria
          </Button>
          <Button
            variant='secondary'
            size='sm'
            onPress={takePhoto}
            className='flex-1 bg-green-500'
          >
            Câmera
          </Button>
        </View>
      )}
    </ThemedView>
  );
}
