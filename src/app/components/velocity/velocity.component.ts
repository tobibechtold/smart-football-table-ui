import { Component, OnInit } from '@angular/core';
import { VelocityService } from '../../services/velocity.service';

@Component({
  selector: 'app-velocity',
  templateUrl: './velocity.component.html',
  styleUrls: ['./velocity.component.scss']
})
export class VelocityComponent implements OnInit {
  _velocity: number;

  constructor(private velocityService: VelocityService) { }

  ngOnInit() {
    this.velocityService.velocity().subscribe(velocity => this._velocity = JSON.parse(velocity.payload.toString()));
  }

}
