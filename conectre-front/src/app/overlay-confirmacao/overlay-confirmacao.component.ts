import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MedicaoService } from "../produtor/medicao.service";
import { Subject, takeUntil } from "rxjs";
// import { logout } from '../app.component';

@Component({
  selector: 'app-overlay-confirmacao',
  templateUrl: './overlay-confirmacao.component.html',
  styleUrls: ['./overlay-confirmacao.component.scss']
})
export class OverlayConfirmacaoComponent {
  buttonPopUpAction = 'logout';

  constructor() {}

  onSubmit(buttonPopUpAction: string) {
    if (buttonPopUpAction === "logout") {
      // logout();
    }
    
  }


  closeConfirm() {
    var overlay = document.getElementById('overlayConfirm');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';
  }
}
