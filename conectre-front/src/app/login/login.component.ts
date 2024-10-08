import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../storage.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showContent: boolean = false;
  showForgotPasswordContent: boolean = false;

  hide = true;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  showLogin: boolean = true;
  error: boolean;
  isLogged: boolean = false;
  iconStatus = "visibility_off";

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              private _tokenService: StorageService,
              private router: Router) {

      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      });
  
      this.forgotPasswordForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]]
      });
  }

  ngOnInit(): void {
    if (this._tokenService.isTokenValido())  {
      this.router.navigate(['/inicio']);
    }


  }


  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.hide ? 'password' : 'text';
    
    this.iconStatus = (this.iconStatus === 'visibility_off') ? 'visibility' : 'visibility_off';
  }

  onSubmit() {
    this.authService.loggar(this.loginForm.getRawValue()).subscribe({
      next: (islogged) => {
        if (islogged != '') {
          this.isLogged = true;
          this.authService.setLoggedIn(this.isLogged);
          this.router.navigate(['/inicio']);
          this._tokenService.saveToken(islogged)
        }

      }, error: () => {
        this.error = true;
      }
    });
  }


  requestNewPasswordByEmail() {
    this.authService.requestPassword(this.forgotPasswordForm.getRawValue()).subscribe({
      next: () => {
      }, error: () => {
      }
    });
  }

  showForgotPassword() {
    this.showLogin = false;
    this.showForgotPasswordContent = true;
  }


  redefinePassword() {
    this.requestNewPasswordByEmail()
    this.showForgotPasswordContent = false;
    this.showContent = true;
  }

  showLoginView() {
    this.showForgotPasswordContent = false;
    this.showContent = false;
    this.showLogin = true;
  }

}

