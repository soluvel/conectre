import { EventEmitter, Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { Empresa } from "./empresa";

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

  getCidades(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/cidades`, { headers: this.headers });
  }

  getRazaoSocial(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/razao-social`, { headers: this.headers });
  }

  getEmpresasReduce(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/reduce`, { headers: this.headers });
  }

  getEmpresa(id: any): Observable<Empresa> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  save(data: any): Observable<Empresa> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  filter(numb: number, size: number, planos: string[], cidade: string[], empresa: string[]): Observable<any> {
    let params = new HttpParams();
    for (let plano of planos) {
      params = params.append('planos', plano);
    }
    for (let city of cidade) {
      params = params.append('cidade', city);
    }
    for (let e of empresa) {
      params = params.append('empresa', e);
    }

    return this.http.get<any>(`${this.apiUrl}/filter/${numb}/${size}`, {
      params: params,
      headers: this.headers
    });
  }

}
