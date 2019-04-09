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

  constructor(private scoreService: ScoreService,
              private gameStateService: GameStateService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.scoreService.score().subscribe(score => {
      if (!this.isZeroZero(score)) {
        this.showToast('GOOOOAL! Score is now' + ' ' + score.score[0] + ' - ' + score.score[1], 5000);
      }
    });

    this.gameStateService.gameOver().subscribe(winner => {
      this.showToast('Team ' + winner.winners[0] + ' won the game', 15000);
    });
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
