import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRecaudoTransferenciaComponent } from './frm-recaudo-transferencia.component';

describe('FrmRecaudoTransferenciaComponent', () => {
  let component: FrmRecaudoTransferenciaComponent;
  let fixture: ComponentFixture<FrmRecaudoTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmRecaudoTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmRecaudoTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
