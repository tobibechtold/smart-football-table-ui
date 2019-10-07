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
      const payload = message.payload.toString().split(',');
      const winners: Array<number> = [];
      payload.forEach(winner => {
        winners.push(Number(winner));
      });
      return of({winners: winners});
    }));
  }

  resetGame(): Observable<void> {
    return this.mqttService.publish('game/reset', '');
  }

  mockGameStartFromMqtt(): Observable<void> {
    return this.mqttService.publish('game/start', '');
  }

  mockGameOverFromMqtt(winner: Winner): Observable<void> {
    const winnerString = winner.winners.join(',');
    return this.mqttService.publish('game/gameover', winnerString);
  }
}
