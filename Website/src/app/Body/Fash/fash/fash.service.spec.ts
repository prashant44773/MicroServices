import { TestBed } from '@angular/core/testing';

import { FashService } from './fash.service';

describe('FashService', () => {
  let service: FashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
