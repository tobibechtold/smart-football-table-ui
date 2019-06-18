import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreComponent } from './score.component';
import { ScoreService } from '../../services/score.service';
import { MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;
  let scoreService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(async(() => {
    scoreService = jasmine.createSpyObj('ScoreService', ['score']);
    scoreService.score.and.returnValue(of(1));
    TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [MatCardModule, MatMenuModule, MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [{provide: ScoreService, useValue: scoreService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fixed score', () => {
    const cardContent = fixture.nativeElement.querySelector('.dashboard-card-content');
    const score = cardContent.querySelector('h1').textContent;

    expect(score).toBe('1 - 1');
  });
});
