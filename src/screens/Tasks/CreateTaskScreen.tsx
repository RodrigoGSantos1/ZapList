import React, { useState } from 'react';
import { ThemedScrollView } from '../../components/ui/ThemedScrollView';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/ui';
import { Task } from '../../types';

export function CreateTaskScreen() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    completed: false,
    imageUri: '',
    latitude: 0,
    longitude: 0,
    createdAt: new Date(),
  } as Task);

  return (
    <ThemedScrollView variant="primary" className="flex-1">
      <ThemedView variant="primary" className="flex-1 px-6 py-8">
        <View className="mb-8">
          <ThemedText variant="primary" className="text-3xl font-bold">
            Nova Tarefa
          </ThemedText>
          <ThemedText variant="muted" className="mt-2 text-base">
            Preencha os dados para criar uma nova tarefa
          </ThemedText>
        </View>

        <View className="space-y-6">
          <FormField label="Título da Tarefa" required>
            <Input
              placeholder="Digite o título da tarefa"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </FormField>

          <FormField label="Descrição">
            <Input
              placeholder="Descreva os detalhes da tarefa"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
            />
          </FormField>
        </View>

        <View className="mt-8">
          <Button variant="primary" size="lg" className="bg-accent-blue w-full">
            Criar Tarefa
          </Button>
        </View>
      </ThemedView>
    </ThemedScrollView>
  );
}
