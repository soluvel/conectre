import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBiometriasComponent } from './tabs-biometrias.component';

describe('TabsBiometriasComponent', () => {
  let component: TabsBiometriasComponent;
  let fixture: ComponentFixture<TabsBiometriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsBiometriasComponent]
    });
    fixture = TestBed.createComponent(TabsBiometriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
