import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoricoLoteComponent } from './table-historico-lote.component';

describe('TableHistoricoLoteComponent', () => {
  let component: TableHistoricoLoteComponent;
  let fixture: ComponentFixture<TableHistoricoLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHistoricoLoteComponent]
    });
    fixture = TestBed.createComponent(TableHistoricoLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
