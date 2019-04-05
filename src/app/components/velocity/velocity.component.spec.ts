import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocityComponent } from './velocity.component';
import { VelocityService } from '../../services/velocity.service';
import { MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { of } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';

describe('VelocityComponent', () => {
  let component: VelocityComponent;
  let fixture: ComponentFixture<VelocityComponent>;
  let velocityService;
  let gameStateService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'localhost',
    port: 9001,
  };

  beforeEach(async(() => {
    velocityService = jasmine.createSpyObj('VelocityService', ['velocity']);
    velocityService.velocity.and.returnValue(of({velocity: 46.3}));
    gameStateService = jasmine.createSpyObj('GameStateService', ['gameStart', 'gameOver']);
    gameStateService.gameStart.and.returnValue(of({}));
    TestBed.configureTestingModule({
      declarations: [ VelocityComponent ],
      imports: [MatCardModule, MatMenuModule, MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [{provide: VelocityService, useValue: velocityService}, {provide: GameStateService, useValue: gameStateService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fixed velocity from service', () => {
    const cardContent = fixture.nativeElement.querySelector('.dashboard-card-content');
    const velocity = cardContent.querySelector('h1').textContent;

    expect(velocity).toBe('46.3 km/h');
  });
});
