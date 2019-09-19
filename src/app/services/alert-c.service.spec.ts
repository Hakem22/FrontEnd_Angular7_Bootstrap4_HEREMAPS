import { TestBed } from '@angular/core/testing';

import { AlertCService } from './alert-c.service';

describe('AlertCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertCService = TestBed.get(AlertCService);
    expect(service).toBeTruthy();
  });
});
