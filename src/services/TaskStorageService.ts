import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_STORAGE_KEY = '@ZapList:tasks';

export class TaskStorageService {
  static async getAllTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (!tasksJson) return [];

      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      return [];
    }
  }

  static async saveTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const existingIndex = tasks.findIndex(t => t.id === task.id);

      const taskToSave = {
        ...task,
        updatedAt: new Date(),
      };

      if (existingIndex >= 0) {
        tasks[existingIndex] = taskToSave;
      } else {
        tasks.push(taskToSave);
      }

      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      throw error;
    }
  }

  static async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }

  static async clearAllTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar tarefas:', error);
      throw error;
    }
  }
}