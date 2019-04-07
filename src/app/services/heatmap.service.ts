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
    return this.mqttService.observe('ball/position').pipe(switchMap(message => {
      const position = JSON.parse(message.payload.toString());
      const roundedXValue = this.roundToTwoFractionDigits(position.x);
      const roundedYValue = this.roundToTwoFractionDigits(position.y);
      return of({x: roundedXValue, y: roundedYValue});
    }));
  }

  mockHeatmapDataFromMqtt(position: Position): Observable<void> {
    return this.mqttService.publish('ball/position', JSON.stringify(position));
  }

  private roundToTwoFractionDigits(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
