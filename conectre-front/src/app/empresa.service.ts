import { EventEmitter, Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/empresa';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) { }


  page(numb: number, size: number, filter: string): Observable<any> {



    if (filter != '') {
      return this.http.get<any>(`${this.apiUrl}/page/${numb}/${size}?filter=${filter}`, { headers: this.headers });
    }

    return this.http.get<any>(`${this.apiUrl}/page/${numb}/${size}`, { headers: this.headers });
  };

  getCidades(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cidades`, { headers: this.headers });
  }


}
