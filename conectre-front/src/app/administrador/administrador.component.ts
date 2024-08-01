import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AdministradorService } from "./administrador.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit, OnDestroy {
  isPanelExpanded: boolean = false;
  existAdm: boolean = true;
  administradores: any[] = [];
  admId: any;
  empresaId: any;
  deletAdm: boolean = false;
  deleteAdmId: any;
  deleteAdmNome: any;
  private destroy$ = new Subject<void>();

  constructor(private service: AdministradorService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAdministradores()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAdministradores() {
    this.route.paramMap.subscribe(params => {
      this.service.getAdministradores(params.get('id')).subscribe(data => {
        this.empresaId = params.get('id');
        this.administradores = data;
        this.existAdm = this.administradores.length > 0;
      })
    });
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  }

  adicionarAdm() {
    var overlay = document.getElementById('overlayAdm');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'block';
  }

  editarAdm(admId: any) {
    this.admId = admId;
    this.adicionarAdm();
  }

  animationArrow() {
    document.querySelector('.license-arrow-icon').classList.toggle('license-arrow-icon-open');
  }

  reloadAdm() {
    this.getAdministradores();
  }

  callDeletePopUp(id, nome) {
    this.deleteAdmId = id;
    this.deleteAdmNome = nome;
    // this.openConfirm()

  }

  //TODO: Dantas, esse é o pop up de excluir que está desformatado. Pelo jeito é alguma interferência do css, né?
  // openConfirm() {
  //   var overlay = document.getElementById('overlayExclusion');
  //   overlay.style.display = 'block';
  //
  //   var filterWall = document.getElementById('filterWall');
  //   filterWall.style.display = 'block';
  //
  //   document.querySelector('.overlay-text').innerHTML = `Deseja realmente excluir o administrador ${this.deleteAdmNome}`;
  //   document.querySelector('.confirm-button').innerHTML = 'Excluir';
  //   document.querySelector('.confirm-button').setAttribute("style", "background:#068FFF;");
  //   document.querySelector('.cancel-button').innerHTML = 'Descartar alteração';
  // }

  onDelete() {
    if (this.deletAdm != null) {
      this.service.deleteAdministrador(this.deleteAdmId).pipe(takeUntil(this.destroy$)
      ).subscribe({
        next: response => {
        },
        error: error => {
          console.error('Erro:', error);
        }
      });
    }

    this.deletAdm = null
    this.deleteAdmNome = null
  }
}
