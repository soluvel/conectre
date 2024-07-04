import { EventEmitter, Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { Propriedade } from "./propriedade";
import { Empresa } from "../empresa/empresa";

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

  getPropriedade(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getPropriedadesByProdutor(produtor: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-produtor/${produtor}`, { headers: this.headers });
  }

  save(data: any): Observable<Propriedade> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  count(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/count`, {headers: this.headers});
  }

  page(numb: number, size: number, filter: string, attributes: string[]): Observable<any> {
    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
    }

    attributes.forEach(attribute => {
      params = params.append('attributes', attribute);
    });

    return this.http.get<any>(`${this.apiUrl}/page/${numb}/${size}`, {
      params: params,
      headers: this.headers
    });

  }
}
