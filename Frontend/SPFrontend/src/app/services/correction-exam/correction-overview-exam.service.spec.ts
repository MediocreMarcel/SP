import { TestBed } from '@angular/core/testing';

import { CorrectionOverviewExamService } from './correction-overview-exam.service';

describe('CorrectionOverviewExamService', () => {
  let service: CorrectionOverviewExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectionOverviewExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
