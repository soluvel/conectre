import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLoteComponent } from './table-lote.component';

describe('TableLoteComponent', () => {
  let component: TableLoteComponent;
  let fixture: ComponentFixture<TableLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLoteComponent]
    });
    fixture = TestBed.createComponent(TableLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
