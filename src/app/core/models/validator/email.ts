import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export function asyncEmailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value).pipe(
    delay(1000),
    map(value => {
      const isEmailTaken = value === 'existing@example.com';
      return isEmailTaken ? { emailTaken: true } : null;
    })
  );
}
