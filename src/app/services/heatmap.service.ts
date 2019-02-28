import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Point } from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  constructor() { }

  heatmapData(): Observable<Array<Point>> {
    return of([{x: 3, y: 5}, {x: 6, y: 34}, {x: 3, y: 5}, {x: 3, y: 5}, {x: 3, y: 5}]);
  }
}
