import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../core/services/appointment.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  standalone: false
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingAppointment: Appointment | null = null;
  appointmentForm: Appointment = {
    elderly_id: 0,
    doctor_id: 0,
    appointment_date: '',
    purpose: '',
    notes: ''
  };

  constructor(
    private appointmentService: AppointmentService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadAppointments();
    this.loadElderly();
  }

  loadAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (data: any) => {
        this.appointments = data.data || data;
        console.log('Appointments data:', this.appointments);
      },
      error: (err) => console.error('Error loading appointments:', err)
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
    this.editingAppointment = null;
    this.appointmentForm = {
      elderly_id: 0,
      doctor_id: 0,
      appointment_date: '',
      purpose: '',
      notes: ''
    };
    this.showForm = true;
  }

  openEditForm(appointment: Appointment) {
    this.editingAppointment = appointment;
    this.appointmentForm = { ...appointment };
    this.showForm = true;
  }

  saveAppointment() {
    console.log('Current appointmentForm:', this.appointmentForm);
    
    if (!this.appointmentForm.elderly_id || this.appointmentForm.elderly_id === 0 || !this.appointmentForm.appointment_date || !this.appointmentForm.purpose) {
      alert('Please fill out all required fields');
      return;
    }

    const appointmentData: Appointment = {
      elderly_id: Number(this.appointmentForm.elderly_id),
      doctor_id: Number(this.appointmentForm.doctor_id),
      appointment_date: this.appointmentForm.appointment_date,
      purpose: this.appointmentForm.purpose.trim(),
      notes: this.appointmentForm.notes ? this.appointmentForm.notes.trim() : ''
    };

    console.log('Sending appointment data:', JSON.stringify(appointmentData));

    if (this.editingAppointment) {
      this.appointmentService.update(this.editingAppointment.appointment_id!, appointmentData).subscribe({
        next: (response: any) => {
          console.log('Appointment updated successfully:', response);
          this.loadAppointments();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating appointment:', err);
          alert('An error occurred while updating the appointment: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.appointmentService.create(appointmentData).subscribe({
        next: (response: any) => {
          console.log('Appointment created successfully:', response);
          this.loadAppointments();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating appointment:', err);
          alert('An error occurred while creating the appointment: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.delete(id).subscribe({
        next: () => this.loadAppointments(),
        error: (err) => console.error('Error deleting appointment:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingAppointment = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'Unknown';
  }
}

