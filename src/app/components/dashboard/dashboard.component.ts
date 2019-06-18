import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { MatSnackBar } from '@angular/material';
import { GameStateService } from '../../services/game-state.service';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import { Score } from '../../models/score';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  _score: Score = {score: [0, 0]};

  constructor(private scoreService: ScoreService,
              private gameStateService: GameStateService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.scoreService.score(0).subscribe(score => {
      this._score.score[0] = score;
      this.showScoreToast();
    });

    this.scoreService.score(1).subscribe(score => {
      this._score.score[1] = score;
      this.showScoreToast();
    });

    this.gameStateService.gameOver().subscribe(winner => {
      let message: string;

      if (winner.winners.length > 1) {
        message = 'Its a draw';
      } else {
        message = 'Team ' + winner.winners[0] + ' won the game';
      }
      this.showToast(message, 15000);
    });
  }

  private showScoreToast() {
    if (!this.isZeroZero(this._score)) {
      this.showToast('GOOOOAL! Score is now' + ' ' + this._score.score[0] + ' - ' + this._score.score[1], 5000);
    }
  }

  private showToast(message: string, duration: number): void {
    this.snackBar.openFromComponent(
      SnackBarMessageComponent,
      {duration: duration, data: message}
    );
  }

  private isZeroZero(score: Score): boolean {
    return (score.score[0] === 0) && (score.score[1] === 0);
  }
}
