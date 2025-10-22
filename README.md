# 📱 ZapList - App de Lista de Tarefas

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://www.nativewind.dev/)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)](https://github.com/seu-usuario/ZapList)

Um aplicativo React Native moderno para gerenciamento de tarefas com recursos nativos como captura de fotos e localização GPS. Desenvolvido com Expo, TypeScript e NativeWind para uma experiência de usuário fluida e responsiva.

## 🚀 Como Instalar e Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app no seu dispositivo móvel (para testes)

### Instalação

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd ZapList
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o projeto:**

```bash
# Para desenvolvimento
npm start

# Para Android
npm run android

# Para iOS
npm run ios
```

4. **Acesse o app:**

- Escaneie o QR code com o Expo Go (Android/iOS)
- Ou use um emulador Android/iOS

## 🎥 Demonstração em Vídeo

<div align="center">
  
https://imgur.com/gallery/zaplist-mp4-86GxsXl

</div>

**Funcionalidades demonstradas:**

- ✅ Criação de tarefas com foto e localização
- ✅ Navegação entre telas
- ✅ Filtros de tarefas
- ✅ Tema claro/escuro
- ✅ Configurações e limpeza de dados

## 📸 Screenshots do Aplicativo

Aqui estão as principais telas do ZapList em ação, demonstrando todas as funcionalidades implementadas:

### **📋 Lista de Tarefas**

Interface principal com lista de tarefas, filtros e navegação intuitiva. Mostra as tarefas com imagens, localização e status visual.

<div align="center">
  <img src="https://i.imgur.com/0CxKM8E_d.webp?maxwidth=760&fidelity=grand" width="300" alt="Lista de Tarefas" />
</div>

### **➕ Nova Tarefa**

Tela para criação de novas tarefas com campos de título, descrição, captura de fotos e localização GPS.

<div align="center">
  <img src="https://i.imgur.com/EzUuGIN_d.webp?maxwidth=760&fidelity=grand" width="300" alt="Nova Tarefa" />
</div>

### **✏️ Editar Tarefa**

Interface de edição com todos os campos preenchidos, permitindo alterar título, descrição, foto e localização.

<div align="center">
  <img src="https://i.imgur.com/hU9pQjH_d.webp?maxwidth=760&fidelity=grand" width="300" alt="Editar Tarefa" />
</div>

### **👁️ Detalhes da Tarefa**

Visualização completa da tarefa com foto anexada, coordenadas GPS e informações detalhadas.

<div align="center">
  <img src="https://i.imgur.com/CHkiKMy_d.webp?maxwidth=760&fidelity=grand" width="300" alt="Detalhes da Tarefa" />
</div>

### **⚙️ Configurações**

Tela de configurações com opções de tema (claro/escuro), gerenciamento de dados e informações do app.

<div align="center">
  <img src="https://i.imgur.com/TO34ctC_d.webp?maxwidth=760&fidelity=grand" width="300" alt="Configurações" />
</div>

## 🎯 Demonstração Visual

<div align="center">
  <img src="https://i.imgur.com/0CxKM8E_d.webp?maxwidth=760&fidelity=grand" width="180" alt="Lista de Tarefas" />
  <img src="https://i.imgur.com/EzUuGIN_d.webp?maxwidth=760&fidelity=grand" width="180" alt="Nova Tarefa" />
  <img src="https://i.imgur.com/hU9pQjH_d.webp?maxwidth=760&fidelity=grand" width="180" alt="Editar Tarefa" />
</div>

<div align="center">
  <img src="https://i.imgur.com/CHkiKMy_d.webp?maxwidth=760&fidelity=grand" width="180" alt="Detalhes da Tarefa" />
  <img src="https://i.imgur.com/TO34ctC_d.webp?maxwidth=760&fidelity=grand" width="180" alt="Configurações" />
</div>

## 🛠️ Tecnologias e Bibliotecas Escolhidas

### **Core Framework**

- **React Native + Expo**: Escolhido por sua facilidade de desenvolvimento, hot reload e acesso a APIs nativas sem configuração complexa
- **TypeScript**: Para tipagem estática, melhor IntelliSense e redução de bugs em tempo de desenvolvimento

### **Navegação**

- **React Navigation**: Biblioteca padrão para navegação em React Native
- **Stack Navigator**: Para navegação entre telas (Lista → Detalhes → Editar)\*\*
- **Tab Navigator**: Para navegação principal entre Lista e Configurações

### **Estilização**

- **NativeWind**: Tailwind CSS para React Native, permitindo estilização rápida e consistente
- **Sistema de Temas**: Implementação de tema claro/escuro com Context API

### **Persistência de Dados**

- **AsyncStorage**: Armazenamento local assíncrono para funcionamento offline
- **Context API**: Gerenciamento de estado global das tarefas

### **Recursos Nativos**

- **expo-image-picker**: Captura de fotos da câmera e seleção da galeria
- **expo-camera**: Acesso direto à câmera do dispositivo
- **expo-location**: Captura de coordenadas GPS e geocodificação reversa

### **Desenvolvimento**

- **ESLint + Prettier**: Linting e formatação automática de código
- **Babel**: Transpilação de código JavaScript/TypeScript

## 💾 Como Implementei a Persistência

### **Arquitetura de Persistência**

A persistência foi implementada usando uma arquitetura em camadas:

````
┌──────────────────┐
│   Components     │ ← Interface do usuário
├──────────────────┤
│   TaskContext    │ ← Gerenciamento de estado global
├──────────────────┤
│TaskStorageService│ ← Camada de abstração para persistência
├──────────────────┤
│   AsyncStorage   │ ← Armazenamento local do dispositivo
└──────────────────┘
```

### **TaskStorageService - Camada de Persistência**

```typescript
export class TaskStorageService {
  static async getAllTasks(): Promise<Task[]> {
    // Carrega todas as tarefas do AsyncStorage
    // Converte strings JSON de volta para objetos Date
  }

  static async saveTask(task: Task): Promise<void> {
    // Salva/atualiza uma tarefa específica
    // Atualiza automaticamente o campo updatedAt
  }

  static async deleteTask(taskId: string): Promise<void> {
    // Remove uma tarefa específica
  }
}
```

### **TaskContext - Gerenciamento de Estado**

```typescript
export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Sincroniza estado local com AsyncStorage
  const createTask = async taskData => {
    const newTask = { ...taskData, id: crypto.randomUUID() };
    await TaskStorageService.saveTask(newTask);
    setTasks(prev => [...prev, newTask]);
  };
}
```

### **Características da Implementação**

- ✅ **Funcionamento 100% Offline**: Todos os dados são armazenados localmente
- ✅ **Sincronização Automática**: Estado local sempre sincronizado com AsyncStorage
- ✅ **Tratamento de Erros**: Fallbacks para dados corrompidos
- ✅ **Performance**: Carregamento assíncrono sem bloqueio da UI
- ✅ **Tipagem Forte**: TypeScript garante integridade dos dados

## 🚧 Desafios que Enfrentei e Como Resolvi

### **1. Geração de IDs Únicos**

**Problema**: Inicialmente usei `Date.now().toString()` que poderia gerar IDs duplicados
**Solução**: Implementei `crypto.randomUUID()` para garantir unicidade

### **2. Persistência de Objetos Date**

**Problema**: AsyncStorage só armazena strings, perdendo informações de data
**Solução**:

```typescript
// Ao salvar: converte Date para string
JSON.stringify(tasks);

// Ao carregar: converte string de volta para Date
tasks.map(task => ({
  ...task,
  createdAt: new Date(task.createdAt),
  updatedAt: new Date(task.updatedAt),
}));
```

### **3. Gerenciamento de Permissões Nativas**

**Problema**: Acesso à câmera e localização requer permissões específicas
**Solução**: Implementei sistema robusto de permissões:

```typescript
const requestPermissions = async (type: 'camera' | 'gallery') => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.status !== 'granted') {
    // Mostra alerta explicativo e direciona para configurações
  }
};
```

### **4. Validação de Imagens**

**Problema**: Imagens muito grandes ou formatos não suportados
**Solução**: Sistema de validação com limites:

```typescript
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
```

### **5. Navegação com Parâmetros**

**Problema**: Passar dados entre telas (taskId, dados da tarefa)
**Solução**: Implementei navegação tipada com React Navigation:

```typescript
navigation.navigate('TaskDetail', { taskId: task.id });
```

## 🔮 O que Faria Diferente com Mais Tempo

### **1. Testes Automatizados**

- Implementaria testes unitários com Jest
- Testes de integração para fluxos completos
- Testes E2E com Detox

### **2. Banco de Dados Mais Robusto**

- Migração para SQLite com expo-sqlite
- Implementação de índices para performance
- Sistema de backup/restore

### **3. Sincronização em Nuvem**

- Integração com Firebase ou Supabase
- Sincronização automática entre dispositivos
- Resolução de conflitos de dados

### **4. Melhorias de UX**

- Animações mais fluidas com Reanimated
- Sistema de notificações push
- Widgets para tela inicial
- Modo offline mais inteligente

### **5. Funcionalidades Avançadas**

- Categorias e tags para tarefas
- Sistema de lembretes
- Compartilhamento de tarefas
- Modo colaborativo

### **6. Performance e Otimização**

- Implementação de lazy loading
- Otimização de imagens
- Cache inteligente
- Bundle splitting

## ⏱️ Tempo Total Investido

### **Desenvolvimento Atual: ~40 horas**

- **Configuração inicial e estrutura**: 8 horas
- **Implementação do CRUD**: 12 horas
- **Recursos nativos (fotos/localização)**: 10 horas
- **Navegação e telas**: 6 horas
- **Polimento e testes**: 4 horas

### **Breakdown Detalhado**

| Fase      | Tempo | Descrição                                         |
| --------- | ----- | ------------------------------------------------- |
| Setup     | 8h    | Expo, TypeScript, NativeWind, estrutura de pastas |
| CRUD      | 12h   | TaskContext, TaskStorageService, telas básicas    |
| Nativos   | 10h   | ImagePicker, LocationPicker, permissões           |
| Navegação | 6h    | React Navigation, passagem de parâmetros          |
| UX        | 4h    | Temas, componentes, validações                    |

### **Estimativa para Versão Completa: +20 horas**

- Testes automatizados: 8h
- Banco de dados robusto: 6h
- Sincronização em nuvem: 4h
- Funcionalidades avançadas: 2h

## 📱 Funcionalidades Implementadas

### ✅ **Funcionalidades Básicas**

- Criar, editar, excluir tarefas
- Marcar como concluída/pendente
- Filtros (todas/ativas/concluídas)
- Persistência local offline

### ✅ **Recursos Nativos**

- Captura de fotos (câmera/galeria)
- Captura de localização GPS
- Tratamento de permissões
- Validação de arquivos

### ✅ **Interface**

- Tema claro/escuro
- Design responsivo
- Componentes reutilizáveis
- Navegação intuitiva

## 🚀 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com usando React Native, Expo e TypeScript**
````
