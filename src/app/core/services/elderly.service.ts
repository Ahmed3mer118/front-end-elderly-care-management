import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Elderly } from '../../models/elderly.model';

@Injectable({
  providedIn: 'root'
})
export class ElderlyService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Elderly[]> {
    return this.api.get<Elderly>('elderly');
  }

  getById(id: number): Observable<Elderly> {
    return this.api.getById<Elderly>('elderly', id);
  }

  create(elderly: Elderly): Observable<Elderly> {
    return this.api.create<Elderly>('elderly', elderly);
  }

  update(id: number, elderly: Elderly): Observable<Elderly> {
    return this.api.update<Elderly>('elderly', id, elderly);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('elderly', id);
  }
}

