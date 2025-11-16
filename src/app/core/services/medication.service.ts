import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Medication } from '../../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Medication[]> {
    return this.api.get<Medication>('medications');
  }

  getById(id: number): Observable<Medication> {
    return this.api.getById<Medication>('medications', id);
  }

  create(medication: Medication): Observable<Medication> {
    return this.api.create<Medication>('medications', medication);
  }

  update(id: number, medication: Medication): Observable<Medication> {
    return this.api.update<Medication>('medications', id, medication);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('medications', id);
  }
}

