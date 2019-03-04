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

  constructor(private heatmapService: HeatmapService) { }

  ngAfterViewInit() {
    const heatMapInstance = heatmap.create({
      container: this.heatmapDiv.nativeElement,
    }).setData({data: [
        {x: 3, y: 5, value: 5},
        {x: 7, y: 9, value: 27},
        {x: 5, y: 13, value: 55},
        {x: 34, y: 6, value: 23},
        {x: 45, y: 6, value: 14},
        {x: 89, y: 4, value: 35},
        {x: 89, y: 4, value: 100},
        {x: 89, y: 90, value: 100},
        {x: 650, y: 200, value: 30},
        {x: 689, y: 90, value: 100},
        {x: 489, y: 90, value: 100},
      ], min: 0, max: 100});
  }
}
