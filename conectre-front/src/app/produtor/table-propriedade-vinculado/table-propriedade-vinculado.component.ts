import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { EmpresaService } from "../../empresa/empresa.service";
import { PropriedadeService } from "../propriedade.service";

@Component({
  selector: 'app-table-propriedade-vinculado',
  templateUrl: './table-propriedade-vinculado.component.html',
  styleUrls: ['./table-propriedade-vinculado.component.scss']
})
export class TablePropriedadeVinculadoComponent implements OnInit {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'local', 'tanques', 'detalhe'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  razaoSocial: string;

  constructor(private service: PropriedadeService) {}

  ngOnInit(): void {
    this.service.getPropriedadesByProdutor(3).subscribe({
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

  exibirQuadrado() {

  }

  nextOrBack(b: boolean) {

  }

  getSequence(num: number): number[] {
    return Array.from({length: num}, (_, i) => i + 1);
  }

  paginado(number: any) {

  }
}

