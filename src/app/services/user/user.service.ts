import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  updateUserProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }

  resetBalance(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/reset`, {});
  }
}
