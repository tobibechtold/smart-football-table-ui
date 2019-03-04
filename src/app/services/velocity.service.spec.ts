import { TestBed } from '@angular/core/testing';

import { VelocityService } from './velocity.service';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';

describe('VelocityService', () => {
  let service: VelocityService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'localhost',
    port: 9001,
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
    service.velocity().subscribe(message => {
      expect(JSON.parse(message.payload.toString())).toEqual({velocity: 43.3});
      done();
    });

    service.mockVelocityFromMqtt({velocity: 43.3}).subscribe(() => {});
  });
});
