import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { EmpresaService } from "../empresa.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-table-empresa',
  templateUrl: './empresa-table.component.html',
  styleUrls: ['./empresa-table.component.scss']
})
export class EmpresaTableComponent {

  dataSource = new MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['razaoSocial', 'administradores', 'cnpjCpf', 'grupo', 'plano', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  filter: string;

  constructor(private service: EmpresaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.page(this.pageNumber, this.size, '').subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });

  }

  onFiltroAlterado(event: { listaOpcoes: string[], listaCidades: string[], listaEmpresas: string[] }): void {
    this.service.filter(this.pageNumber, this.size, event.listaOpcoes, event.listaCidades, event.listaEmpresas).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  nextOrBack(isAvancar: boolean) {

    let page = isAvancar ? this.pageNumber + 1 : this.pageNumber - 1;

    this.service.page(page, this.size, '').subscribe({
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
    this.service.page(number - 1, this.size, '').subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  search() {
    this.service.pageTeste(0, this.size, this.filter).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
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
  plano: string;
  detalhe: string;
}

