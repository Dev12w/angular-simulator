import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {

  transform(value: number | string, one: string, few: string, many: string): string {
    const numericValue: number = Math.abs(Number(value));
    const lastDigit: number = numericValue % 10;
    const lastTwoDigits: number = numericValue % 100;

    switch (true) {
      case lastTwoDigits >= 11 && lastTwoDigits <= 14:
        return `${ value } ${ many }`;
      case lastDigit === 1:
        return `${ value } ${ one }`;
      case lastDigit >= 2 && lastDigit <= 4:
        return `${ value } ${ few }`;
      default:
        return `${ value } ${ many }`;
    }
  }
}
