import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeMessage: string = 'Empresas cadastradas';
  activeComponent: string;

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
