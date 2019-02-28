import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  private _score: Score;

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.score().subscribe(score => this._score = score);
  }

}
