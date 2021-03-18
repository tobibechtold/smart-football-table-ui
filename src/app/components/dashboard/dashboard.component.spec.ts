import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DashboardComponent } from './dashboard.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { ScoreComponent } from '../score/score.component';
import { VelocityComponent } from '../velocity/velocity.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from '../../../environments/environment';
import { ScoreService } from '../../services/score.service';
import { GameStateService } from '../../services/game-state.service';
import { of } from 'rxjs';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import { NgxGaugeModule } from 'ngx-gauge';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let scoreService;
  let matSnackBar;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqttHost,
    port: environment.mqttPort,
  };

  beforeEach(async(() => {
    matSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    scoreService = jasmine.createSpyObj('ScoreService', ['teamScored', 'score']);
    scoreService.teamScored.and.returnValue(of('1'));
    scoreService.score.and.returnValue(of(1));
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeatmapComponent, ScoreComponent, VelocityComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatSnackBarModule,
        NgxGaugeModule,
        MatIconModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
      ],
      providers: [
        {provide: ScoreService, useValue: scoreService},
        {provide: MatSnackBar, useValue: matSnackBar},
        GameStateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show snackbar when team 1 scores', () => {
    expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(SnackBarMessageComponent,
      {duration: 5000, data: 'GOOOOAL! Score is now 0 - 1'});
  });
});
