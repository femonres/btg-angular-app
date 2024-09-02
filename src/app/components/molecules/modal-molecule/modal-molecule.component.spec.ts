import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMoleculeComponent } from './modal-molecule.component';

describe('ModalMoleculeComponent', () => {
  let component: ModalMoleculeComponent;
  let fixture: ComponentFixture<ModalMoleculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMoleculeComponent]
    });
    fixture = TestBed.createComponent(ModalMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
