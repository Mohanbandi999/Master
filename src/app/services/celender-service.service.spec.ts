import { TestBed } from '@angular/core/testing';

import { CelenderServiceService } from './celender-service.service';

describe('CelenderServiceService', () => {
  let service: CelenderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelenderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
