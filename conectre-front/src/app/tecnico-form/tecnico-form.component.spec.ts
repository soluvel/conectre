import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoFormComponent } from './tecnico-form.component';

describe('TecnicoFormComponent', () => {
  let component: TecnicoFormComponent;
  let fixture: ComponentFixture<TecnicoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoFormComponent]
    });
    fixture = TestBed.createComponent(TecnicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
