import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionOverviewComponent } from './correction-overview.component';

describe('CorrectionOverviewComponent', () => {
  let component: CorrectionOverviewComponent;
  let fixture: ComponentFixture<CorrectionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
