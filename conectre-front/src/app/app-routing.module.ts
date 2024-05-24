import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { NotificacaoComponent } from "./notificacao/notificacao.component";
import { LoginComponent } from "./login/login.component";
import { RedefinirSenhaComponent } from "./redefinir-senha/redefinir-senha.component";
import { AcessoNegadoComponent } from "./acesso-negado/acesso-negado.component";
import { AuthGuard } from "./permissions-service";
import { EmpresaFormComponent } from "./empresa/empresa-form/empresa-form.component";
import { TecnicoFormComponent } from "./tecnico-form/tecnico-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'notificacao', component: NotificacaoComponent, data: {role: 'EMPRESA'}, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'redefinir-senha/:token', component: RedefinirSenhaComponent},


  {path: 'cadastrar/empresa', component: EmpresaFormComponent, data: {role: ['ADM_TREVISAN']}, canActivate: [AuthGuard]},
  {
    path: 'cadastrar/tecnico',
    component: TecnicoFormComponent,
    data: {role: ['ADM_TREVISAN', 'EMPRESA']},
    canActivate: [AuthGuard]
  },
  {path: 'cadastrar/produtor', component: RedefinirSenhaComponent},

  {path: 'acesso-negado', component: AcessoNegadoComponent},
  {path: '**', redirectTo: 'acesso-negado'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
