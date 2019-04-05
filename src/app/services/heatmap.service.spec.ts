import { TestBed } from '@angular/core/testing';

import { HeatmapService } from './heatmap.service';
import { IMqttServiceOptions, MqttModule, MqttService } from 'ngx-mqtt';
import { environment } from '../../environments/environment';

describe('HeatmapService', () => {
  let service: HeatmapService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [MqttService]
    });
    service = TestBed.get(HeatmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct heatmap data from mqtt broker', (done) => {
    service.heatmapData().subscribe(position => {
      expect(position).toEqual({x: 0, y: 0});
      done();
    });

    service.mockHeatmapDataFromMqtt({x: 0, y: 0}).subscribe(() => {});
  });
});
