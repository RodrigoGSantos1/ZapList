import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { ThemedText, ThemedView } from '../../components/ui';
import { useTheme } from '../../contexts/ThemeContext';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';

export function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  const handleClearData = () => {
    Alert.alert(
      'Limpar Dados',
      'Tem certeza que deseja excluir todas as tarefas? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Implementar limpeza de dados
            Alert.alert('Sucesso', 'Todos os dados foram excluídos');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Sobre o ZapList',
      'Versão 1.0.0\n\nUm app moderno para gerenciamento de tarefas com recursos nativos.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ThemedView variant='primary' className='flex-1'>
      <ScrollView className='flex-1 px-6 py-4'>
        <View className='mb-8'>
          <ThemedText variant='primary' className='text-3xl font-bold mb-2'>
            Configurações
          </ThemedText>
          <ThemedText variant='muted' className='text-base'>
            Personalize sua experiência
          </ThemedText>
        </View>

        <View className='mb-8'>
          <ThemedText variant='primary' className='text-xl font-semibold mb-4'>
            Aparência
          </ThemedText>

          <ThemedView variant='secondary' className='rounded-xl p-4 mb-4'>
            <View className='flex-row items-center flex-1'>
              <MaterialIcons
                name={theme === 'dark' ? 'dark-mode' : 'light-mode'}
                size={24}
                color={theme === 'dark' ? '#F59E0B' : '#6B7280'}
              />
              <View className='ml-3 flex-1'>
                <ThemedText variant='primary' className='text-base font-medium'>
                  Tema
                </ThemedText>
                <ThemedText variant='muted' className='text-sm'>
                  {(() => {
                    if (theme === 'dark') return 'Modo escuro';
                    if (theme === 'light') return 'Modo claro';
                    return 'Sistema';
                  })()}
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          <ThemedView variant='secondary' className='rounded-xl p-4'>
            <ThemedText
              variant='primary'
              className='text-base font-medium mb-3'
            >
              Escolher Tema
            </ThemedText>
            <View className='space-y-2'>
              <Button
                variant={theme === 'light' ? 'primary' : 'secondary'}
                onPress={() => setTheme('light')}
                className='justify-start'
              >
                <View className='flex-row items-center'>
                  <Ionicons
                    name='sunny'
                    size={20}
                    color={theme === 'dark' ? '#FFFFFF' : '#6B7280'}
                  />
                  <ThemedText variant='primary' className='ml-3'>
                    Modo Claro
                  </ThemedText>
                </View>
              </Button>

              <Button
                variant={theme === 'dark' ? 'primary' : 'secondary'}
                onPress={() => setTheme('dark')}
                className='justify-start'
              >
                <View className='flex-row items-center'>
                  <Ionicons
                    name='moon'
                    size={20}
                    color={theme === 'dark' ? '#FFFFFF' : '#6B7280'}
                  />
                  <ThemedText variant='primary' className='ml-3'>
                    Modo Escuro
                  </ThemedText>
                </View>
              </Button>

              <Button
                variant={theme === 'system' ? 'primary' : 'secondary'}
                onPress={() => setTheme('system')}
                className='justify-start'
              >
                <View className='flex-row items-center'>
                  <Ionicons
                    name='phone-portrait'
                    size={20}
                    color={theme === 'dark' ? '#FFFFFF' : '#6B7280'}
                  />
                  <ThemedText variant='primary' className='ml-3'>
                    Seguir Sistema
                  </ThemedText>
                </View>
              </Button>
            </View>
          </ThemedView>
        </View>

        <View className='mb-8'>
          <ThemedText variant='primary' className='text-xl font-semibold mb-4'>
            Dados
          </ThemedText>

          <View className='space-y-3'>
            <Button
              variant='secondary'
              onPress={handleClearData}
              className='justify-start bg-red-500'
            >
              <View className='flex-row items-center'>
                <MaterialIcons
                  name='delete-forever'
                  size={20}
                  color='#FFFFFF'
                />
                <ThemedText className='ml-3 text-white'>
                  Limpar Todos os Dados
                </ThemedText>
              </View>
            </Button>
          </View>
        </View>

        <View className='mb-8'>
          <ThemedText variant='primary' className='text-xl font-semibold mb-4'>
            Sobre
          </ThemedText>

          <Button
            variant='secondary'
            onPress={handleAbout}
            className='justify-start'
          >
            <View className='flex-row items-center'>
              <MaterialIcons
                name='info'
                size={20}
                color={theme === 'dark' ? '#FFFFFF' : '#6B7280'}
              />
              <ThemedText variant='primary' className='ml-3'>
                Sobre o App
              </ThemedText>
            </View>
          </Button>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
