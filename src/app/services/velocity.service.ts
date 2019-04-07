import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { Velocity } from '../models/velocity';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VelocityService {

  constructor(private mqttService: MqttService) { }

  velocity(): Observable<Velocity> {
    return this.mqttService.observe('ball/velocity').pipe(switchMap(message => {
      const velocity: Velocity = JSON.parse(message.payload.toString());
      const roundedVelocity = Math.round(velocity.velocity);
      return of({velocity: roundedVelocity});
    }));
  }

  mockVelocityFromMqtt(velocity: Velocity): Observable<void> {
    return this.mqttService.publish('ball/velocity', JSON.stringify(velocity));
  }
}
