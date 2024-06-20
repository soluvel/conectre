import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, '');
    input.value = this.applyCepMask(value);
    this.previousValue = input.value;
  }

  private applyCepMask(value: string): string {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

}
