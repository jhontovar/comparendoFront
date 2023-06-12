import { TestBed } from '@angular/core/testing';

import { RegistroTransferenciasService } from './registro-transferencias.service';

describe('RegistroTransferenciasService', () => {
  let service: RegistroTransferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTransferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
