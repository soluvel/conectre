import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutorService {

  private apiUrl = 'http://localhost:8080/produtor';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) { }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
  }

  edit(id, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${id}`, data, { headers: this.headers });
  }

  findOne(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  count(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/count`, {headers: this.headers});
  }

  getProdutorReduce(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/reduce`, { headers: this.headers });
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
