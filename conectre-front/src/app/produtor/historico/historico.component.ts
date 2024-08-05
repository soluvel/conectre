import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit{

  medicaoId = ''

  tablePeixe: string[] = ['Volume de peixe', 'Nº de peixes por amostra', 'Mortalidade',
                          'Peso médio (Kg)', 'Biomassa total (Kg)', 'Ganho de peso (Kg)',
                          'Ração', 'C.A (Conversão alimentar)', 'GPD (Ganho de peso diário)'];

  tableAmbiente: string[] = ['Data', 'Horário', 'Ph',
                          'Amônia', 'Nitrito', 'Alcalinidade',
                          'Transparência', 'Temperatura', 'Oxigênio'];

  constructor(private route: ActivatedRoute,) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicaoId = params.get('id');
    });
  }

  revealExplication() {
    document.querySelector('.info-explication').classList.toggle('hidden-element');
  }


}
