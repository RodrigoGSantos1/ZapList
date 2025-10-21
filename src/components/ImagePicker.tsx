import React, { useState } from 'react';
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText, ThemedView } from './ui';
import { Button } from './ui/Button';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  currentImage?: string;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export function ImagePickerComponent({
  onImageSelected,
  currentImage,
}: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentImage || null
  );
  const [loading, setLoading] = useState(false);

  const validateImage = async (uri: string): Promise<boolean> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      if (blob.size > MAX_IMAGE_SIZE) {
        Alert.alert('Imagem muito grande', 'A imagem deve ter no máximo 5MB');
        return false;
      }

      if (!SUPPORTED_FORMATS.includes(blob.type)) {
        Alert.alert(
          'Formato não suportado',
          'Use apenas imagens JPG, PNG ou WebP'
        );
        return false;
      }

      return true;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível validar a imagem');
      return false;
    }
  };

  const requestPermissions = async (
    type: 'camera' | 'gallery'
  ): Promise<boolean> => {
    try {
      let permission;

      if (type === 'camera') {
        permission = await ImagePicker.requestCameraPermissionsAsync();
      } else {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (permission.status !== 'granted') {
        const message =
          type === 'camera'
            ? 'Precisamos acessar sua câmera para capturar fotos das tarefas.'
            : 'Precisamos acessar suas fotos para anexar imagens às tarefas.';

        Alert.alert('Permissão necessária', message, [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Configurações',
            onPress: () => {
              Alert.alert(
                'Configurações',
                'Vá em Configurações > ZapList > Permissões e ative o acesso à câmera/galeria'
              );
            },
          },
        ]);
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível verificar as permissões');
      return false;
    }
  };

  const pickImage = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestPermissions('gallery');
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        const isValid = await validateImage(imageUri);

        if (isValid) {
          setSelectedImage(imageUri);
          onImageSelected(imageUri);
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestPermissions('camera');
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        const isValid = await validateImage(imageUri);

        if (isValid) {
          setSelectedImage(imageUri);
          onImageSelected(imageUri);
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível capturar a foto');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    onImageSelected('');
  };

  const retakeImage = () => {
    Alert.alert('Alterar imagem', 'Como deseja alterar a imagem?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Galeria', onPress: pickImage },
      { text: 'Câmera', onPress: takePhoto },
      { text: 'Remover', style: 'destructive', onPress: removeImage },
    ]);
  };

  return (
    <ThemedView variant='secondary' className='rounded-lg p-4'>
      <ThemedText variant='primary' className='mb-3 text-base font-semibold'>
        Imagem da Tarefa
      </ThemedText>

      {loading ? (
        <View className='mb-3 h-32 w-full items-center justify-center rounded-lg bg-gray-200'>
          <ActivityIndicator size='large' color='#3B82F6' />
          <ThemedText variant='muted' className='mt-2 text-sm'>
            Processando imagem...
          </ThemedText>
        </View>
      ) : selectedImage ? (
        <View className='mb-3'>
          <TouchableOpacity onPress={retakeImage} activeOpacity={0.8}>
            <Image
              source={{ uri: selectedImage }}
              className='h-32 w-full rounded-lg'
              resizeMode='cover'
            />
          </TouchableOpacity>
          <View className='mt-2 flex-row space-x-2'>
            <Button
              variant='secondary'
              size='sm'
              onPress={retakeImage}
              className='flex-1 bg-accent-blue'
            >
              Alterar
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onPress={removeImage}
              className='flex-1 bg-accent-red'
            >
              Remover
            </Button>
          </View>
        </View>
      ) : (
        <View className='mb-3'>
          <View className='mb-3 h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
            <ThemedText variant='muted' className='text-center text-sm'>
              Nenhuma imagem selecionada
            </ThemedText>
          </View>
          <View className='flex-row gap-4 space-x-2'>
            <Button
              variant='secondary'
              size='sm'
              onPress={pickImage}
              className='flex-1 justify-center items-center bg-accent-blue'
              disabled={loading}
            >
              <View className='flex-1 selection:flex-col items-center justify-center'>
                <MaterialIcons name='photo-library' size={24} color='white' />
                <ThemedText variant='primary' className='text-white text-sm'>
                  Galeria
                </ThemedText>
              </View>
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onPress={takePhoto}
              className='flex-1 justify-center items-center bg-accent-green'
              disabled={loading}
            >
              <View className='flex-1 flex-col items-center justify-center'>
                <Entypo name='camera' size={24} color='white' />
                <ThemedText variant='primary' className='text-white text-sm'>
                  Câmera
                </ThemedText>
              </View>
            </Button>
          </View>
        </View>
      )}

      <ThemedText variant='muted' className='mt-2 text-xs'>
        Formatos suportados: JPG, PNG, WebP • Máximo: 5MB
      </ThemedText>
    </ThemedView>
  );
}
