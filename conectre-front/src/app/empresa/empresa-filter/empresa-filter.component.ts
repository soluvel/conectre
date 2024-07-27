import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { EmpresaService } from "../empresa.service";

@Component({
  selector: 'app-empresa-filter',
  templateUrl: './empresa-filter.component.html',
  styleUrls: ['./empresa-filter.component.scss']
})
export class EmpresaFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaOpcoes: string[], listaCidades: string[], listaEmpresas: string[] }>();
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;
  @ViewChild(MatAccordion) accordion?: MatAccordion;


  opcoes: string[] = ['Start', 'Standard', 'Enterprise'];
  cidades: string[] = [];
  razaoSocial: string[] = [];
  checkedCidades: any[] = [];
  checkedRazaoSocial: any[] = [];
  checkedPlanos: string[] = [];
  nenhumSelecionado: boolean;
  checkboxesAtivos: { [key: string]: boolean } = {};

  constructor(private empresa: EmpresaService) {

    this.opcoes.forEach(opcao => {
      this.checkboxesAtivos[opcao] = false;
    });
  }

  ngOnInit() {
    this.nenhumSelecionado = true;

    this.empresa.getCidades().subscribe({
      next: (cidades) => {
        this.cidades = cidades
      }, error: () => {
      }
    });

    this.empresa.getRazaoSocial().subscribe({
      next: (razaoSocial) => {
        this.razaoSocial = razaoSocial
      }, error: () => {
      }
    });
  }

  enviarFiltro(): void {
    this.filtroAlterado.emit({ listaOpcoes: this.checkedPlanos, listaCidades: this.checkedCidades, listaEmpresas: this.checkedRazaoSocial });
  }

  fecharQuadrado() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'none';

    this.fecharPaineis()
  }

  filter() {
    this.enviarFiltro();
    this.fecharQuadrado();
  }

  toggleChip(item: string) {
    const index = this.checkedPlanos.indexOf(item);
    if (index === -1) {
      this.checkedPlanos.push(item);
    } else {
      this.checkedPlanos.splice(index, 1);
    }

    this.checkNenhumSelecionado();
  }

  toggleCidade(cidade: string): void {
    if (this.checkedCidades.includes(cidade)) {
      this.checkedCidades = this.checkedCidades.filter(item => item !== cidade);
    } else {
      this.checkedCidades.push(cidade);
    }

    this.checkNenhumSelecionado();
  }

  toggleRazaoSocial(empresa: string): void {
    if (this.checkedRazaoSocial.includes(empresa)) {
      this.checkedRazaoSocial = this.checkedRazaoSocial.filter(item => item !== empresa);
    } else {
      this.checkedRazaoSocial.push(empresa);
    }

    this.checkNenhumSelecionado();
  }

  checkNenhumSelecionado() {
    if (this.checkedPlanos.length === 0 && this.checkedCidades.length === 0 && this.checkedRazaoSocial.length === 0) {
      this.nenhumSelecionado = true;
    } else {
      this.nenhumSelecionado = false;
    }
  }

  desativarCheckbox(item: string) {
    this.checkboxesAtivos[item] = false;
  }

  limparDados() {
    for (const key in this.checkboxesAtivos) {
      if (Object.prototype.hasOwnProperty.call(this.checkboxesAtivos, key)) {
        this.checkboxesAtivos[key] = false;
      }
    }
    this.checkedPlanos = [];
    this.checkedCidades = [];
    this.checkedRazaoSocial = [];

    this.nenhumSelecionado = true;
    this.fecharPaineis();
    this.enviarFiltro();
  }

  fecharPaineis() {
    if (!this.accordion) { return }
    this.accordion.closeAll();
  }

}
