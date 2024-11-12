import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getBatches(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/batch/not-deleted`);
  }

  
  getBatchesActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/batch/all-active`);
  }

  saveBatch(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/batch`, batchData);
  }

  deleteBatch(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/batch/soft-delete/${id}`, {});
  }
}
