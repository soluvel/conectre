import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresaService } from "../../empresa/empresa.service";

@Component({
  selector: 'app-tecnico-filter',
  templateUrl: './tecnico-filter.component.html',
  styleUrls: ['./tecnico-filter.component.scss']
})
export class TecnicoFilterComponent implements OnInit {

  @Output() filtroAlterado = new EventEmitter<{ listaEmpresas: string[] }>();

  razaoSocial: any[] = [];
  checkedRazaoSocial: any[] = [];

  constructor(private empresa: EmpresaService) {
  }

  ngOnInit() {

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

}
