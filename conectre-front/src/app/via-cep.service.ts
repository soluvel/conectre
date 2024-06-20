import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private apiUrl = 'http://localhost:8080/via-cep';
  private headers = new HttpHeaders().set('Authorization', this.storage.getToken());

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  getEndereco(cep: string): Observable<any> {
    let cepSemFormatacao = cep.replace(/[-.]/g, "");
    return this.http.get<any>(`${this.apiUrl}/${cepSemFormatacao}`, {headers: this.headers});
  }

}
