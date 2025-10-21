export type RootStackParamList = {
  MainTabs: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
  EditTask: { taskId: string };
};

export type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}