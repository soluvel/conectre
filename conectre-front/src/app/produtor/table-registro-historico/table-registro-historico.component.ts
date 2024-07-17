import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { PropriedadeService } from "../propriedade.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-table-registro-historico',
  templateUrl: './table-registro-historico.component.html',
  styleUrls: ['./table-registro-historico.component.scss']
})
export class TableRegistroHistoricoComponent implements OnInit {

  @Input() produtorId: any;
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['tanque', 'propriedade', 'carbono', 'gpd', 'temperatura','oxigenio', 'racao', 'coleta', 'registro', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  filter: string;

  constructor(private service: PropriedadeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.getPropriedadesByProdutor(this.produtorId).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });

  }

  search() {
    this.service.page(0, this.size, this.filter, ['nome', 'endereco.localidade']).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });
  }

  exibirQuadrado() {

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

  paginado(number: any) {
    this.service.page(number - 1, this.size, '', []).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });
  }

  redirectToDetails(id: any) {
    this.router.navigate(['/propriedade/editar', id]);
  }
}

