import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  get<T>(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`);
  }
  getById<T>(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}/${id}`);
  }
  create<T>(endpoint: string, data: T): Observable<any> {
    console.log('API Service - Creating:', endpoint, data);
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  update<T>(endpoint: string, id: number, data: T): Observable<any> {
    console.log('API Service - Updating:', endpoint, id, data);
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`);
  }
}
