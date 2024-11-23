import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getSchedules(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/schedule/not-deleted`);
  }

  getSchedulesActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/schedule/all-active`);
  }

  saveSchedule(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/schedule`, data);
  }

  updateSchedule(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedule/${id}`, data);
  }
  
  deleteSchedule(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedule/soft-delete/${id}`, {});
  }

  doneSchedule(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedule/done/${id}`, payload);
  }  
}
