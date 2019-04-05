import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapComponent } from './heatmap.component';
import { HeatmapService } from '../../services/heatmap.service';
import { MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { of } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';

describe('HeatmapComponent', () => {
  let component: HeatmapComponent;
  let fixture: ComponentFixture<HeatmapComponent>;
  let heatmapService;
  let gameStateService;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'localhost',
    port: 9001,
  };

  beforeEach(async(() => {
    heatmapService = jasmine.createSpyObj('HeatmapService', ['heatmapData']);
    heatmapService.heatmapData.and.returnValue(of({x: 0, y: 0}));
    gameStateService = jasmine.createSpyObj('GameStateService', ['gameStart', 'gameOver']);
    gameStateService.gameStart.and.returnValue(of({}));
    gameStateService.gameOver.and.returnValue(of({winners: [0]}));
    TestBed.configureTestingModule({
      declarations: [ HeatmapComponent ],
      imports: [MatCardModule, MatMenuModule, MatIconModule, MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
      providers: [{provide: HeatmapService, useValue: heatmapService}, {provide: GameStateService, useValue: gameStateService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
