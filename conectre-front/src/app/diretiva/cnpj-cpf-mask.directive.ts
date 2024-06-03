import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCnpjCpfMask]'
})
export class CnpjCpfMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, '');

    if (value.length <= 11) {
      input.value = this.applyCpfMask(value);
    } else {
      input.value = this.applyCnpjMask(value);
    }

    this.previousValue = input.value;
  }

  private applyCpfMask(value: string): string {
    return value.replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  private applyCnpjMask(value: string): string {
    return value.replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
}
