import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { EmpresaService } from "../../empresa/empresa.service";

@Component({
  selector: 'app-tecnico-filter',
  templateUrl: './tecnico-filter.component.html',
  styleUrls: ['./tecnico-filter.component.scss']
})
export class TecnicoFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaEmpresas: string[] }>();
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  razaoSocial: any[] = [];
  checkedRazaoSocial: any[] = [];
  nenhumSelecionado: boolean;
  checkboxesAtivos: { [key: string]: boolean } = {};

  constructor(private empresa: EmpresaService) {
  }

  ngOnInit() {
    this.nenhumSelecionado = true;

    this.empresa.getRazaoSocial().subscribe({
      next: (razaoSocial) => {
        this.razaoSocial = razaoSocial
      }, error: () => {
      }
    });
  }

  enviarFiltro(): void {
    this.filtroAlterado.emit({
      listaEmpresas: this.checkedRazaoSocial
    });
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

  toggleRazaoSocial(empresa: string): void {
    if (this.checkedRazaoSocial.includes(empresa)) {
      this.checkedRazaoSocial = this.checkedRazaoSocial.filter(item => item !== empresa);
    } else {
      this.checkedRazaoSocial.push(empresa);
    }
  }

  toggleChip(item: string) {
    const index = this.checkedRazaoSocial.indexOf(item);
    if (index === -1) {
      this.checkedRazaoSocial.push(item);
    } else {
      this.checkedRazaoSocial.splice(index, 1);
    }

    if (this.checkedRazaoSocial.length === 0) {
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
