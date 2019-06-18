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
    return this.mqttService.observe('ball/position/rel').pipe(switchMap(message => {
      const payload = message.payload.toString();
      const values = payload.split(',');
      const roundedXValue = this.roundToTwoFractionDigits(Number(values[0]));
      const roundedYValue = this.roundToTwoFractionDigits(Number(values[1]));
      return of({x: roundedXValue, y: roundedYValue});
    }));
  }

  mockHeatmapDataFromMqtt(position: Position): Observable<void> {
    return this.mqttService.publish('ball/position/rel', position.x.toString() + ',' + position.y.toString());
  }

  private roundToTwoFractionDigits(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
