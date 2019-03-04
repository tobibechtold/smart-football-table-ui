import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Velocity } from '../models/velocity';

@Injectable({
  providedIn: 'root'
})
export class VelocityService {

  constructor(private mqttService: MqttService) { }

  velocity(): Observable<IMqttMessage> {
    return this.mqttService.observe('velocity');
  }

  mockVelocityFromMqtt(velocity: Velocity): Observable<void> {
    return this.mqttService.publish('velocity', JSON.stringify(velocity));
  }
}
