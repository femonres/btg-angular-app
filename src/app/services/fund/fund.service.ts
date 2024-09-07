import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fund } from 'src/app/models/fund';
import { Transaction } from 'src/app/models/transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Fund APIs
  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${this.baseUrl}/funds`);
  }

  subscribeToFund(fundId: number, userId: number, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.baseUrl}/funds/${fundId}/subscribe`,
      {
        userId: userId,
        amount: amount,
      }
    );
  }

  unsubscribeFromFund(fundId: number, userId: number): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.baseUrl}/funds/${fundId}/unsubscribe`,
      {
        userId: userId,
      }
    );
  }

  // Transaction APIs
  getTransactionHistory(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/users/${userId}/history`
    );
  }
}
