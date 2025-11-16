export interface HealthReport {
  report_id?: number;
  elderly_id: number;
  report_date: string;
  blood_pressure: string;
  heart_rate: number;
  sugar_level: number;
  weight: number;
  notes?: string;
}

