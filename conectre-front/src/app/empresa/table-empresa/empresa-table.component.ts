import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { EmpresaService } from "../empresa.service";
import { Router } from "@angular/router";
import { StringNumberFormats } from "../../utils/StringNumberFormats";

@Component({
  selector: 'app-table-empresa',
  templateUrl: './empresa-table.component.html',
  styleUrls: ['./empresa-table.component.scss']
})
export class EmpresaTableComponent {

  dataSource = new MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['razaoSocial', 'administradores', 'cnpjCpf', 'cidade', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 5;
  lastPage: boolean = false;
  filter: string;
  filterQtd: number = 0;

  constructor(private service: EmpresaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTableInfo();

  }

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  }

  getTableInfo() {
    this.service.page(this.pageNumber, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }


  onFiltroAlterado(event: { listaOpcoes: string[], listaCidades: string[], listaEmpresas: string[] }): void {
    let localidade = StringNumberFormats.removeBeforeHifen(event.listaCidades);
    return this.concatFilter(this.dataSource.filteredData, localidade, event.listaOpcoes, event.listaEmpresas)
  }

  concatFilter(objList, localidadeList, planoList, empresaList) {
    let filteredData = [];

    objList.filter(obj => {
      const localidade = obj.endereco.localidade.trim().toLowerCase();
      const plano = obj.plano.trim().toLowerCase();
      const empresa = obj.razaoSocial.trim().toLowerCase();

      const localidadeMatch = localidadeList.some(l => l.trim().toLowerCase() === localidade) || localidadeList.length == 0;
      const planoMatch = planoList.some(p => p.trim().toLowerCase() === plano) || planoList.length == 0;
      const empresaMatch = empresaList.some(e => e.trim().toLowerCase() === empresa) || empresaList.length == 0;

      if (localidadeMatch && planoMatch && empresaMatch) {
        filteredData.push(obj);
      }
    });

    this.dataSource.data = filteredData;

    this.filterQtd = (planoList.length + localidadeList.length + empresaList.length);

  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'block';
  }

  nextOrBack(isAvancar: boolean) {
    if (this.lastPage && isAvancar) {
      //TODO: Dantas, adicionar aqui uma variável ou algo que faça mudar a cor do ícone de avançar paginação para o usuáio entender que chegou na última página.
     return
    }

    let page = isAvancar ? this.pageNumber + 1 : this.pageNumber - 1;

    this.service.page(page, this.size, '', []).subscribe({
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
    this.service.page(number - 1, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

  search() {
    this.service.page(0, this.size, this.filter, ['razaoSocial', 'cnpjCpf']).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
        this.lastPage = page.last
      }, error: () => {
      }
    });
  }

  clearSearch() {
    this.getTableInfo();
    this.filter = '';
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/empresa/editar', id]);
  }


  redirectToEmpresa() {
    this.router.navigate(['/empresa/cadastrar']);
  }
}

export interface Empresa {
  id: number;
  razaoSocial: string;
  administradores: [],
  cnpjCpf: string;
  grupo: string;
  detalhe: string;
}

