import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule,
  MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule, MatMenuModule
} from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { ScoreComponent } from './components/score/score.component';
import { VelocityComponent } from './components/velocity/velocity.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeatmapComponent,
    ScoreComponent,
    VelocityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
