import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  loginUser(user) {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
