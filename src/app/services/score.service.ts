import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  score(): Observable<Score> {
    return of({scoreLeft: 5, scoreRight: 2});
  }
}
