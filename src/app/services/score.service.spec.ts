import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';
import { environment } from '../../environments/environment';

describe('ScoreService', () => {
  let service: ScoreService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [MqttService]
    });
    service = TestBed.get(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct score from mqtt broker', (done) => {
    service.score().subscribe(score => {
      expect(score).toEqual({score: [1, 0]});
      done();
    });

    service.mockScoreFromMqtt({score: [1, 0]}).subscribe(() => {});
  });
});

