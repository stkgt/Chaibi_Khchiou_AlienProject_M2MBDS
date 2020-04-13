import { TestBed } from '@angular/core/testing';

import { CasService } from './cas.service';

describe('CasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasService = TestBed.get(CasService);
    expect(service).toBeTruthy();
  });
});
