import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(`${this.apiUrl}/events`);
  }

  getEvent(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/events/${userId}`);
  }

  getSpecialEvents() {
    return this.http.get<any>(`${this.apiUrl}/special`);
  }

  addEvent(event) {
    return this.http.post<any>(`${this.apiUrl}/events`, event);
  }

  removeEvent(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/events/${id}`);
  }
}
