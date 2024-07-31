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

  constructor(
      public storage: StorageService,
      private _router: Router,
      private dtc: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dtc.detectChanges();
  }

  onSubmit() {
    this.logoutUser();
  }

  logoutUser() {
    this.storage.clear();
    this._router.navigate(['/login']);
    this.onLogout.emit(true);
    this.closeConfirm();
  }

  closeConfirm() {
    var overlay = document.getElementById('overlayConfirm');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';
  }
}
