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
    // const names = name.split(' ');
    // return names.map(name => name.charAt(0)).join('').toUpperCase();
    
    const names = name.trim();
    return name.charAt(0).toUpperCase();
  }

  adicionarAdm(admId) {
    if (admId == null) {
      this.admId = admId;
    }
    
    var overlay = document.getElementById('overlayAdm');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'block';
  
  }

  editarAdm(admId: any) {
    this.admId = admId;
    this.adicionarAdm(admId);
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
    this.openConfirmExclude()
  }

  openConfirmExclude() {
    var overlay = document.getElementById('overlayExclusion');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';
  }

  closeConfirm() {
    var overlay = document.getElementById('overlayExclusion');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';
  }

  async onDelete() {
    if (this.deletAdm != null) {
      this.service.deleteAdministrador(this.deleteAdmId).pipe(takeUntil(this.destroy$)
      ).subscribe({
        next: response => {
        },
        error: error => {
          console.error('Erro:', error);
        }
      });
      this.closeConfirm();
      await this.delay(10);
      this.reloadAdm();

    }

    this.deletAdm = null
    this.deleteAdmNome = null
  }


  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
