import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorCadastroComponent } from './produtor-cadastro.component';

describe('TecnicoCadastroComponent', () => {
  let component: ProdutorCadastroComponent;
  let fixture: ComponentFixture<ProdutorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutorCadastroComponent]
    });
    fixture = TestBed.createComponent(ProdutorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
