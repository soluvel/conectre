import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from "../storage.service";
import { EmpresaService } from "../empresa/empresa.service";
import { TecnicoService } from "../tecnico/tecnico.service";
import { GrupoService } from "../empresa/empresa-crud/empresa-cadastro/grupo/grupo.service";
import { PropriedadeService } from "../produtor/propriedade.service";
import { EquipamentoService } from "../produtor/equipamento.service";
import { ProdutorService } from "../produtor/produtor.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Output() tabChange: EventEmitter<string> = new EventEmitter<string>();
  empresaQnt = 0;
  grupoQnt = 0;
  tecnicoQnt = 0;
  propriedadeQnt = 0;
  equipamentoQnt = 0;
  produtorQnt = 0

  constructor(public storage: StorageService,
              private empresaService: EmpresaService,
              private grupoService: GrupoService,
              private propriedadeService: PropriedadeService,
              private produtorService: ProdutorService,
              private equipamentoService: EquipamentoService,
              private tecnicoService: TecnicoService,) {
  }

  ngOnInit() {

    this.count();

    switch (this.storage.getRole()) {
      case 'TECNICO':
        this.tabChange.emit('Produtores');
        break;
      case 'PRODUTOR':
        this.tabChange.emit('Produtores');
        break;
      default:
        this.tabChange.emit('Empresas');
        break;
    }

  }

  count() {
    this.empresaService.count().subscribe(qnt => {
      this.empresaQnt = qnt
    });

    this.grupoService.count().subscribe(qnt => {
      this.grupoQnt = qnt
    });

    this.tecnicoService.count().subscribe(qnt => {
      this.tecnicoQnt = qnt
    });

    this.propriedadeService.count().subscribe(qnt => {
      this.propriedadeQnt = qnt
    });

    this.equipamentoService.count().subscribe(qnt => {
      this.equipamentoQnt = qnt
    });

    this.produtorService.count().subscribe(qnt => {
      this.produtorQnt = qnt
    });
  }

  onTabChange(event: any) {
    this.tabChange.emit(event.tab.textLabel);
  }

}
