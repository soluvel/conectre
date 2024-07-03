import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-tabs-tanque',
  templateUrl: './tabs-tanque.component.html',
  styleUrls: ['./tabs-tanque.component.scss']
})
export class TabsTanqueComponent implements OnInit {

  @Output() tabChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(public storage: StorageService,
              ) {
  }

  ngOnInit() {

  }

  onTabChange(event: any) {
    this.tabChange.emit(event.tab.textLabel);
  }

}
