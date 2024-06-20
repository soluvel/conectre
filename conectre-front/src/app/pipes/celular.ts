import { Pipe, PipeTransform } from '@angular/core';
import { StringNumberFormats } from "../utils/StringNumberFormats";

@Pipe({
  standalone: true,
  name: 'celular'
})
export class CelularPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return StringNumberFormats.formatCelular(value);
  }
}
