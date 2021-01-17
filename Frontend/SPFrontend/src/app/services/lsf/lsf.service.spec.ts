import { TestBed } from '@angular/core/testing';

import { LsfService } from './lsf.service';

describe('LsfService', () => {
  let service: LsfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
