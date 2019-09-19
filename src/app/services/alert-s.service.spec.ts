import { TestBed } from '@angular/core/testing';

import { AlertSService } from './alert-s.service';

describe('AlertSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertSService = TestBed.get(AlertSService);
    expect(service).toBeTruthy();
  });
});
