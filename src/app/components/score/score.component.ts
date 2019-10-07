import { Component } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  _score: Score = {score: [0, 0]};

  constructor(private scoreService: ScoreService, private gameStateService: GameStateService) {
    scoreService.score(0).subscribe(score => {
      this._score.score[0] = score;
    });

    scoreService.score(1).subscribe(score => {
      this._score.score[1] = score;
    });
  }

  resetGame(): void {
    this.gameStateService.resetGame().subscribe(() => {});
  }
}
