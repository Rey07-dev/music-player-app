import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  transform(durationMs: number): string {
    if (durationMs == null) {
      return '00:00';
    }

    const duration = Math.round(durationMs / 1000);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

}
