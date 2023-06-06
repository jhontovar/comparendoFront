import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCaducidadesComponent } from './frm-caducidades.component';

describe('FrmCaducidadesComponent', () => {
  let component: FrmCaducidadesComponent;
  let fixture: ComponentFixture<FrmCaducidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCaducidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmCaducidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
