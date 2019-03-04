import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';
import { IMqttClient, IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable, of } from 'rxjs';

describe('ScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MqttModule],
    providers: [{provide: MqttService, useValue: MockMqttService}]
  }));

  it('should be created', () => {
    const service: ScoreService = TestBed.get(ScoreService);
    expect(service).toBeTruthy();
  });
});

export class MockMqttService extends MqttService {
  observe(filterString: string): Observable<IMqttMessage> {
    return of({topic: '', payload: undefined, cmd: undefined, dup: false, retain: false, messageId: 0, qos: 0});
  }
}
