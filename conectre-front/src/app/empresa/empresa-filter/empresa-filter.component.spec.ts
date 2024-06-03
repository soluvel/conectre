import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFilterComponent } from './empresa-filter.component';

describe('EmpresaFilterComponent', () => {
  let component: EmpresaFilterComponent;
  let fixture: ComponentFixture<EmpresaFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaFilterComponent]
    });
    fixture = TestBed.createComponent(EmpresaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
