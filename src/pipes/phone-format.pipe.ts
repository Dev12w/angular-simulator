import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../types/PhoneFormat';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phone: string, mode: PhoneFormat = 'international'): string {
    if (!phone) return '';

    const digits: string = phone.replace(/\D/g, '');

    const countryCode: string = digits.slice(0, 2);
    const operatorCode: string = digits.slice(2, 5);
    const first: string = digits.slice(5, 8);
    const second: string = digits.slice(8, 10);
    const third: string = digits.slice(10, 12);

    switch (mode) {
      case 'compact':
        return `+${digits}`;
      case 'international':
        return `+${countryCode} ${operatorCode} ${first} ${second} ${third}`;
      case 'national':
        return `${operatorCode} ${first} ${second} ${third}`;
      case 'masked':
        return `+${countryCode} ${operatorCode} *** ** ${third}`;
      default:
        return `+${digits}`;
    }
  }
}
