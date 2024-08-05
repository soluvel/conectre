import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicaoService {

  private apiUrl = 'http://localhost:8080/medicao';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) { }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  findOneByTanque(tanqueId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-tanque/${tanqueId}`, { headers: this.headers });
  }

  findOne(medicao: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${medicao}`, { headers: this.headers });
  }

  findHistorico(produtorId, number, size): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historico/${produtorId}/${number}/${size}`, { headers: this.headers });
  }
}
