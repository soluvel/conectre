import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";

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

  count(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/count`, {headers: this.headers});
  }

}
