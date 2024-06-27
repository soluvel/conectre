import { EventEmitter, Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { Propriedade } from "./propriedade";

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {
  private apiUrl = 'http://localhost:8080/propriedade';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) { }


  getPropriedades(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.headers });
  }

  getCidades(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/cidades`, { headers: this.headers });
  }

  save(data: any): Observable<Propriedade> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  count(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/count`, {headers: this.headers});
  }

}
