import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AdministradorService } from "./administrador.service";

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {
  isPanelExpanded: boolean = false;
  administradores: any[] = [];
  admId: any;

  constructor(private service: AdministradorService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.service.getAdministradores(params.get('id')).subscribe(data => {
        this.administradores = data;
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
  }

  editarAdm(admId: any) {
    this.admId = admId;
    this.adicionarAdm();
  }
}