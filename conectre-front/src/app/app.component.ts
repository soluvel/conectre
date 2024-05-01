import { Component, computed, signal } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conectre';
  isLoggedIn: boolean = false;

constructor(private authService: AuthService) {
  this.authService.loggedInChanged.subscribe((loggedIn: boolean) => {
    this.isLoggedIn = loggedIn;
  });
}

  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? "65px" : "250px"));

}
