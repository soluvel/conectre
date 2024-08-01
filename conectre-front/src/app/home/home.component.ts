import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMessage: string = 'Empresas cadastradas';
  activeComponent: string;

  constructor(public storage: StorageService) {
  }

  ngOnInit() {
    if (this.storage.getRole() == 'TECNICO') {
      this.activeComponent = 'Produtores';
      this.activeMessage = 'Produtores cadastrados';
    }

    if (this.storage.getRole() == 'EMPRESA') {
      this.activeComponent = 'Técnicos';
      this.activeMessage = 'Técnicos cadastrados';
    }
  }

  onTabChange(tabLabel: string) {
    this.changeMessage(tabLabel);
    this.activeComponent = tabLabel
  }

  changeMessage(tabLabel: string) {
    const messages = {
      Empresas: 'Empresas cadastradas',
      Técnicos: 'Técnicos cadastrados',
      Produtores: 'Produtores cadastrados',
      default: 'Empresas cadastradas'
    };

    this.activeMessage = messages[tabLabel] || messages.default;
  }

  getActiveComponent(): string {
    return this.activeComponent;
  }

}
