import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarMessageComponent } from './snack-bar-message.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

describe('SnackBarMessageComponent', () => {
  let component: SnackBarMessageComponent;
  let fixture: ComponentFixture<SnackBarMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarMessageComponent ],
      imports: [MatSnackBarModule],
      providers: [
        {provide: MatSnackBarRef, useValue: {}},
        {provide: MAT_SNACK_BAR_DATA, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
