import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  constructor() { }

  heatmapData(): Observable<Array<Position>> {
    return of([{x: 3, y: 5}, {x: 6, y: 34}, {x: 3, y: 5}, {x: 3, y: 5}, {x: 3, y: 5}]);
  }
}
