import { Component, OnInit } from '@angular/core';
import { HeatmapService } from '../../services/heatmap.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  constructor(private heatmapService: HeatmapService) { }

  ngOnInit() {
  }

}
