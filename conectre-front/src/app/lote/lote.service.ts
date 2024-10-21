import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { Lote } from "./lote";

@Injectable({
    providedIn: 'root'
})
export class LoteService {
    private apiUrl = 'http://localhost:8080/lote';
    private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

    constructor(private http: HttpClient,
        private storage: StorageService) { }


    getLotes(): Observable<any[]> {
        return this.http.get<any>(`${this.apiUrl}`, { headers: this.headers });
    }

    getLote(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
    }

    getLotesByProdutor(produtor: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/by-produtor/${produtor}`, { headers: this.headers });
    }

    save(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
    }

    count(): Observable<number> {
        return this.http.get<any>(`${this.apiUrl}/count`, { headers: this.headers });
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

    findByPropriedade(id: any, page: any, size: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/find-by-propriedade-id/${id}/${page}/${size}`, { headers: this.headers });
    }

    findDetail(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/find-detail/${id}`, { headers: this.headers });
    }

    findInfos(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/find-infos/${id}`, { headers: this.headers });
    }

    patch(data: any): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/finalizacao`, data, { headers: this.headers });
    }
}
