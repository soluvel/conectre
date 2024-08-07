import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs";
import { Propriedade } from "./produtor/propriedade";

@Injectable({
  providedIn: 'root'
})
export class TanqueService {
  private apiUrl = 'http://localhost:8080/tanque';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  getTanques(produtorId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-produtor/${produtorId}`, { headers: this.headers });
  }

  save(data: any): Observable<Propriedade> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }
}
