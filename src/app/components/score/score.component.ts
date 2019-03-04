import { Component } from '@angular/core';
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
      this._score = score;
      console.log(score);
    }, error1 => console.log(error1));
  }
}
