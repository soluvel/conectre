import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  sideNavCollapsed = signal(true);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  gestaoItems(): { icon: string, title: string, route: string }[] {
    return [
      { icon: 'assets/inicio-grey.svg', title: 'Início', route: '/inicio' },
      { icon: 'assets/notificacoes-grey.svg', title: 'Notificações', route: '/notificacao' },
      { icon: 'assets/cadastros-grey.svg', title: 'Rota Login - teste', route: '/login' },
    ];
  }

  sistemaItems(): { icon: string, title: string, route: string }[] {
    return [
      { icon: 'assets/configuracoes-grey.svg', title: 'Configurações', route: '/home' },
      { icon: 'assets/politicas-grey.svg', title: 'Políticas de Privacidade', route: '/settings' },
      { icon: 'assets/notificacoes-grey.svg', title: 'Termos de Uso', route: '/notifications' },
    ];
  }

  logoCollapsed = computed(() => this.sideNavCollapsed() ? 'assets/conectre-icon.svg' : 'assets/conectre-72.svg')
  imgWidth = computed(() => this.sideNavCollapsed() ? '32px' : '200px')

}
