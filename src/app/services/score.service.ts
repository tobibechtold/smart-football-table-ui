import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { Score } from '../models/score';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private mqttService: MqttService) { }

  score(): Observable<Score> {
    return this.mqttService.observe('score').pipe(switchMap(message =>  {
      return of(JSON.parse(message.payload.toString()));
    }));
  }

  mockScoreFromMqtt(score: Score): Observable<void> {
    return this.mqttService.publish('score', JSON.stringify(score));
  }
}
