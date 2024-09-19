import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { format, startOfMonth, endOfMonth, addMonths, eachDayOfInterval, startOfWeek, endOfWeek, isToday, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
  isCurrentYear: boolean;
  dateKey: string;
}

interface NextCalendarDay {
  nextDay: number;
  date: Date;
  isNextDay: boolean;
  isNextMonth: boolean;
  isNextYear: boolean;
  nextDateKey: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnChanges {
  @Input() specificMonthDate: Date = new Date();
  @Output() monthChanged = new EventEmitter<Date>();

  // days: { day: number, date: Date }[] = [];
  fullDate: Date = new Date();
  today = this.fullDate;

  days: CalendarDay[] = [];
  nextDays: NextCalendarDay[] = [];
  selectedDays: Set<string> = new Set<string>();
  dateRange = new Set<string>();
  formattedMonth: string = '';
  formattedMonth2: string = '';
  weekdays: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['specificMonthDate']) {
      this.updateDays();
    }
  }

  updateDays() {
    const start = startOfMonth(this.specificMonthDate);
    const end = endOfMonth(start);
    const startWeek = startOfWeek(start, { weekStartsOn: 1 }); // Considerando segunda-feira como o início da semana (Sei que no padrão de calendários seria domingo, mas no figma está segunda)
    const endWeek = endOfWeek(end, { weekStartsOn: 1 });

    this.days = eachDayOfInterval({ start: startWeek, end: endWeek })
      .map(day => ({
        day: day.getDate(),
        date: day,
        isCurrentDay: day.getMonth() === this.fullDate.getMonth() && day.getDate() === this.fullDate.getDate() && day.getFullYear() === this.fullDate.getFullYear(),
        isCurrentMonth: day.getMonth() === this.specificMonthDate.getMonth(),
        isCurrentYear: day.getFullYear() === this.fullDate.getFullYear(),
        dateKey: `${this.specificMonthDate.getFullYear()}-${this.specificMonthDate.getMonth()+1}-${day.getDate()}`
      }));
      
    this.formattedMonth = format(this.specificMonthDate, 'MMMM, yyyy', { locale: ptBR });


    const nextMonthDate = addMonths(this.specificMonthDate, 1);
    const startNext = startOfMonth(nextMonthDate);
    const endNext = endOfMonth(startNext);
    const startWeekNext = startOfWeek(startNext, { weekStartsOn: 1 });
    const endWeekNext = endOfWeek(endNext, { weekStartsOn: 1 });

    this.nextDays = eachDayOfInterval({ start: startWeekNext, end: endWeekNext })
      .map(nextDay => ({
        nextDay: nextDay.getDate(),
        date: nextDay,
        isNextDay: nextDay.getMonth() === this.fullDate.getMonth() && nextDay.getDate() === this.fullDate.getDate() && nextDay.getFullYear() === this.fullDate.getFullYear(),
        isNextMonth: nextDay.getMonth() === nextMonthDate.getMonth(),
        isNextYear: nextDay.getFullYear() === this.fullDate.getFullYear(),
        nextDateKey: `${nextMonthDate.getFullYear()}-${nextMonthDate.getMonth()+1}-${nextDay.getDate()}`
      }));

    this.formattedMonth2 = format(nextMonthDate, 'MMMM, yyyy', { locale: ptBR });
  }

  changeMonth(increment: number) {
    this.specificMonthDate = addMonths(this.specificMonthDate, increment);
    this.updateDays();
    this.monthChanged.emit(this.specificMonthDate);
  }

  isToday(date: any): boolean {
    return isToday(date);
  }

  selectDay(dateKey: string): void {
    if (this.selectedDays.has(dateKey)) {
      this.selectedDays.delete(dateKey);
    } else {
      this.selectedDays.add(dateKey);
    }

    if (this.selectedDays.size > 2) {
      this.selectedDays.delete(this.selectedDays.values().next().value);
    }

    this.getDateRange();
  }

  getDateRange() {
    this.dateRange.clear()

    if (this.selectedDays.size == 1) {
      this.dateRange.add(this.selectedDays.values().next().value);
      const dates = Array.from(this.selectedDays).map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      });
    } else {

      const dates = Array.from(this.selectedDays).map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      });
      dates.sort((a, b) => a.getTime() - b.getTime());

      const startDate = dates[0];
      const endDate = dates[1];

      // Gerar o conjunto de datas no intervalo
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        this.dateRange.add(this.formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());

    return `${year}-${month}-${day}`;
  }

  isSelectedDay(day: string): boolean {
    return this.selectedDays.has(day);
  }

  isInRange(dayRange: string): boolean {
    return this.dateRange.has(dayRange)
  }
}