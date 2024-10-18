import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { Propriedade } from "./produtor/propriedade";

@Injectable({
  providedIn: 'root'
})
export class TanqueNovoService {
  private apiUrl = 'http://localhost:8080/tanque-novo';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  getTanques(produtorId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-produtor/${produtorId}`, { headers: this.headers });
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  getTanquesByPropriedades(propriedadeId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list-by-propriedade/${propriedadeId}`, { headers: this.headers });
  }

}
