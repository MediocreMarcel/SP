import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAppComponent } from './dummy-app.component';

describe('DummyAppComponent', () => {
  let component: DummyAppComponent;
  let fixture: ComponentFixture<DummyAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
