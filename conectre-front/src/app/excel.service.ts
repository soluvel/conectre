import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:8080/excel';

  constructor(private http: HttpClient,
              private storage: StorageService) {
  }

  downloadExcel(): Observable<Blob> {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
      'Authorization': `${token}`
    });
    return this.http.get(`${this.apiUrl}/download`, { headers, responseType: 'blob' });
  }

  downloadExcelSomatoria(): Observable<Blob> {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
      'Authorization': `${token}`
    });
    return this.http.get(`${this.apiUrl}/download-somatoria`, { headers, responseType: 'blob' });
  }

  downloadPdf() {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
      'Authorization': `${token}`
    });
    return this.http.get(`${this.apiUrl}/download-pdf`, { responseType: 'blob' });
  }

}
