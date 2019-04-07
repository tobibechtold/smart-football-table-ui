import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { MatSnackBar } from '@angular/material';
import { GameStateService } from '../../services/game-state.service';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

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
      this.snackBar.openFromComponent(
        SnackBarMessageComponent,
        {duration: 5000, data: 'GOOOOAL! Score is now ' + score.score[0] + ' - ' + score.score[1]}
        );
    });

    this.gameStateService.gameOver().subscribe(winner => {
      this.snackBar.openFromComponent(
        SnackBarMessageComponent,
        {duration: 15000, data: 'Team ' + winner.winners[0] + ' won the game'}
      );
    });
  }
}
