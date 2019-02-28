import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VelocityService {

  constructor() { }

  velocity(): Observable<number> {
    return of(46.3);
  }
}
