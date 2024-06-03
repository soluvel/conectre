import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoCadastroComponent } from './tecnico-cadastro.component';

describe('TecnicoCadastroComponent', () => {
  let component: TecnicoCadastroComponent;
  let fixture: ComponentFixture<TecnicoCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoCadastroComponent]
    });
    fixture = TestBed.createComponent(TecnicoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
