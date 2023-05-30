import { TestBed } from '@angular/core/testing';

import { ComparendoStateService } from './comparendo-state.service';

describe('ComparendoStateService', () => {
  let service: ComparendoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparendoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
