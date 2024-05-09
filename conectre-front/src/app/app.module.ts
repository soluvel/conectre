import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { InicioComponent } from './inicio/inicio.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RedefinirSenhaComponent } from "./redefinir-senha/redefinir-senha.component";
import { MatMenuModule } from "@angular/material/menu";
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from "@angular/material/tabs";
import { TableComponent } from './table/table.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { FlexModule } from "@angular/flex-layout";
import { FilterComponent } from './filter/filter.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    NotificacaoComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    TabsComponent,
    TableComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    FlexModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
