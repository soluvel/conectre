import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteDetalhesComponent } from './lote-detalhes.component';

describe('LoteDetalhesComponent', () => {
  let component: LoteDetalhesComponent;
  let fixture: ComponentFixture<LoteDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoteDetalhesComponent]
    });
    fixture = TestBed.createComponent(LoteDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
