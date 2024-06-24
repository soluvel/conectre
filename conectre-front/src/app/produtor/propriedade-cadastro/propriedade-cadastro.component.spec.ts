import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeCadastroComponent } from './propriedade-cadastro.component';

describe('TecnicoCadastroComponent', () => {
  let component: PropriedadeCadastroComponent;
  let fixture: ComponentFixture<PropriedadeCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropriedadeCadastroComponent]
    });
    fixture = TestBed.createComponent(PropriedadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
