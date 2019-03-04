import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ScoreComponent } from './score.component';
import { ScoreService } from '../../services/score.service';
import { MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';
import { IMqttMessage, IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { Observable, of } from 'rxjs';
import { Score } from '../../models/score';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [MatCardModule, MatMenuModule, MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [ScoreService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display fixed score from service', fakeAsync(() => {
    const service = TestBed.get(ScoreService);

    service.mockScoreFromMqtt({scoreLeft: 1, scoreRight: 0});

    const cardContent = fixture.nativeElement.querySelector('.dashboard-card-content');
    const score = cardContent.querySelector('h1').textContent;

    expect(score).toBe('1 - 0');
  }));
});

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
};
