import { Component } from '@angular/core';

@Component({
  selector: 'app-guia-usuario',
  template: `<iframe src="assets/GUIA_USUARIO.pdf" class="full-page-iframe"></iframe>`,
  styles: [`
    .full-page-iframe {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  `]
})
export class GuiaUsuarioComponent {}
