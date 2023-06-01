import { TestBed } from '@angular/core/testing';

import { BookadminserviceService } from './bookadminservice.service';

describe('BookadminserviceService', () => {
  let service: BookadminserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookadminserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
