import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getGroups(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/group/not-deleted`);
  }

  saveGroup(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group`, batchData);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/group/soft-delete/${id}`, {});
  }
}
