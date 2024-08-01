import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StorageService } from "../storage.service";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() collapse: boolean;
  sideNavCollapsed: boolean;
  logoCollapsed: string

  constructor(public storage: StorageService, private appComponent: AppComponent) {}

  ngOnChanges(changes: SimpleChanges) {
    // this.sideNavCollapsed = this.collapse;
    this.logoCollapsed = this.sideNavCollapsed ? 'assets/conectre-icon.svg' : 'assets/conectre-72.svg'
  }

  gestaoItems(): { icon: string, title: string, route: string }[] {
    return [
      {icon: 'home', title: 'Início', route: '/inicio'},
      {icon: 'notifications', title: 'Notificações', route: '/notificacao'},
    ];
  }

  sistemaItems(): { icon: string, title: string, route: string }[] {
    return [
      {icon: 'settings', title: 'Configurações', route: '/home'},
      {icon: 'description', title: 'Políticas de Privacidade', route: '/settings'},
      {icon: 'notifications_unread', title: 'Termos de Uso', route: '/notifications'},
    ];
  }
  
  openSideMenu() {
    document.querySelector('.first-line').classList.toggle('first-line-open-menu');
    document.querySelector('.second-line').classList.toggle('second-line-open-menu');
    document.querySelector('.third-line').classList.toggle('third-line-open-menu');
    
    document.querySelectorAll('.hidden-effect').forEach(topic => {
      topic.classList.toggle('invisible-effect');
    });
  }

  openDropdown() {
    if (document.querySelector('.container-full').clientWidth < 250) {
      this.openSideMenu();
      this.appComponent.collapsed.set(false);
    }
    document.querySelector('.dropdown-content').classList.toggle('dropdown-content-open');
  }

}