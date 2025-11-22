import { Component, OnInit } from '@angular/core';
import { Medication } from '../../models/medication.model';
import { MedicationService } from '../../core/services/medication.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.css',
  standalone: false
})
export class MedicationsComponent implements OnInit {
  medications: Medication[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingMedication: Medication | null = null;
  medicationForm: Medication = {
    elderly_id: 0,
    medicine_name: '',
    dosage: '',
    frequency: 'once',
    start_date: '',
    end_date: ''
  };

  constructor(
    private medicationService: MedicationService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadMedications();
    this.loadElderly();
  }

  loadMedications() {
    this.medicationService.getAll().subscribe({
      next: (data: any) => {
        this.medications = data.data || data;
        console.log('Medications data:', this.medications);
      },
      error: (err) => console.error('Error loading medications:', err)
    });
  }

  loadElderly() {
    this.elderlyService.getAll().subscribe({
      next: (data: any) => {
        this.elderly = data.data || data;
      },
      error: (err) => console.error('Error loading elderly:', err)
    });
  }

  openAddForm() {
    this.editingMedication = null;
    this.medicationForm = {
      elderly_id: 0,
      medicine_name: '',
      dosage: '',
      frequency: 'once',
      start_date: '',
      end_date: ''
    };
    this.showForm = true;
  }

  openEditForm(medication: Medication) {
    this.editingMedication = medication;
    this.medicationForm = { ...medication };
    this.showForm = true;
  }

  saveMedication() {
    console.log('Current medicationForm:', this.medicationForm);
    
    if (!this.medicationForm.elderly_id || this.medicationForm.elderly_id === 0 || !this.medicationForm.medicine_name || !this.medicationForm.dosage || !this.medicationForm.start_date) {
      alert('Please fill out all required fields');
      return;
    }

    const medicationData: Medication = {
      elderly_id: Number(this.medicationForm.elderly_id),
      medicine_name: this.medicationForm.medicine_name.trim(),
      dosage: this.medicationForm.dosage.trim(),
      frequency: this.medicationForm.frequency,
      start_date: this.medicationForm.start_date,
      end_date: this.medicationForm.end_date || undefined
    };

    console.log('Sending medication data:', JSON.stringify(medicationData));

    if (this.editingMedication) {
      this.medicationService.update(this.editingMedication.medication_id!, medicationData).subscribe({
        next: (response: any) => {
          console.log('Medication updated successfully:', response);
          this.loadMedications();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating medication:', err);
          alert('An error occurred while updating the medication: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.medicationService.create(medicationData).subscribe({
        next: (response: any) => {
          console.log('Medication created successfully:', response);
          this.loadMedications();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating medication:', err);
          alert('An error occurred while creating the medication: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteMedication(id: number) {
    if (confirm('Are you sure you want to delete this medication?')) {
      this.medicationService.delete(id).subscribe({
        next: () => this.loadMedications(),
        error: (err) => console.error('Error deleting medication:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingMedication = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'Unknown';
  }

  getFrequencyLabel(freq: string): string {
    const labels: { [key: string]: string } = {
      'once_daily': 'Once daily',
      'twice_daily': 'Twice daily',
      'thrice_daily': 'Three times a day',
      'four_times_daily': 'Four times a day',
      'as_needed': 'As needed'
    };
    return labels[freq] || freq;
  }
}

