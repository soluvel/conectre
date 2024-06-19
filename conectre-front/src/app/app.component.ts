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
  title = 'Conectre';
  isLoggedIn: boolean = true;

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
  sidenavWidth = computed(() => (this.collapsed() ? "65px" : "250px"));

  openMenu() {
    document.querySelector('.user-menu').classList.toggle('user-menu-open')
    document.querySelector('.menu-arrow-icon').classList.toggle('menu-open-arrow-icon')
  }

  logout() {
    this.isLoggedIn = false;
    this.storage.clear();
    this._router.navigate(['/login']);
  }
}
