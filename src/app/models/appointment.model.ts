export interface Appointment {
  appointment_id?: number;
  elderly_id: number;
  doctor_id: number;
  appointment_date: string;
  purpose: string;
  notes?: string;
}

