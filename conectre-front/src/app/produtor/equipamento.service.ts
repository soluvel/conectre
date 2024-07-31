import { Injectable } from '@angular/core';
import { StorageService } from "../storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Empresa } from "../empresa/empresa";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  private apiUrl = 'http://localhost:8080/equipamento';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/entity`, data, { headers: this.headers });
  }

  count(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/count`, {headers: this.headers});
  }
}
