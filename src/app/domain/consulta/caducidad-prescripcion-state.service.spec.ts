import { TestBed } from '@angular/core/testing';

import { CaducidadPrescripcionStateService } from './caducidad-prescripcion-state.service';

describe('CaducidadPrescripcionStateService', () => {
  let service: CaducidadPrescripcionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaducidadPrescripcionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
