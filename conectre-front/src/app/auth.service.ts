import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInChanged = new EventEmitter<boolean>();
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  loggar(login: any): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/login`, login);
  };

  requestPassword(login: any): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/redefinir-senha`, login);
  }

  updatePassword(login: any): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/redefinir-senha/update`, login);
  }

  setLoggedIn(value: boolean) {
    this.loggedInChanged.emit(value);
  }

}
