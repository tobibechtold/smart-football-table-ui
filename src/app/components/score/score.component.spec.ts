import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreComponent } from './score.component';
import { ScoreService } from '../../services/score.service';
import { MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [MatCardModule, MatMenuModule, MatIconModule],
      providers: [ScoreService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fixed score from service', () => {
    fixture.detectChanges();
    const cardContent = fixture.nativeElement.querySelector('.dashboard-card-content');
    const score = cardContent.querySelector('h1').textContent;

    expect(score).toBe('5 - 2');
  });
});
