import { Component, OnInit } from '@angular/core';
import { TanqueNovoService } from "../../tanqueNovo.service";
import { StorageService } from "../../storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProdutorService } from "../../produtor/produtor.service";
import { ExcelService } from "../../excel.service";

@Component({
  selector: 'app-produtor-home',
  templateUrl: './produtor-home.component.html',
  styleUrls: ['./produtor-home.component.scss']
})
export class ProdutorHomeComponent implements OnInit {
  selectedTanque: string = '';
  produtores: any[] = [];
  tanques: any[];
  // waitingTech: boolean;
  waitingTech = false;

  constructor(private tanqueService: TanqueNovoService,
              private produtorService: ProdutorService,
              private excelService: ExcelService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: StorageService) {

  }

  ngOnInit() {
    this.tanqueService.getTanques(this.storage.getUserId()).subscribe(data => {
      this.tanques = data;
    });

    this.produtorService.getProdutorReduce().subscribe(data => {
      this.produtores = data;
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

  newTanque() {
    // let nome = this.produtores.filter(p => p.id == this.form.get('produtor').value).map(p => p.nome)[0];
    // let dados = this.form.getRawValue();
    // dados.produtorNome = nome;
    // localStorage.setItem('propriedade', JSON.stringify(dados));
    // this.router.navigate(['/tanque/cadastrar']);
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
