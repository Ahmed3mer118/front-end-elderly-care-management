export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email: string;
  role: 'admin' | 'caregiver' | 'family_member';
  created_at?: string;
}

