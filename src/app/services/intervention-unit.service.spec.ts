import { TestBed } from '@angular/core/testing';

import { InterventionUnitService } from './intervention-unit.service';

describe('InterventionUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterventionUnitService = TestBed.get(InterventionUnitService);
    expect(service).toBeTruthy();
  });
});
