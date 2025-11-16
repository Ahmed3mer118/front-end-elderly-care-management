import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Assignment } from '../../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Assignment[]> {
    return this.api.get<Assignment>('assignments');
  }

  getById(id: number): Observable<Assignment> {
    return this.api.getById<Assignment>('assignments', id);
  }

  create(assignment: Assignment): Observable<Assignment> {
    return this.api.create<Assignment>('assignments', assignment);
  }

  update(id: number, assignment: Assignment): Observable<Assignment> {
    return this.api.update<Assignment>('assignments', id, assignment);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('assignments', id);
  }
}

