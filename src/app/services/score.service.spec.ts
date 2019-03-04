import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';

describe('ScoreService', () => {
  let service: ScoreService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'localhost',
    port: 9001,
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
    service.score().subscribe(message => {
      expect(JSON.parse(message.payload.toString())).toEqual({scoreLeft: 1, scoreRight: 0});
      done();
    });

    service.mockScoreFromMqtt({scoreLeft: 1, scoreRight: 0}).subscribe(() => {});
  });
});

