import { TestBed } from '@angular/core/testing';

import { CreateOverviewExamService } from './create-overview-exam.service';

describe('CreateOverviewExamService', () => {
  let service: CreateOverviewExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOverviewExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
