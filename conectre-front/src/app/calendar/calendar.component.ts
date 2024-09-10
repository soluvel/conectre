import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { format, startOfMonth, endOfMonth, addMonths, eachDayOfInterval, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input() currentMonth: Date = new Date();
  @Output() monthChanged = new EventEmitter<Date>();
  
  days: { day: number, date: Date }[] = [];
  formattedMonth: string = '';
  weekdays: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentMonth']) {
      this.updateDays();
    }
  }

  updateDays() {
    const start = startOfMonth(this.currentMonth);
    const end = endOfMonth(start);
    const startWeek = startOfWeek(start, { weekStartsOn: 1 }); // Considerando segunda-feira como o início da semana
    const endWeek = endOfWeek(end, { weekStartsOn: 1 });

    this.days = eachDayOfInterval({ start: startWeek, end: endWeek })
      .map(day => ({ day: day.getDate(), date: day }));  // A propriedade `day` é um número agora

    this.formattedMonth = format(this.currentMonth, 'MMMM, yyyy', { locale: ptBR });
  }

  changeMonth(increment: number) {
    this.currentMonth = addMonths(this.currentMonth, increment);
    this.updateDays();
    this.monthChanged.emit(this.currentMonth);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }
}