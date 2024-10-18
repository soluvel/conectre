import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { StorageService } from "../../storage.service";
import { LoteService } from '../lote.service';

@Component({
  selector: 'app-table-lote',
  templateUrl: './table-lote.component.html',
  styleUrls: ['./table-lote.component.scss']
})
export class TableLoteComponent implements OnInit {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['Tanque', 'Propriedade', 'C.A', 'GPD', 'Total recebida', 'Alojamento', 'Despesca', 'Dias de cultivo', 'Detalhes'];
  quantiaPropriedade: any[] = [];
  quantiaEquipamento: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  filter: string; 
  filterQtd: number = 0;

  constructor(private service: LoteService,
              private router: Router,
              public storage: StorageService) {
  }

  ngOnInit(): void {
    this.getTableInfo();
  }

  getTableInfo() {
    this.service.page(this.pageNumber, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });
  }

  getTotalEquipamentos(produtor): number {
    let total = 0;
    produtor.propriedades.forEach(propriedade => {
        total += propriedade.equipamentos.length;
      });
    return total;
  }

  exibirFiltro() {
    var overlay = document.getElementById('overlay-filter');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'block';
  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }


  nextOrBack(isAvancar: boolean) {

    let page = isAvancar ? this.pageNumber + 1 : this.pageNumber - 1;

    this.service.page(page, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  getSequence(num: number): number[] {
    return Array.from({length: num}, (_, i) => i + 1);
  }

  paginado(number: number) {
    this.service.page(number - 1, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  search() {
    this.service.page(0, this.size, this.filter, ['nome', 'empresa.razaoSocial', 'celular']).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });
  }

  clearSearch() {
    this.getTableInfo();
    this.filter = '';
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/produtor/editar', id]);
  }

  onFiltroAlterado(event: { listaPropriedades: string[], listaEquipamentos: string[], listaEmpresas: string[] }): void {
    this.quantiaEquipamento = [];
    this.quantiaPropriedade = [];

    event.listaPropriedades.forEach(i => this.extractRange(i, this.quantiaPropriedade));
    event.listaEquipamentos.forEach(i => this.extractRange(i, this.quantiaEquipamento));
    return this.concatFilter(this.dataSource.filteredData, this.quantiaPropriedade, this.quantiaEquipamento, event.listaEmpresas)
  }

  extractRange(str: string, list: any[]) {
    switch (str) {
      case "1 a 4":
        return list.push({start: 1, end: 4});
      case "5 a 10":
        return list.push({start: 5, end: 10});
      case "11 ou mais":
        return list.push({start: 11, end: 999});
      default:
        return null;
    }
  }


  concatFilter(objList, listaPropriedades, listaEquipamentos, listaEmpresas) {
    let filteredData = [];

    objList.filter(obj => {
      const empresa = obj.empresa.razaoSocial.trim().toLowerCase();
      const equipamento = this.getTotalEquipamentos(obj);
      const propriedade = obj.propriedades.length;

      const propriedadeMatch = listaPropriedades.some(p => propriedade >= p.start && propriedade <= p.end) || listaPropriedades.length == 0;
      const equipamentoMatch = listaEquipamentos.some(p => equipamento >= p.start && equipamento <= p.end) || listaEquipamentos.length == 0;
      const empresaMatch = listaEmpresas.some(e => e.trim().toLowerCase() === empresa) || listaEmpresas.length == 0;

      if (propriedadeMatch && empresaMatch && equipamentoMatch) {
        filteredData.push(obj);
      }
    });
    this.dataSource.data = filteredData;

    console.log(objList.length)

    // this.filterQtd = (listaPropriedades.length + listaEquipamentos.length + listaEmpresas.length);
    this.filterQtd = (listaEmpresas.length);
  }

  redirectToProdutor() {
    this.router.navigate(['/produtor/cadastrar']);
  }
}

export interface Range {
  start: number;
  end: number;
}


