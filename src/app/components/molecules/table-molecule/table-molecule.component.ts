import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-molecule',
  templateUrl: './table-molecule.component.html',
  styleUrls: ['./table-molecule.component.sass']
})
export class TableMoleculeComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() buttons?: TableButton[] = [];

  get displayedColumns(): string[] {
    return this.buttons ? [...this.columns, 'actions'] : this.columns;
  }

  onButtonClick(action: string, element: any) {
    console.log('onButtonClick', action, element);
    // Lógica para manejar el clic del botón
    //this.actionClicked.emit({ action, element });
  }
}

interface TableButton {
  label?: string;
  icon?: string; // Font Awesome icon class
  color?: string;
  tooltip?: string;
  action: string; // Action identifier
}