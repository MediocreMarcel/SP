import { TestBed } from '@angular/core/testing';

import { DummyAppService } from './dummy-app.service';

describe('DummyAppService', () => {
  let service: DummyAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
