import { TestBed } from '@angular/core/testing';

import { CaducidadPrescripcionService } from './caducidad-prescripcion.service';

describe('CaducidadPrescripcionService', () => {
  let service: CaducidadPrescripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaducidadPrescripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
