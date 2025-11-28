export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'Cpu' | 'Code' | 'Headset' | 'BarChart';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}