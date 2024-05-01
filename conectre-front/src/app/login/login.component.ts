import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showContent: boolean = false;
  showForgotPasswordContent: boolean = false;

  hide = true;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  showLogin: boolean = true;
  errorMessage: string;
  error: boolean;
  isLogged: boolean = false;

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.hide ? 'password' : 'text';
  }

  onSubmit() {
    this.authService.loggar(this.loginForm.getRawValue()).subscribe({
      next: (islogged) => {
        this.isLogged = islogged;
        this.authService.setLoggedIn(islogged);
        if (islogged) {
          this.router.navigate(['/inicio']);
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
