import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class EnumValueService {
  private apiUrl = 'http://localhost:8080/enum';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  getEnum(enumValue: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${enumValue}`, {headers: this.headers});
  }

}
