import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { ScoreComponent } from './components/score/score.component';
import { VelocityComponent } from './components/velocity/velocity.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from '../environments/environment';
import { SnackBarMessageComponent } from './components/snack-bar-message/snack-bar-message.component';
import { NgxGaugeModule } from 'ngx-gauge';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqttHost,
  port: environment.mqttPort,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeatmapComponent,
    ScoreComponent,
    VelocityComponent,
    SnackBarMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxGaugeModule,
    MatIconModule,
    LayoutModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  entryComponents: [SnackBarMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
