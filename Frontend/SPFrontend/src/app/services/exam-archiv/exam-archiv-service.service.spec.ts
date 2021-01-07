import { TestBed } from '@angular/core/testing';

import { ExamArchiveServiceService } from './exam-archive-service.service';

describe('ExamArchivService', () => {
  let service: ExamArchiveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamArchiveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
