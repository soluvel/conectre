import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cep'
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    if (value.length === 8) {
      return value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
    } else {
      return value;
    }
  }
}
