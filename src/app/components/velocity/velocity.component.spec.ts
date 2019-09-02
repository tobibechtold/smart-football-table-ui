import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { VelocityComponent } from './velocity.component';
import { VelocityService } from '../../services/velocity.service';
import { MatIconModule } from '@angular/material';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { of } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';
import { environment } from '../../../environments/environment';
import { By } from '@angular/platform-browser';

describe('VelocityComponent', () => {
  let component: VelocityComponent;
  let fixture: ComponentFixture<VelocityComponent>;
  let velocityService;
  let gameStateService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(async(() => {
    velocityService = jasmine.createSpyObj('VelocityService', ['velocity']);
    velocityService.velocity.and.returnValue(of({velocity: 46}));
    gameStateService = jasmine.createSpyObj('GameStateService', ['gameStart', 'gameOver']);
    gameStateService.gameStart.and.returnValue(of({}));
    TestBed.configureTestingModule({
      declarations: [ VelocityComponent ],
      imports: [MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
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

  it('should display fixed velocity from service', fakeAsync(() => {
    jasmine.clock().tick(1000 + 1);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const velocity = fixture.debugElement.query(By.css('.velocity-value'));
      expect(velocity.nativeElement.textContent.trim()).toBe('46');
    });
  }));
});
