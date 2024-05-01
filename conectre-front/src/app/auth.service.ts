import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInChanged = new EventEmitter<boolean>();
  constructor() { }

  setLoggedIn(value: boolean) {
    this.loggedInChanged.emit(value);
  }

}
