import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "../empresa.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['razaoSocial', 'administradores', 'cnpjCpf', 'grupo', 'plano', 'detalhe'];
  dataSource = new MatTableDataSource<dashboardTrevisan>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginForm: FormGroup;

  checkedPlanos: boolean[];
  hasFilter: boolean = false;
  pageNumber: number = 0;
  totalPage: number;
  size: number = 3;
  razaoSocial: string;

  opcoes: string[] = ['Start', 'Standard', 'Enterprise'];
  cidades: string[];
  checkedCidades: any[];


  constructor(private fb: FormBuilder,
              private empresa: EmpresaService) {
  }



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      filter: ['', Validators.required],
    });

    this.empresa.page(this.pageNumber, this.size, '').subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
        this.totalPage = page.totalPages
      }, error: () => {
      }
    });

    this.empresa.getCidades().subscribe({
      next: (cidades) => {
        this.cidades = cidades
      }, error: () => {
      }
    });

    this.checkedCidades = new Array(this.opcoes.length).fill(false);
    this.checkedPlanos = new Array(this.opcoes.length).fill(false);
  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  fecharQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }

  voltar() {
    this.empresa.page(this.pageNumber - 1, this.size, '').subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }


  avancar() {
    this.empresa.page(this.pageNumber + 1, this.size, '').subscribe({
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
    this.empresa.page(number - 1, this.size, '').subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

  search() {
    this.empresa.page(0 , this.size, this.razaoSocial).subscribe({
      next: (page) => {
        this.dataSource.data = page.content
        this.pageNumber = page.pageable.pageNumber
      }, error: () => {
      }
    });
  }

}

export interface dashboardTrevisan {
  razaoSocial: string;
  administradores: [],
  cnpjCpf: string;
  grupo: string;
  plano: string;
  detalhe: string;
}




