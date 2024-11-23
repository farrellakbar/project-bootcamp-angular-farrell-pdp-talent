import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getFinancial(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/financial/not-deleted`);
  }

  getFinancialActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/financial/all-active`);
  }

  getScheduleDetail(scheduleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/financial/detail-financial/${scheduleId}`);
  }

  saveGroup(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/financial`, batchData);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/financial/soft-delete/${id}`, {});
  }
}
