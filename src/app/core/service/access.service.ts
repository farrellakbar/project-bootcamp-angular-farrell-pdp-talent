import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getAccesses(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/access/not-deleted`);
  }

  saveAccess(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/access`, batchData);
  }

  deleteAccess(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/access/soft-delete/${id}`, {});
  }
}
