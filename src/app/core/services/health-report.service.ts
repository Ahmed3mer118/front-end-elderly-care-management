import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HealthReport } from '../../models/health-report.model';

@Injectable({
  providedIn: 'root'
})
export class HealthReportService {
  constructor(private api: ApiService) { }

  getAll(): Observable<HealthReport[]> {
    return this.api.get<HealthReport>('health-reports');
  }

  getById(id: number): Observable<HealthReport> {
    return this.api.getById<HealthReport>('health-reports', id);
  }

  create(report: HealthReport): Observable<HealthReport> {
    return this.api.create<HealthReport>('health-reports', report);
  }

  update(id: number, report: HealthReport): Observable<HealthReport> {
    return this.api.update<HealthReport>('health-reports', id, report);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('health-reports', id);
  }
}

