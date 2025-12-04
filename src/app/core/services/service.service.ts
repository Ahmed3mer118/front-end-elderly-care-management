import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Service } from '../../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Service[]> {
    return this.api.get<Service>('services');
  }

  getById(id: number): Observable<Service> {
    return this.api.getById<Service>('services', id);
  }

  create(service: Service): Observable<Service> {
    return this.api.create<Service>('services', service);
  }

  update(id: number, service: Service): Observable<Service> {
    return this.api.update<Service>('services', id, service);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('services', id);
  }
}

