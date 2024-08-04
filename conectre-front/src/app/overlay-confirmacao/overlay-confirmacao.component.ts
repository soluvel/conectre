import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { StorageService } from "../storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MedicaoService } from "../produtor/medicao.service";
import { Subject, takeUntil } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-overlay-confirmacao',
  templateUrl: './overlay-confirmacao.component.html',
  styleUrls: ['./overlay-confirmacao.component.scss']
})
export class OverlayConfirmacaoComponent implements OnChanges {
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Input() action: string;

  constructor(
      public storage: StorageService,
      private _router: Router,
      private dtc: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dtc.detectChanges();
  }

  onSubmit() {
    switch (this.action) {
      case 'salvar':
        this.closeConfirm();
        this.onSave.emit();
        break;
      case 'deletar':
        this.closeConfirm();
        this.onDelete.emit();
        break;
      case 'logout':
        this.logoutUser();
        break;
      default:
        break;
    }
    alert(this.action);
  }

  logoutUser() {
    this.storage.clear();
    this._router.navigate(['/login']);
    this.onLogout.emit(true);
    this.closeConfirm();
  }

  closeConfirm() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';

    try {
      var overlay = document.getElementById('overlayConfirm');
      overlay.style.display = 'none';
    } catch (error) {}

    try {
      var overlay = document.getElementById('overlayExclusion');
      overlay.style.display = 'none';
    } catch (error) {}



  }
}
