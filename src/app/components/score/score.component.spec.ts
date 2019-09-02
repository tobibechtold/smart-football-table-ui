import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreComponent } from './score.component';
import { ScoreService } from '../../services/score.service';
import { MatIconModule } from '@angular/material';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { By } from '@angular/platform-browser';

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
      imports: [MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
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
    const scoreLeft = fixture.debugElement.query(By.css('.score.left'));
    const scoreRight = fixture.debugElement.query(By.css('.score.right'));

    expect(scoreLeft.nativeElement.textContent.trim()).toBe('1');
    expect(scoreRight.nativeElement.textContent.trim()).toBe('1');
  });
});
