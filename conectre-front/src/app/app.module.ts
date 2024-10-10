import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from "@angular/material/tabs";
import { EmpresaTableComponent } from './empresa/table-empresa/empresa-table.component';
import { MatTableModule } from "@angular/material/table";
import { EmpresaComponent } from './empresa/empresa-crud/empresa-cadastro/empresa.component';
import { OverlayConfirmacaoComponent } from './overlay-confirmacao/overlay-confirmacao.component';
import { HttpClientModule } from "@angular/common/http";
import { CpfCnpjPipe } from "./pipes/cpf-cnpj";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { EmpresaFilterComponent } from './empresa/empresa-filter/empresa-filter.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from "./login/login.component";
import { RedefinirSenhaComponent } from "./login/redefinir-senha/redefinir-senha.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { GrupoComponent } from "./empresa/empresa-crud/empresa-cadastro/grupo/grupo.component";
import { TableTecnicoComponent } from "./tecnico/table-tecnico/table-tecnico.component";
import { TableProdutorComponent } from "./produtor/table-produtor/table-produtor.component";
import { EquipamentoComponent } from "./produtor/equipamento/equipamento.component";
import { ToastrModule } from "ngx-toastr";
import { CnpjCpfMaskDirective } from './diretiva/cnpj-cpf-mask.directive';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorCadastroComponent } from './administrador/administrador-cadastro/administrador-cadastro.component';
import { TecnicoCadastroComponent } from './tecnico/tecnico-cadastro/tecnico-cadastro.component';
import { TableProdutorVinculadoComponent } from "./produtor/table-produtor-vinculado/table-produtor-vinculado.component";
import { TecnicoFilterComponent } from "./tecnico/tecnico-filter/tecnico-filter.component";
import { ProdutorCadastroComponent } from "./produtor/produtor-cadastro/produtor-cadastro.component";
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { CepMaskDirective } from "./diretiva/cep-mask.directive";
import { CelularMaskDirective } from "./diretiva/celular-mask.directive";
import { CelularPipe } from "./pipes/celular";
import { ProdutorFilterComponent } from "./produtor/produtor-filter/produtor-filter.component";
import { PropriedadeCadastroComponent } from "./produtor/propriedade-cadastro/propriedade-cadastro.component";
import { TabsTanqueComponent } from './tabs-tanque/tabs-tanque.component';
import { TablePropriedadeVinculadoComponent } from "./produtor/table-propriedade-vinculado/table-propriedade-vinculado.component";
import { AcessoNegadoComponent } from "./acesso-negado/acesso-negado.component";
import { ProdutorHomeComponent } from './home/produtor-home/produtor-home.component';
import {
  TableRegistroHistoricoComponent
} from "./produtor/table-registro-historico/table-registro-historico.component";
import { HistoricoComponent } from './produtor/historico/historico.component';
import { DatePipe } from "@angular/common";
import { DateFormatPipe } from "./pipes/dateFormat";
import { TimeFormatPipe } from "./pipes/timeFormat";
import { CalendarComponent } from './calendar/calendar.component';
import { TanqueComponent } from './tanque/tanque.component';
import { LoteComponent } from './lote/lote.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ComprovanteComponent } from './comprovante/comprovante.component';
import { TableLoteComponent } from './lote/table-lote/table-lote.component';
import { TableHistoricoLoteComponent } from './produtor/table-historico-lote/table-historico-lote.component';
import { TabsBiometriasComponent } from './tabs-biometrias/tabs-biometrias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    TabsTanqueComponent,
    EmpresaTableComponent,
    EmpresaComponent,
    EmpresaFilterComponent,
    SidebarComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    GrupoComponent,
    TableTecnicoComponent,
    TableProdutorComponent,
    EquipamentoComponent,
    CnpjCpfMaskDirective,
    CepMaskDirective,
    CelularMaskDirective,
    AdministradorComponent,
    AdministradorCadastroComponent,
    TecnicoCadastroComponent,
    TableProdutorVinculadoComponent,
    TecnicoFilterComponent,
    ProdutorCadastroComponent,
    NotificacaoComponent,
    ProdutorFilterComponent,
    PropriedadeCadastroComponent,
    TablePropriedadeVinculadoComponent,
    AcessoNegadoComponent,
    OverlayConfirmacaoComponent,
    ProdutorHomeComponent,
    TableRegistroHistoricoComponent,
    HistoricoComponent,
    CalendarComponent,
    TanqueComponent,
    LoteComponent,
    ChecklistComponent,
    ComprovanteComponent,
    TableLoteComponent,
    TableHistoricoLoteComponent,
    TabsBiometriasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    CpfCnpjPipe,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    ToastrModule.forRoot(),
    CelularPipe,
    DateFormatPipe,
    TimeFormatPipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
