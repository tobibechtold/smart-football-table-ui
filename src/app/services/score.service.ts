import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private mqttService: MqttService) { }

  score(teamId: number): Observable<number> {
    return this.mqttService.observe('team/score/' + teamId).pipe(switchMap(message =>  {
      return of(Number(message.payload.toString()));
    }));
  }

  mockScoreFromMqtt(teamId: number, score: number): Observable<void> {
    return this.mqttService.publish('team/score/' + teamId, score.toString());
  }
}
