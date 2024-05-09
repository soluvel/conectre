import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['empresa', 'adm', 'cnpj', 'grupo', 'plano', 'detalhe'];
  dataSource = new MatTableDataSource<dashboardTrevisan>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginForm: FormGroup;
  checked: boolean = false;
  hasFilter: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      filter: ['', Validators.required],
    });
    this.exibirQuadrado()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRange(num: number): number[] {
    return Array(num).fill(0).map((x, i) => i);
  }

  exibirQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  fecharQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }
}

// @ts-ignore
export interface dashboardTrevisan {
  empresa: string;
  adm: number;
  cnpj: string;
  grupo: string;
  plano: string;
  detalhe: string;
}

const ELEMENT_DATA: dashboardTrevisan[] = [
  {empresa: 'C.Vale', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'C.Vale', adm: 5, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Start', detalhe: 'assets/search.svg'},
  {empresa: 'C.Vale', adm: 2, cnpj: '53.361.412/0001-13', grupo: 'Grupo Tilápia', plano: 'Enterprise', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 1, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 3 ,cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'C.Vale', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'C.Vale', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'C.Vale', adm: 3, cnpj: '53.361.412/0001-13', grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
  {empresa: 'Copacol', adm: 3, cnpj: '53.361.412/0001-13' , grupo: 'Grupo Tilápia', plano: 'Standart', detalhe: 'assets/search.svg'},
];



