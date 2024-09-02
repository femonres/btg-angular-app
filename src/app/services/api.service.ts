import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Fund } from '../models/fund';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // User APIs
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  updateUserProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }

  resetUserBalance(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/reset`, {});
  }

  // Fund APIs
  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${this.baseUrl}/funds`);
  }

  subscribeToFund(fundId: string, amount: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/funds/${fundId}/subscribe`, { amount });
  }

  unsubscribeFromFund(fundId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/funds/${fundId}/unsubscribe`, {});
  }

  // Transaction APIs
  getTransactionHistory(userId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/users/${userId}/history`);
  }
}
