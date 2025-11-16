import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Appointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Appointment[]> {
    return this.api.get<Appointment>('appointments');
  }

  getById(id: number): Observable<Appointment> {
    return this.api.getById<Appointment>('appointments', id);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.api.create<Appointment>('appointments', appointment);
  }

  update(id: number, appointment: Appointment): Observable<Appointment> {
    return this.api.update<Appointment>('appointments', id, appointment);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('appointments', id);
  }
}

