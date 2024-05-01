import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { NotificacaoComponent } from "./notificacao/notificacao.component";
import { LoginComponent } from "./login/login.component";
import { RedefinirSenhaComponent } from "./redefinir-senha/redefinir-senha.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'notificacao', component: NotificacaoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'redefinir-senha/:token', component: RedefinirSenhaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
