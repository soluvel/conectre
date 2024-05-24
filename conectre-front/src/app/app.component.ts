import { Component, computed, OnInit, signal } from '@angular/core';
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Conectre';
  isLoggedIn: boolean = false;

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

  logout() {
    this.isLoggedIn = false;
    this.storage.clear();
    this._router.navigate(['/login']);
  }
}
