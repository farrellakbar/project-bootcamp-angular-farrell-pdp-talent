import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _token: string = '';
    private _bearer: string = 'Bearer';
    private _isLoggedIn: boolean = false;
    private apiUrl = 'http://localhost:8080/auth'; // URL Spring Boot API
    user: User | null = null;

    constructor (private http: HttpClient) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User | null {
        if (!this.user) {
            this.user = JSON.parse(sessionStorage.getItem('currentUser')!);
        }
        return this.user;
    }

    /**
     * Performs the login auth
     * @param email email of user
     * @param password password of user
     */login(email: string, password: string): any {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
    .pipe(map(user => {
        if (user && user.token) {
            this.user = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('menu', JSON.stringify(user.menu));
            this.token = user.token; // Pastikan ini diset
        }
        return user;
    }));
}

    /**
     * Performs the signup auth
     * @param name name of user
     * @param email email of user
     * @param password password of user
     */
    signup(name: string, email: string, password: string): any {
        return this.http.post<any>(`/api/signup`, { name, email, password })
            .pipe(map(user => user));

    }



    /**
     * Logout the user
     */
    logout(): void {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('menu');

        this.user = null;
    }

    get token(): string {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
        return currentUser ? `Bearer ${currentUser.token}` : ''; // Mengembalikan format yang benar
    }
    
    set token(value: string) {
      this._token = value;
    }
    
}

