import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {
  isPanelExpanded: boolean = false;

  listaDeObjetos = [
    { nome: "Gabriel Souza", imagem: "https://via.placeholder.com/100" },
    { nome: "Marcelo Trevisan", imagem: "https://via.placeholder.com/100" },
    { nome: "Bruno Kambara", imagem: "https://via.placeholder.com/100" },
    { nome: "Diogo Garcia", imagem: "https://via.placeholder.com/100" },
    { nome: "Giulia Garbo", imagem: "https://via.placeholder.com/100" }
  ];

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  }

}
