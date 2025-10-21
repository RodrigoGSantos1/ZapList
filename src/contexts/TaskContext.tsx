import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/task';
import { TaskStorageService } from '../services/TaskStorageService';

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskComplete: (taskId: string) => Promise<void>;
  getTasksByFilter: (filter: 'all' | 'active' | 'completed') => Task[];
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const loadedTasks = await TaskStorageService.getAllTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await TaskStorageService.saveTask(newTask);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await TaskStorageService.saveTask(task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await TaskStorageService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  };

  const toggleTaskComplete = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(updatedTask);
      }
    } catch (error) {
      console.error('Erro ao alternar status da tarefa:', error);
      throw error;
    }
  };

  const getTasksByFilter = (filter: 'all' | 'active' | 'completed'): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        getTasksByFilter,
      }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
}
