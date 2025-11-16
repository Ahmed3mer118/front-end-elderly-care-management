import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Notification } from '../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private api: ApiService) { }

  getAll(): Observable<Notification[]> {
    return this.api.get<Notification>('notifications');
  }

  getById(id: number): Observable<Notification> {
    return this.api.getById<Notification>('notifications', id);
  }

  create(notification: Notification): Observable<Notification> {
    return this.api.create<Notification>('notifications', notification);
  }

  update(id: number, notification: Notification): Observable<Notification> {
    return this.api.update<Notification>('notifications', id, notification);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('notifications', id);
  }
}

