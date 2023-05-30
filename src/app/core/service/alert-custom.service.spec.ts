import { TestBed } from '@angular/core/testing';

import { AlertCustomService } from './alert-custom.service';

describe('AlertCustomService', () => {
  let service: AlertCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
