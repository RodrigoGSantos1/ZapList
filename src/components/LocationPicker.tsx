import React, { useState } from 'react';
import { View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from './ui';
import { Button } from './ui/Button';

interface LocationPickerProps {
  onLocationSelected: (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => void;
  currentLocation?:
    | { latitude: number; longitude: number; address?: string }
    | undefined;
}

export function LocationPickerComponent({
  onLocationSelected,
  currentLocation,
}: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [hasLocation, setHasLocation] = useState(!!currentLocation);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos acessar sua localização para anexar coordenadas às tarefas.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Configurações',
              onPress: () => {
                Alert.alert(
                  'Configurações',
                  'Vá em Configurações > ZapList > Localização e ative o acesso à localização'
                );
              },
            },
          ]
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível verificar as permissões de localização'
      );
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
      });

      const { latitude, longitude } = location.coords;

      let address = '';
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const addr = reverseGeocode[0];
          address =
            `${addr?.street || ''} ${addr?.streetNumber || ''}, ${addr?.district || addr?.subregion || ''}, ${addr?.city || ''}`.trim();
        }
      } catch (error) {
        console.log('Erro ao obter endereço:', error);
      }

      const locationData = { latitude, longitude, address };
      setHasLocation(true);
      onLocationSelected(locationData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização atual');
    } finally {
      setLoading(false);
    }
  };

  const removeLocation = () => {
    setHasLocation(false);
    onLocationSelected({ latitude: 0, longitude: 0 });
  };

  return (
    <ThemedView variant='secondary' className='rounded-lg p-4'>
      <ThemedText variant='primary' className='mb-3 text-base font-semibold'>
        Localização da Tarefa
      </ThemedText>

      {loading ? (
        <View className='mb-3 h-20 w-full items-center justify-center rounded-lg bg-gray-200'>
          <ActivityIndicator size='large' color='#3B82F6' />
          <ThemedText variant='muted' className='mt-2 text-sm'>
            Obtendo localização...
          </ThemedText>
        </View>
      ) : hasLocation && currentLocation ? (
        <View className='mb-3'>
          <View className='rounded-lg bg-blue-50 p-3'>
            <View className='flex-row items-center'>
              <Ionicons name='location' size={20} color='#3B82F6' />
              <ThemedText
                variant='primary'
                className='ml-2 flex-1 text-sm font-medium'
              >
                Localização capturada
              </ThemedText>
            </View>
            {currentLocation.address && (
              <ThemedText variant='muted' className='mt-1 text-xs'>
                {currentLocation.address}
              </ThemedText>
            )}
            <ThemedText variant='muted' className='mt-1 text-xs'>
              Lat: {currentLocation.latitude.toFixed(6)}, Lng:{' '}
              {currentLocation.longitude.toFixed(6)}
            </ThemedText>
          </View>
          <Button
            variant='secondary'
            size='sm'
            onPress={removeLocation}
            className='mt-2 bg-red-500'
          >
            Remover Localização
          </Button>
        </View>
      ) : (
        <View className='mb-3'>
          <View className='mb-3 h-20 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
            <Ionicons name='location-outline' size={32} color='#9CA3AF' />
            <ThemedText variant='muted' className='mt-2 text-center text-sm'>
              Nenhuma localização selecionada
            </ThemedText>
          </View>
          <Button
            variant='secondary'
            size='sm'
            onPress={getCurrentLocation}
            className='bg-green-500'
            disabled={loading}
          >
            <Ionicons name='location' size={16} color='white' />
            <ThemedText variant='primary' className='ml-2 text-white'>
              Capturar Localização Atual
            </ThemedText>
          </Button>
        </View>
      )}

      <ThemedText variant='muted' className='mt-2 text-xs'>
        A localização será capturada automaticamente quando você criar a tarefa
      </ThemedText>
    </ThemedView>
  );
}
