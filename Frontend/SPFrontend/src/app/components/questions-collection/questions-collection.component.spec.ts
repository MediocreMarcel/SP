import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCollectionComponent } from './questions-collection.component';



describe('QuestionsCollectionComponent', () => {
  let component: QuestionsCollectionComponent;
  let fixture: ComponentFixture<QuestionsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
