export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  notification: NotificationPreference;
  subscriptions: Subscription[];
}

export interface Subscription {
  id: string;
  fundId: number;
  fundName: string;
  amount: number;
}

export enum NotificationPreference {
  EMAIL = 'email',
  SMS = 'phone',
}