import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HeatmapService } from '../../services/heatmap.service';
import * as heatmap from 'heatmap.js';

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

  constructor(private heatmapService: HeatmapService) {
    this.heatmapService.heatmapData().subscribe(position => {
      if (this.heatMapInstance) {
        this.heatMapInstance.addData({x: position.x, y: position.y, value: 1});
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
