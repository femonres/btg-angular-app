import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-molecule',
  templateUrl: './table-molecule.component.html',
  styleUrls: ['./table-molecule.component.sass']
})
export class TableMoleculeComponent implements OnInit {
  @Input() columns: Map<string, ColumnConfig> = new Map();
  @Input() data: any[] = [];
  @Input() buttonActions?: TableButton[] = [];
  
  @Output() actionClicked = new EventEmitter<{ action: string; element: any }>();
  
  columnKeys: string[] = [];
  displayedColumns: string[] = [];

  constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    this.columnKeys = Array.from(this.columns.keys());
    this.displayedColumns = this.buttonActions?.length ? [...this.columnKeys, 'actions'] : this.columnKeys;
  }

  onButtonClick(action: string, element: any) {
    this.actionClicked.emit({ action, element });
  }

  trackByIndex(i: number, obj: any) {
    return obj.id;
  }

  applyPipe(value: any, pipeType?: string): any {
    if (!pipeType) return value;

    switch (pipeType) {
      case 'currency':
        return this.currencyPipe.transform(value, 'USD', 'symbol', '1.0-0');
      case 'date':
        return this.datePipe.transform(value, 'short');
      default:
        return value;
    }
  }
}

export interface TableButton {
  label?: string;
  icon?: string; // Font Awesome icon class
  color?: string;
  tooltip?: string;
  action: string;
}

export interface ColumnConfig {
  displayName: string;
  pipe?: string; // Optional pipe to format the column value
}