import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {

  showContent: boolean = false;
  redefineView: boolean = true;
  token: string;

  hide = true;
  newPassword: FormGroup
  disableSubmitButton: boolean = true;
  iconStatus = "visibility_off";

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private activeRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.newPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(6)]],
      token: [''],
    })

    this.token = this.activeRouter.snapshot.params['token'];
  }


  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordCheckInput = document.getElementById('passwordCheck') as HTMLInputElement;
    
    passwordInput.type = this.hide ? 'password' : 'text';
    passwordCheckInput.type = this.hide ? 'password' : 'text';
    
    this.iconStatus = (this.iconStatus === 'visibility_off') ? 'visibility' : 'visibility_off';
  }

  updatePassword() {
    this.newPassword.get('token').setValue(this.token);
    this.authService.updatePassword(this.newPassword.getRawValue()).subscribe({
      next: () => {
        console.log("password alterado com sucesso")
      }, error: () => {
      }
    });
  }

  redefinePassword() {
    this.updatePassword()
    this.redefineView = false;
    this.showContent = true;
  }

  showLoginView() {
    this.router.navigate(['/login']);
  }

}
