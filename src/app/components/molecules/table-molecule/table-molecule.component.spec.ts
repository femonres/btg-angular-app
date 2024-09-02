import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMoleculeComponent } from './table-molecule.component';

describe('TableMoleculeComponent', () => {
  let component: TableMoleculeComponent;
  let fixture: ComponentFixture<TableMoleculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMoleculeComponent]
    });
    fixture = TestBed.createComponent(TableMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
