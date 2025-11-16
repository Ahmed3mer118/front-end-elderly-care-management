export interface Elderly {
  elderly_id?: number;
  full_name: string;
  birth_date: string;
  gender: 'male' | 'female';
  health_condition: string;
  blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: string;
  emergency_contact: string;
  users_user_id: number;
}

