import { TestBed } from '@angular/core/testing';

import { QuestionsOverviewService } from './questions-overview-service.service';

describe('QuestionsOverviewService', () => {
  let service: QuestionsOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
