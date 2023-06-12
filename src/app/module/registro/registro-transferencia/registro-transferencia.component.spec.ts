import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTransferenciaComponent } from './registro-transferencia.component';

describe('RegistroTransferenciaComponent', () => {
  let component: RegistroTransferenciaComponent;
  let fixture: ComponentFixture<RegistroTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
