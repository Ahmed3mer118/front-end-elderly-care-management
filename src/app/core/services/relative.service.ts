import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Relative } from '../../models/relative.model';

@Injectable({
  providedIn: 'root'
})
export class RelativeService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Relative[]> {
    return this.api.get<Relative>('relatives');
  }

  getById(id: number): Observable<Relative> {
    return this.api.getById<Relative>('relatives', id);
  }

  create(relative: Relative): Observable<Relative> {
    return this.api.create<Relative>('relatives', relative);
  }

  update(id: number, relative: Relative): Observable<Relative> {
    return this.api.update<Relative>('relatives', id, relative);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('relatives', id);
  }
}

