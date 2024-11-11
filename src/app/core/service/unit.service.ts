import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getUnits(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/unit/not-deleted`);
  }

  saveUnit(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unit`, batchData);
  }

  deleteUnit(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/unit/soft-delete/${id}`, {});
  }
}
