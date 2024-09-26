import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private TOKEN_KEY = 'jwtToken';
  private ROLE_KEY = 'role';
  private USER_KEY = 'user';
  private USER_ID = 'user_id';
  private EMPRESA = 'empresa';
  public PAGE_TITLE = '';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  public saveToken(auth: any): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(auth.token));
    localStorage.setItem(this.ROLE_KEY, auth.role);
    localStorage.setItem(this.USER_KEY, auth.nome);
    localStorage.setItem(this.USER_ID, auth.id);

    switch (auth.role) {
      case 'EMPRESA':

        localStorage.setItem(this.EMPRESA, auth.role);
        break;
      case 'TECNICO':

        break;
      default:
        break;
    }


  }

  public getToken() {
    let jsonString: string;

    const url = window.location.pathname;

    if (url.includes('redefinir-senha')) {
      return;
    } else if (localStorage.getItem(this.TOKEN_KEY) == undefined) {
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

  public getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }
  
  public updatePageTitle(pageTitle: string) {
    this.PAGE_TITLE = pageTitle;
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
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.PAGE_TITLE);
  }
}
