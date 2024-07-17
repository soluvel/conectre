import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./permissions-service";
import { EmpresaComponent } from "./empresa/empresa-crud/empresa-cadastro/empresa.component";
import { AcessoNegadoComponent } from "./acesso-negado/acesso-negado.component";
import { LoginComponent } from "./login/login.component";
import { RedefinirSenhaComponent } from "./login/redefinir-senha/redefinir-senha.component";
import { TecnicoCadastroComponent } from "./tecnico/tecnico-cadastro/tecnico-cadastro.component";
import { ProdutorCadastroComponent } from "./produtor/produtor-cadastro/produtor-cadastro.component";
import { NotificacaoComponent } from "./notificacao/notificacao.component";
import { PropriedadeCadastroComponent } from "./produtor/propriedade-cadastro/propriedade-cadastro.component";
import { HistoricoComponent } from "./produtor/historico/historico.component";

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'redefinir-senha/:token', component: RedefinirSenhaComponent},
  {path: 'empresa/cadastrar', component: EmpresaComponent, data: {role: ['ADM_TREVISAN']}, canActivate: [AuthGuard]},
  {path: 'empresa/editar/:id', component: EmpresaComponent, data: {role: ['ADM_TREVISAN']}, canActivate: [AuthGuard]},
  {path: 'tecnico/cadastrar', component: TecnicoCadastroComponent, data: {role: ['ADM_TREVISAN']}, canActivate: [AuthGuard]},
  {path: 'tecnico/editar/:id', component: TecnicoCadastroComponent, data: {role: ['ADM_TREVISAN']}, canActivate: [AuthGuard]},
  {path: 'produtor/cadastrar', component: ProdutorCadastroComponent, data: {role: ['ADM_TREVISAN', 'TECNICO']}, canActivate: [AuthGuard]},
  {path: 'produtor/editar/:id', component: ProdutorCadastroComponent, data: {role: ['ADM_TREVISAN', 'TECNICO']}, canActivate: [AuthGuard]},
  {path: 'propriedade/cadastrar', component: PropriedadeCadastroComponent, data: {role: ['ADM_TREVISAN', 'TECNICO']}, canActivate: [AuthGuard]},
  {path: 'propriedade/editar/:id', component: PropriedadeCadastroComponent, data: {role: ['ADM_TREVISAN', 'TECNICO']}, canActivate: [AuthGuard]},
  {path: 'historico/:id', component: HistoricoComponent, data: {role: ['ADM_TREVISAN', 'TECNICO', 'PRODUTOR']}, canActivate: [AuthGuard]},
  {path: 'notificacao', component: NotificacaoComponent, data: {role: ['ADM_TREVISAN', 'TECNICO']}, canActivate: [AuthGuard]},
  {path: 'acesso-negado', component: AcessoNegadoComponent},
  {path: '**', redirectTo: 'acesso-negado'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
