import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getPrograms(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/program/not-deleted`);
  }

  saveProgram(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/program`, batchData);
  }

  deleteProgram(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/program/soft-delete/${id}`, {});
  }
}
