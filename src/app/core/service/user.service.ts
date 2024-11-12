import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080';


  constructor(
    private http: HttpClient,
  ) { }
  // Metode untuk mendapatkan daftar batch dari API
  getUsers(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/user/not-deleted`);
  }

  saveUser(batchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, batchData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/soft-delete/${id}`, {});
  }
}
