import { Component, OnInit } from '@angular/core';
import { TanqueService } from "../../tanque.service";

@Component({
  selector: 'app-produtor-home',
  templateUrl: './produtor-home.component.html',
  styleUrls: ['./produtor-home.component.scss']
})
export class ProdutorHomeComponent implements OnInit {
  selectedTanque: string = '';
  tanques: any;

  constructor(private tanqueService: TanqueService) {
  }

  get selectedTanqueName(): string {
    const selectedTanque = this.tanques.find(tanque => tanque.id == this.selectedTanque);
    return selectedTanque ? selectedTanque.nome : '';
  }

  ngOnInit() {
    this.tanqueService.getTanques().subscribe(data => {
      this.tanques = data;
    });
  }

  selectOpen() {
    document.querySelector('.select-title').classList.toggle('select-title-open');
    document.querySelector('.menu-arrow-icon-select').classList.toggle('menu-arrow-icon-select-open');

    document.querySelector('.select-infos').classList.toggle('select-infos-open');
  }
}
