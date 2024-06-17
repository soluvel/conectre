import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCelularMask]'
})
export class CelularMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, '');
    input.value = this.applyCelularMask(value);
    this.previousValue = input.value;
  }

  private applyCelularMask(value: string): string {
    return value.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4');
  }

}
