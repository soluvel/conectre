import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { EmpresaService } from "../../empresa/empresa.service";
import { ProdutorService } from "../produtor.service";

@Component({
  selector: 'app-produtor-filter',
  templateUrl: './produtor-filter.component.html',
  styleUrls: ['./produtor-filter.component.scss']
})
export class ProdutorFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaPropriedades: string[], listaEquipamentos: string[], listaEmpresas: string[] }>();
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  razaoSocial: any[] = [];
  checkedRazaoSocial: any[] = [];
  qntEquipamento: string[] = ['1 a 4', '5 a 10', '11 ou mais'];
  qntPropriedade: string[] = ['1 a 4', '5 a 10', '11 ou mais'];
  checkedQntEquipamentos: string[] = [];
  checkedQntPropriedades: string[] = [];
  checkedChips: string[] = [];
  nenhumSelecionado: boolean;
  checkboxesAtivos: { [key: string]: boolean } = {};

  constructor(
    private empresaService: EmpresaService,
    private service: ProdutorService) {
  }

  ngOnInit() {
    this.nenhumSelecionado = true;

    this.empresaService.getRazaoSocial().subscribe({
      next: (razaoSocial) => {
        this.razaoSocial = razaoSocial
      }, error: () => {
      }
    });
  }

  enviarFiltro(): void {
    this.filtroAlterado.emit({ listaPropriedades: this.checkedQntPropriedades, listaEquipamentos: this.checkedQntEquipamentos, listaEmpresas: this.checkedRazaoSocial });

  }

  fecharQuadrado() {
    var overlay = document.getElementById('overlay-filter');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'none';

    this.fecharPaineis()
  }

  filter() {
    this.enviarFiltro();
    this.fecharQuadrado();
  }

  toggleRazaoSocial(empresa: string): void {
    if (this.checkedRazaoSocial.includes(empresa)) {
      this.checkedRazaoSocial = this.checkedRazaoSocial.filter(item => item !== empresa);
    } else {
      this.checkedRazaoSocial.push(empresa);
    }
  }

  toggleChip(item: any, list: string[]) {
    const index = list.indexOf(item);
    if (index === -1) {
      list.push(item);
      this.checkboxesAtivos[item] = true;
    } else {
      list.splice(index, 1);
    }

    if (this.checkedRazaoSocial.length === 0 && this.checkedQntEquipamentos.length === 0 && this.checkedQntPropriedades.length === 0) {
      this.nenhumSelecionado = true;
    } else {
      this.nenhumSelecionado = false;
    }
  }

  desativarCheckbox(item: string, listType: string) {
    this.checkboxesAtivos[listType + item] = false;
  }

  limparDados() {
    for (const key in this.checkboxesAtivos) {
      if (Object.prototype.hasOwnProperty.call(this.checkboxesAtivos, key)) {
        this.checkboxesAtivos[key] = false;
        
      }
    }
    this.checkedRazaoSocial = [];
    this.checkedQntEquipamentos = [];
    this.checkedQntPropriedades = [];
    
    this.nenhumSelecionado = true;

    this.fecharPaineis()
  }

  fecharPaineis() {
    if (!this.accordion) { return }
    this.accordion.closeAll();
  }
}
