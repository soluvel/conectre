import { Component, computed, signal } from '@angular/core';
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  teste: boolean = false;
  title = 'Conectre';
  isLoggedIn: boolean = true;
  buttonPopUpAction = 'logout';

  constructor(public storage: StorageService,
              private _router: Router,
              private _authService: AuthService) {
    this._authService.loggedInChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.storage.isTokenValido();
  }

  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? "70px" : "272px"));

  openMenu() {
    document.querySelector('.user-menu').classList.toggle('user-menu-open')
    document.querySelector('.menu-arrow-icon').classList.toggle('menu-open-arrow-icon')
  }
  
  onLogout() {
    this.isLoggedIn = false;
    this.collapsed.set(true);
  }
  
  openSideMenu() {
    document.querySelector('.first-line').classList.toggle('first-line-open-menu');
    document.querySelector('.second-line').classList.toggle('second-line-open-menu');
    document.querySelector('.third-line').classList.toggle('third-line-open-menu');
    
    document.querySelectorAll('.hidden-effect').forEach(topic => {
      topic.classList.toggle('invisible-effect');
    });
  }

  openConfirm() {
    var overlay = document.getElementById('overlayConfirm');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    document.querySelector('.overlay-text').innerHTML = 'Você deseja realmente fazer logout de seu usuário?';
    document.querySelector('.confirm-button').innerHTML = 'Fazer logout';
    document.querySelector('.confirm-button').setAttribute("style", "background:#CD0000;");
    document.querySelector('.cancel-button').innerHTML = 'Cancelar';
  }
}
