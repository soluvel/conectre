import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MedicaoService } from "../medicao.service";
import { addMonths } from 'date-fns';

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

  months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedMonths: Set<string> = new Set<string>();

  month1: Date = new Date();
  month2: Date = new Date();

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

  download() {}

  selectMonth(month: string): void {
    if (this.selectedMonths.has(month)) {
      this.selectedMonths.delete(month);
    } else {
      this.selectedMonths.add(month);
    }
  }

  isSelected(month: string): boolean {
    return this.selectedMonths.has(month);
  }

  closeConfirm() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';

    try {
      var overlay = document.getElementById('overlayExportar');
      overlay.style.display = 'none';
    } catch (error) {
    }

  }

  handleMonthChange1(newMonth: Date) {
    this.month1 = newMonth;
    this.month2 = addMonths(newMonth, 1);  // Automatically update month2
  }

  handleMonthChange2(newMonth: Date) {
    this.month2 = newMonth;
  }
}
