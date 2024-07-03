import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() collapse: boolean;
  sideNavCollapsed: boolean;
  logoCollapsed: string

  constructor(public storage: StorageService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.sideNavCollapsed = this.collapse;
    this.logoCollapsed = this.sideNavCollapsed ? 'assets/conectre-icon.svg' : 'assets/conectre-72.svg'
  }

  gestaoItems(): { icon: string, title: string, route: string }[] {
    return [
      {icon: 'assets/menu-inicio-icon.svg', title: 'Início', route: '/inicio'},
      {icon: 'assets/menu-notificacoes-icon.svg', title: 'Notificações', route: '/notificacao'},
    ];
  }

  sistemaItems(): { icon: string, title: string, route: string }[] {
    return [
      {icon: 'assets/menu-config-icon.svg', title: 'Configurações', route: '/home'},
      {icon: 'assets/menu-politicas-icon.svg', title: 'Políticas de Privacidade', route: '/settings'},
      {icon: 'assets/menu-notificacoes-icon.svg', title: 'Termos de Uso', route: '/notifications'},
    ];
  }
}
