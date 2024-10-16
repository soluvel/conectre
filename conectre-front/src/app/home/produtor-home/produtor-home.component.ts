import { Component, OnInit } from '@angular/core';
import { TanqueNovoService } from "../../tanqueNovo.service";
import { StorageService } from "../../storage.service";
import { ExcelService } from "../../excel.service";

@Component({
  selector: 'app-produtor-home',
  templateUrl: './produtor-home.component.html',
  styleUrls: ['./produtor-home.component.scss']
})
export class ProdutorHomeComponent implements OnInit {
  selectedTanque: string = '';
  tanques: any[];

  constructor(private tanqueService: TanqueNovoService,
              private excelService: ExcelService,
              private storage: StorageService) {

  }

  ngOnInit() {
    this.tanqueService.getTanques(this.storage.getUserId()).subscribe(data => {
      this.tanques = data;
    });

    console.log(this.tanques)
  }

  get selectedTanqueName(): string {
    let selectedTanque;
    if (this.tanques != undefined) {
      selectedTanque = this.tanques.find(tanque => tanque.id == this.selectedTanque);
    }
    return selectedTanque ? selectedTanque.nome : '';
  }

  selectOpen() {
    document.querySelector('.select-title').classList.toggle('select-title-open');
    document.querySelector('.menu-arrow-icon-select').classList.toggle('menu-arrow-icon-select-open');

    document.querySelector('.select-infos').classList.toggle('select-infos-open');
  }

  onDownload() {
    this.excelService.downloadPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arquivo.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
