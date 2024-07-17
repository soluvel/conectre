import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorHomeComponent } from './produtor-home.component';

describe('ProdutorHomeComponent', () => {
  let component: ProdutorHomeComponent;
  let fixture: ComponentFixture<ProdutorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutorHomeComponent]
    });
    fixture = TestBed.createComponent(ProdutorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
