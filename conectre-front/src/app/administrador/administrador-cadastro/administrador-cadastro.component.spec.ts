import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCadastroComponent } from './administrador-cadastro.component';

describe('AdministradorCadastroComponent', () => {
  let component: AdministradorCadastroComponent;
  let fixture: ComponentFixture<AdministradorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorCadastroComponent]
    });
    fixture = TestBed.createComponent(AdministradorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
