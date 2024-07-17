import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TecnicoService } from "../tecnico.service";
import { Router } from "@angular/router";

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
  size: number = 3;
  razaoSocial: string;

  constructor(private service: TecnicoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.page(this.pageNumber, this.size).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
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

    let page = isAvancar ? this.pageNumber + 1 : this.pageNumber - 1;

    this.service.page(page, this.size).subscribe({
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
    this.service.page(number - 1, this.size).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/tecnico/editar', id]);
  }

  onFiltroAlterado(event: { listaEmpresas: string[] }): void {
    // this.service.filter(this.pageNumber, this.size, event.listaOpcoes, event.listaCidades, event.listaEmpresas).subscribe({
    //   next: (page) => {
    //     this.dataSource.data = page.content
    //     this.pageNumber = page.pageable.pageNumber
    //   }, error: () => {
    //   }
    // });
  }
}

export interface Tecnico {
  nome: string;
  empresa: string,
  celular: string;
  produtores: []
}

