import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresaService } from "../../empresa/empresa.service";
import { ProdutorService } from "../produtor.service";

@Component({
  selector: 'app-produtor-filter',
  templateUrl: './produtor-filter.component.html',
  styleUrls: ['./produtor-filter.component.scss']
})
export class ProdutorFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaPropriedades: string[], listaEquipamentos: string[], listaEmpresas: string[] }>();

  razaoSocial: any[] = [];
  checkedRazaoSocial: any[] = [];
  qnts: string[] = ['1 a 4', '5 a 10', '11 ou mais'];
  checkedQntEquipamentos: string[] = [];
  checkedQntPropriedades: string[] = [];

  constructor(private empresaService: EmpresaService,
              private service: ProdutorService) {
  }

  ngOnInit() {

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

  toggleChip(item: any, list: string[] ) {
    const index = list.indexOf(item);
    if (index === -1) {
      list.push(item);
    } else {
      list.splice(index, 1);
    }
  }
}
