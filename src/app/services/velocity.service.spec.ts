import { TestBed } from '@angular/core/testing';

import { VelocityService } from './velocity.service';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';
import { environment } from '../../environments/environment';

describe('VelocityService', () => {
  let service: VelocityService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [MqttService]
    });
    service = TestBed.get(VelocityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct velocity from mqtt broker', (done) => {
    service.velocity().subscribe(velocity => {
      expect(velocity).toEqual({velocity: 43});
      done();
    });

    service.mockVelocityFromMqtt({velocity: 43.3}).subscribe(() => {});
  });
});
