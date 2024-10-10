import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    private apiUrl = 'http://localhost:8080/checklist';
    private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

    constructor(private http: HttpClient,
        private storage: StorageService) { }

    save(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/save/record`, data, { headers: this.headers });
    }

}
