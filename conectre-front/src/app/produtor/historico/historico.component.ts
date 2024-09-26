import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MedicaoService } from "../medicao.service";
import { CalendarComponent } from "../../calendar/calendar.component";
import { addMonths } from "date-fns/addMonths";
import { ExcelService } from "../../excel.service";

function startOfMonth(date: Date) {
  return undefined;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  @ViewChildren(CalendarComponent) calendars!: QueryList<CalendarComponent>;


  medicaoId = ''
  selectedDate: Date | null = null;
  tanqueId: any;
  medicao: any;
  medicaoAnterior: any;

  months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedMonths: Set<string> = new Set<string>();

  month1: Date = startOfMonth(new Date());
  month2: Date = addMonths(this.month1, 1);

  tablePeixe: string[] = ['Volume de peixe', 'Nº de peixes por amostra', 'Mortalidade',
    'Peso médio (Kg)', 'Biomassa total (Kg)', 'Ganho de peso (Kg)',
    'Ração', 'C.A (Conversão alimentar)', 'GPD (Ganho de peso diário)'];

  tableAmbiente: string[] = ['Data', 'Horário', 'Ph',
    'Amônia', 'Nitrito', 'Alcalinidade',
    'Transparência', 'Temperatura', 'Oxigênio'];

  constructor(private route: ActivatedRoute,
              private excelService: ExcelService,
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
    this.medicaoService.findOneByData(this.tanqueId, this.selectedDate).subscribe(data => {
      this.medicao = data;
    });

    this.medicaoService.findAnteriorByData(this.tanqueId, this.selectedDate).subscribe(data => {
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

  onDownloadSomatoria() {
    this.excelService.downloadExcelSomatoria().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }

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

  cleanMonthSelection() {
    const yearInput = document.getElementById('yearInput') as HTMLInputElement;
    yearInput.value = '';
    this.selectedMonths.clear();
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

  openExportBox() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    var overlay = document.getElementById('overlayExportar');
    overlay.style.display = 'block';
  }

  handleMonthChange1(newMonth: Date) {
    this.month1 = newMonth;
    this.month2 = addMonths(newMonth, 1);
  }

  handleMonthChange2(newMonth: Date) {
    this.month1 = newMonth;
    this.month2 = addMonths(newMonth, 1);
  }




  ngAfterViewInit() {
    if (this.calendars.length >= 2) {
      const calendarArrowIcons = document.querySelectorAll('.calendar-icon-arrow');

      calendarArrowIcons[1].classList.add('icon-arrow-disable')
      calendarArrowIcons[2].classList.add('icon-arrow-disable')
    }
  }

}
