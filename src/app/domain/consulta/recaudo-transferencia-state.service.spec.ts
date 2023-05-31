import { TestBed } from '@angular/core/testing';

import { RecaudoTransferenciaStateService } from './recaudo-transferencia-state.service';

describe('RecaudoTransferenciaStateService', () => {
  let service: RecaudoTransferenciaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaudoTransferenciaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
