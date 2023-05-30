import { TestBed } from '@angular/core/testing';

import { ComparendoService } from './comparendo.service';

describe('ComparendoService', () => {
  let service: ComparendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
