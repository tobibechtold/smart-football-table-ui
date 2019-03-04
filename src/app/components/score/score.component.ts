import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  _score: Score = {score: [0, 0]};

  constructor(private scoreService: ScoreService) {
    scoreService.score().subscribe(score => {
      this._score = JSON.parse(score.payload.toString());
      console.log(score.payload.toString());
    }, error1 => console.log(error1));
  }
}
