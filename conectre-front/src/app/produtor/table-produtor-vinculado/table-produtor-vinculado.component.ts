import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProdutorService } from "../produtor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-table-produtor-vinculado',
  templateUrl: './table-produtor-vinculado.component.html',
  styleUrls: ['./table-produtor-vinculado.component.scss']
})
export class TableProdutorVinculadoComponent implements OnInit {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'empresa', 'propriedade', 'contato', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  razaoSocial: string;

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
    this.service.page(0, this.size, this.razaoSocial, []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  redirectToDetails(id: any) {
    this.router.navigate(['/produtor/editar', id]);
  }
}

