import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MedicaoService } from "../medicao.service";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  medicaoId = ''
  selectedDate: Date | null = null;
  tanqueId: any;
  medicao: any;
  medicaoAnterior: any;

  tablePeixe: string[] = ['Volume de peixe', 'Nº de peixes por amostra', 'Mortalidade',
    'Peso médio (Kg)', 'Biomassa total (Kg)', 'Ganho de peso (Kg)',
    'Ração', 'C.A (Conversão alimentar)', 'GPD (Ganho de peso diário)'];

  tableAmbiente: string[] = ['Data', 'Horário', 'Ph',
    'Amônia', 'Nitrito', 'Alcalinidade',
    'Transparência', 'Temperatura', 'Oxigênio'];

  constructor(private route: ActivatedRoute,
              private medicaoService: MedicaoService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicaoId = params.get('id');
    });
  }

  revealExplication() {
    document.querySelector('.info-explication').classList.toggle('hidden-element');
  }


  findByDate() {
    this.medicaoService.findOneByData(this.tanqueId,this.selectedDate).subscribe(data => {
      this.medicao = data;
    });

    this.medicaoService.findAnteriorByData(this.tanqueId,this.selectedDate).subscribe(data => {
      this.medicaoAnterior = data;
    });
  }

  getTanqueId(tanque: any) {
    this.tanqueId = tanque;
  }

  getData(data: any) {
    this.selectedDate = data;
    this.findByDate();
  }
}
