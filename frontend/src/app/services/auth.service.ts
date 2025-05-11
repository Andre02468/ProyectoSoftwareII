import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);
  


  register(userData: any) {
    return this.http.post('/api/auth/register', userData);
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  private loggedIn = false;

  // Método que el guardia puede usar
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }

  private apiUrl = 'http://localhost:3000/api/auth'; // URL completa

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

}