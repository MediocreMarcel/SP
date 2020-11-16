import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamOverviewComponent } from './create-exam-overview.component';

describe('CreateExamComponent', () => {
  let component: CreateExamOverviewComponent;
  let fixture: ComponentFixture<CreateExamOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExamOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
