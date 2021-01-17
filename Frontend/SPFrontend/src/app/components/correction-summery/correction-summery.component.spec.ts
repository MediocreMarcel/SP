import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionSummeryComponent } from './correction-summery.component';

describe('CorrectionSummeryComponent', () => {
  let component: CorrectionSummeryComponent;
  let fixture: ComponentFixture<CorrectionSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionSummeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
