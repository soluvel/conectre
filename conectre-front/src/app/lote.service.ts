import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://localhost:8080/lote';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }
}
