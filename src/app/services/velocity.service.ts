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
    return this.mqttService.observe('topic/velocity');
  }

  mockVelocityFromMqtt(velocity: Velocity): Observable<void> {
    return this.mqttService.publish('topic/velocity', JSON.stringify(velocity));
  }
}
