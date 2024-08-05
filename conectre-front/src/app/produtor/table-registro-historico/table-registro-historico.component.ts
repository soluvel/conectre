import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MedicaoService } from "../medicao.service";
import { StorageService } from "../../storage.service";

@Component({
  selector: 'app-table-registro-historico',
  templateUrl: './table-registro-historico.component.html',
  styleUrls: ['./table-registro-historico.component.scss']
})
export class TableRegistroHistoricoComponent implements OnInit {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['tanque', 'propriedade', 'convAlimentar', 'gpd', 'temperatura', 'oxigenio', 'racao', 'coleta', 'registro', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 5;
  filter: string;

  constructor(private service: MedicaoService,
              private storage: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.findHistorico(this.storage.getUserId(), this.pageNumber, this.size).subscribe({
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

    this.service.findHistorico(this.storage.getUserId(), page, this.size).subscribe({
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
    this.service.findHistorico(this.storage.getUserId(), number - 1, this.size).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });
  }

  search() {

  }

  redirectToDetails(id: any) {
    this.router.navigate(['/historico', id]);
  }
}

