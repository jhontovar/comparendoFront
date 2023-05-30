import { TestBed } from '@angular/core/testing';

import { RecaudoTransferenciaService } from './recaudo-transferencia.service';

describe('RecaudoTransferenciaService', () => {
  let service: RecaudoTransferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaudoTransferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
