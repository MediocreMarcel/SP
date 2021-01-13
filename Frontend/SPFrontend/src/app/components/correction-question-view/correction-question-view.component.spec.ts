import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionQuestionViewComponent } from './correction-question-view.component';

describe('CorrectionQuestionViewComponent', () => {
  let component: CorrectionQuestionViewComponent;
  let fixture: ComponentFixture<CorrectionQuestionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionQuestionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionQuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
