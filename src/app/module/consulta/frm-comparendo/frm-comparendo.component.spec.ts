import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmComparendoComponent } from './frm-comparendo.component';

describe('FrmComparendoComponent', () => {
  let component: FrmComparendoComponent;
  let fixture: ComponentFixture<FrmComparendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmComparendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmComparendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
