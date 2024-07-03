import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresaService } from "../empresa.service";

@Component({
  selector: 'app-empresa-filter',
  templateUrl: './empresa-filter.component.html',
  styleUrls: ['./empresa-filter.component.scss']
})
export class EmpresaFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaOpcoes: string[], listaCidades: string[], listaEmpresas: string[] }>();


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

    if (this.checkedPlanos.length === 0) {
      this.nenhumSelecionado = true;
    } else {
      this.nenhumSelecionado = false;
    }

  }

  toggleCidade(cidade: string): void {
    if (this.checkedCidades.includes(cidade)) {
      this.checkedCidades = this.checkedCidades.filter(item => item !== cidade);
    } else {
      this.checkedCidades.push(cidade);
    }
  }

  toggleRazaoSocial(empresa: string): void {
    if (this.checkedRazaoSocial.includes(empresa)) {
      this.checkedRazaoSocial = this.checkedRazaoSocial.filter(item => item !== empresa);
    } else {
      this.checkedRazaoSocial.push(empresa);
    }
  }

  desativarCheckbox(item: string) {
    this.checkboxesAtivos[item] = false;
  }

}
