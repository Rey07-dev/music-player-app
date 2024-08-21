import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

}
