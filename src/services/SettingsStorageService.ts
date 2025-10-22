import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_STORAGE_KEY = '@ZapList:settings';

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoSave: boolean;
  language: string;
}

const defaultSettings: AppSettings = {
  theme: 'system',
  notifications: true,
  autoSave: true,
  language: 'pt-BR',
};

export class SettingsStorageService {
  static async getSettings(): Promise<AppSettings> {
    try {
      const settingsJson = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!settingsJson) return defaultSettings;

      const settings = JSON.parse(settingsJson);
      return { ...defaultSettings, ...settings };
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return defaultSettings;
    }
  }

  static async saveSettings(settings: Partial<AppSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...settings };
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    }
  }

  static async saveTheme(theme: 'light' | 'dark' | 'system'): Promise<void> {
    await this.saveSettings({ theme });
  }

  static async clearSettings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar configurações:', error);
      throw error;
    }
  }
}