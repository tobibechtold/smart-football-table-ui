import { Component, OnInit } from '@angular/core';
import { VelocityService } from '../../services/velocity.service';
import { Velocity } from '../../models/velocity';
import { GameStateService } from '../../services/game-state.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-velocity',
  templateUrl: './velocity.component.html',
  styleUrls: ['./velocity.component.scss']
})
export class VelocityComponent implements OnInit {
  _velocity: Velocity = {velocity: 0};

  constructor(private velocityService: VelocityService, private gameStateService: GameStateService) { }

  ngOnInit() {
    this.gameStateService.gameStart().subscribe(message => this._velocity = {velocity: 0});

      this.velocityService.velocity().subscribe(velocity => {
          this._velocity = velocity;
      });
  }
}
