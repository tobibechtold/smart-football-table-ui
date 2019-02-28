import { TestBed } from '@angular/core/testing';

import { VelocityService } from './velocity.service';

describe('VelocityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VelocityService = TestBed.get(VelocityService);
    expect(service).toBeTruthy();
  });
});
