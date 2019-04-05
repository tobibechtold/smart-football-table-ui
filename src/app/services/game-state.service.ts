import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Winner } from '../models/winner';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(private mqttService: MqttService) { }

  gameStart(): Observable<IMqttMessage> {
    return this.mqttService.observe('game/start');
  }

  gameOver(): Observable<Winner> {
    return this.mqttService.observe('game/gameover').pipe(switchMap(message => {
      return of(JSON.parse(message.payload.toString()));
    }));
  }

  mockGameStartFromMqtt(): Observable<void> {
    return this.mqttService.publish('game/start', '');
  }

  mockGameOverFromMqtt(winner: Winner): Observable<void> {
    return this.mqttService.publish('game/gameover', JSON.stringify(winner));
  }
}
