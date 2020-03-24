import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.loggedIn());
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public get isLoggedInValue(): boolean {
    return this.isLoggedInSubject.value;
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  registerUser(user) {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map(res => {
        const token = res.token;
        const isLoggedIn = !!token;
        this.isLoggedInSubject.next(isLoggedIn);
        localStorage.setItem('token', token);
        this.router.navigate(['/special']);
      })
    );
  }

  loginUser(user) {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      map(res => {
        const token = res.token;
        const userData = res.userData;
        const isLoggedIn = !!token;
        this.isLoggedInSubject.next(isLoggedIn);
        this.userSubject.next(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate([`/events/${userData._id}`]);
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isLoggedInSubject.next(null);
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
