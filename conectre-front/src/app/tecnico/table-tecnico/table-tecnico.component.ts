import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TecnicoService} from "../tecnico.service";
import {Router} from "@angular/router";
import { StorageService } from "../../storage.service";

@Component({
  selector: 'app-table-tecnico',
  templateUrl: './table-tecnico.component.html',
  styleUrls: ['./table-tecnico.component.scss']
})
export class TableTecnicoComponent implements OnInit {

  dataSource = new MatTableDataSource<Tecnico>;
  displayedColumns: string[] = ['nome', 'empresa', 'contato', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 5;
  razaoSocial: string;
  filter: string;
  filterQtd: number = 0;
  lastPage: boolean = false;

  constructor(private service: TecnicoService,
              private router: Router,
              public storage: StorageService) {
  }

  ngOnInit(): void {
    this.getTableInfo();
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  }

  getTableInfo() {
    let campo = this.storage.getRole() == 'EMPRESA' ? 'empresa.id' : '';
    this.service.page(this.pageNumber, this.size, '', '', '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'block';
  }

  nextOrBack(isAvancar: boolean) {
    if (this.lastPage && isAvancar) {
      return
    }

    let page = isAvancar ? this.pageNumber + 1 : this.pageNumber - 1;

    this.service.page(page, this.size, '', '', '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

  getSequence(num: number): number[] {
    return Array.from({length: num}, (_, i) => i + 1);
  }

  paginado(number: number) {
    this.service.page(number - 1, this.size,'', '', '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

  clearSearch() {
    this.getTableInfo();
    this.razaoSocial = '';
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/tecnico/editar', id]);
  }

  concatFilter(objList, empresaList) {
    let filteredData = [];

    objList.filter(obj => {
      const empresa = obj.empresa.razaoSocial.trim().toLowerCase();

      const empresaMatch = empresaList.some(e => e.trim().toLowerCase() === empresa) || empresaList.length == 0;

      if (empresaMatch) {
        filteredData.push(obj);
      }
    });

    this.dataSource.data = filteredData;

  }
  onFiltroAlterado(event: { listaEmpresas: string[] }): void {
    this.filterQtd = event.listaEmpresas.length;
    return this.concatFilter(this.dataSource.filteredData, event.listaEmpresas)
  }

  search() {
    this.service.page(0, this.size, this.filter,  '', '',['nome','celular', 'empresa.razaoSocial']).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

    redirectToTecnico() {
      this.router.navigate(['/tecnico/cadastrar']);
    }
}

export interface Tecnico {
  nome: string;
  empresa: string,
  celular: string;
  produtores: []
}

