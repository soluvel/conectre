import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = 'http://localhost:8080/empresa-administrador';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  getAdministradores(empresaId: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/adm-empresa/${empresaId}`, { headers: this.headers });
  }

  getAdministrador(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
