import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @Output() tabChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public storage: StorageService) {
  }

  onTabChange(event: any) {
    this.tabChange.emit(event.tab.textLabel);
  }

}
