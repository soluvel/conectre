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
import { MatDialogModule } from "@angular/material/dialog";
import { TableTecnicoComponent } from "./tecnico/table-tecnico/table-tecnico.component";
import { TableProdutorComponent } from "./produtor/table-produtor/table-produtor.component";
import { EquipamentoComponent } from "./produtor/equipamento/equipamento.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    EmpresaTableComponent,
    EmpresaComponent,
    EmpresaFilterComponent,
    SidebarComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    GrupoComponent,
    TableTecnicoComponent,
    TableProdutorComponent,
    EquipamentoComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
