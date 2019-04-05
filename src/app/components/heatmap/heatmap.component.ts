import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { HeatmapService } from '../../services/heatmap.service';
import * as heatmap from 'heatmap.js';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements AfterViewInit {

  @ViewChild('heatmapDiv')
  private heatmapDiv: any;

  @Input()
  public height = 250;

  @Input()
  public width = 870;

  private heatMapInstance;

  constructor(private heatmapService: HeatmapService, private gameStateService: GameStateService) {
    this.heatmapService.heatmapData().subscribe(position => {
      if (this.heatMapInstance) {
        const xTranslated = position.x * this.width;
        const yTranslated = position.y * this.height;
        this.heatMapInstance.addData({x: xTranslated, y: yTranslated, value: 1});
      }
    });

    this.gameStateService.gameStart().subscribe(() => {
      if (this.heatMapInstance) {
        this.heatMapInstance.setData({max: 10, min: 0, data: []});
      }
    });
  }

  ngAfterViewInit() {
    this.heatMapInstance = heatmap.create({
      container: this.heatmapDiv.nativeElement,
    });
    this.heatMapInstance.setDataMin(0);
    this.heatMapInstance.setDataMax(10);
  }
}
