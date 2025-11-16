export interface Medication {
  medication_id?: number;
  elderly_id: number;
  medicine_name: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'thrice' | 'four_times' | 'as_needed';
  start_date: string;
  end_date?: string;
}

