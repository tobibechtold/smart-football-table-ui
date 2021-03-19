import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VelocityComponent } from './components/velocity/velocity.component';
import { ScoreComponent } from './components/score/score.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { NgxGaugeModule } from 'ngx-gauge';

describe('AppComponent', () => {
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'localhost',
    port: 9001,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        NgxGaugeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        LayoutModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        VelocityComponent,
        ScoreComponent,
        HeatmapComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
