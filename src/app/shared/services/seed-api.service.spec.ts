import { TestBed } from '@angular/core/testing';

import { SeedApiService } from './seed-api.service';

describe('SeedApiService', () => {
  let service: SeedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
