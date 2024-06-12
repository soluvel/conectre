import { Component } from '@angular/core';
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent {
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'mensagem', 'data'];

  onTabChange($event: MatTabChangeEvent) {

  }
}
