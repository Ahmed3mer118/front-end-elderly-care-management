export interface Notification {
  notification_id?: number;
  elderly_id: number;
  type: 'alert' | 'reminder' | 'info';
  message: string;
  created_at?: string;
  status: 'read' | 'unread';
}

