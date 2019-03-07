import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Position } from '../models/position';
import { MqttService } from 'ngx-mqtt';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  constructor(private mqttService: MqttService) { }

  heatmapData(): Observable<Position> {
    return this.mqttService.observe('position').pipe(switchMap(message => {
      return of(JSON.parse(message.payload.toString()));
    }));
  }
}
