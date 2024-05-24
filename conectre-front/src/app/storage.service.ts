import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private TOKEN_KEY= 'jwtToken';
  private ROLE_KEY = 'role';
  private USER_KEY = 'user';

  constructor(private router: Router) {
  }

  public saveToken(auth: any): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(auth.token));
    localStorage.setItem(this.ROLE_KEY, auth.role);
    localStorage.setItem(this.USER_KEY, auth.nome);
  }

  public getToken() {
    let jsonString: string;

    if (localStorage.getItem(this.TOKEN_KEY) == undefined) {
      this.router.navigate(['/login']);
    } else {
      jsonString = localStorage.getItem(this.TOKEN_KEY).toString();
      return JSON.parse(jsonString);
    }

  }

  public getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  public getUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  isTokenValido() {
    if (this.getToken()) {
      const tokenPayload = jwtDecode(this.getToken())
      const currentTimestamp = Date.now() / 1000;

      return tokenPayload.exp >= currentTimestamp;
    } else {
      return false
    }
  }

  public clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
