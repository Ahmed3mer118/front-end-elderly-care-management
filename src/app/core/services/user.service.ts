import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) { }

  getAll(): Observable<User[]> {
    return this.api.get<User>('users');
  }

  getById(id: number): Observable<User> {
    return this.api.getById<User>('users', id);
  }

  create(user: User): Observable<User> {
    return this.api.create<User>('users', user);
  }

  update(id: number, user: User): Observable<User> {
    return this.api.update<User>('users', id, user);
  }

  delete(id: number): Observable<void> {
    return this.api.delete('users', id);
  }
}

