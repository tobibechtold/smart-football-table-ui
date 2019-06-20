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
    service.score(0).subscribe(score => {
      expect(score).toEqual(1);
      done();
    });

    service.mockScoreFromMqtt(0, 1).subscribe(() => {});
  });

  it('should return correct score from mqtt broker for team 1', (done) => {
    service.score(1).subscribe(score => {
      expect(score).toEqual(0);
      done();
    });

    service.mockScoreFromMqtt(1, 0).subscribe(() => {});
  });

  it('should return correct teamId when team scored', (done) => {
    service.teamScored().subscribe(teamId => {
      expect(teamId).toEqual(1);
      done();
    });

    service.mockTeamScoredFromMqtt(1).subscribe(() => {});
  });
});

