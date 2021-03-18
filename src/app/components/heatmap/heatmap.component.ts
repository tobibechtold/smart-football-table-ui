import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeatmapService } from '../../services/heatmap.service';
import * as heatmap from 'heatmap.js';
import { GameStateService } from '../../services/game-state.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements AfterViewInit {

  @ViewChild('heatmapDiv', { static: true })
  private heatmapDiv: ElementRef;

  @Input()
  public height = 250;

  @Input()
  public width = 870;

  private heatMapInstance;

  constructor(private heatmapService: HeatmapService, private gameStateService: GameStateService) {
    this.heatmapService.heatmapData().subscribe(position => {
      if (this.heatMapInstance) {
        const xTranslated = position.x * this.heatmapDiv.nativeElement.offsetWidth;
        const yTranslated = position.y * this.heatmapDiv.nativeElement.offsetHeight;
        this.heatMapInstance.addData({x: xTranslated, y: yTranslated, value: 1});
      }
    });

    this.gameStateService.gameStart().subscribe(() => {
      if (this.heatMapInstance) {
        this.heatMapInstance.setData({max: environment.heatmapMaxData, min: environment.heatmapMinData, data: []});
      }
    });
  }

  ngAfterViewInit() {
    this.heatMapInstance = heatmap.create({
      container: this.heatmapDiv.nativeElement,
    });
    this.heatMapInstance.setDataMin(environment.heatmapMinData);
    this.heatMapInstance.setDataMax(environment.heatmapMaxData);
  }
}
