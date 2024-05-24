import { Component } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  constructor(public storage: StorageService) {
  }

}
