import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProdutorService } from "../produtor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-table-produtor',
  templateUrl: './table-produtor.component.html',
  styleUrls: ['./table-produtor.component.scss']
})
export class TableProdutorComponent {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'empresa', 'propriedade', 'equipamento', 'contato', 'detalhe'];
  quantiaPropriedade: any[] = [];
  quantiaEquipamento: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  razaoSocial: string;
  filter: string;

  constructor(private service: ProdutorService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.page(this.pageNumber, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });

  }

  exibirFiltro() {
    var overlay = document.getElementById('overlay-filter');
    overlay.style.display = 'block';
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

  redirectToDetails(id: number) {
    this.router.navigate(['/produtor/editar', id]);
  }

  onFiltroAlterado(event: { listaPropriedades: string[], listaEquipamentos: string[], listaEmpresas: string[] }): void {

    event.listaPropriedades.forEach(i => this.extractRange(i, this.quantiaPropriedade));
    event.listaEquipamentos.forEach(i => this.extractRange(i, this.quantiaEquipamento));
    return this.concatFilter(this.dataSource.filteredData, this.quantiaPropriedade, this.quantiaEquipamento, event.listaEmpresas)
  }

  extractRange(str: string, list: any[]) {
    switch (str) {
      case "1 a 4":
        return list.push({ start: 1, end: 4 });
      case "5 a 10":
        return list.push({ start: 5, end: 10 });
      case "11 ou mais":
        return list.push({ start: 11, end: 999});
      default:
        return null;
    }
  }


  concatFilter(objList, listaPropriedades, listaEquipamentos, listaEmpresas) {
    let filteredData = [];

    objList.filter(obj => {
      const empresa = obj.empresa.razaoSocial.trim().toLowerCase();
      // const equipamento = obj.equipamentos.length;
      const propriedade = obj.propriedades.length;

      const propriedadeMatch = listaPropriedades.some(p => propriedade >= p.start && propriedade <= p.end) || listaPropriedades.length == 0;
      // const equipamentoMatch = listaEquipamentos.some(p => p.start >= equipamento && p.end <= equipamento) || listaEquipamentos.length == 0;
      const empresaMatch = listaEmpresas.some(e => e.trim().toLowerCase() === empresa) || listaEmpresas.length == 0;

      if (propriedadeMatch && empresaMatch) {
        filteredData.push(obj);
      }
    });
    this.dataSource.data = filteredData;
  }
}

export interface Range {
  start: number;
  end: number;
}


