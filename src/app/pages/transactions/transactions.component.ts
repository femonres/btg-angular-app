import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '../../models/transaction';
import { selectTransactions } from '../../store/transaction/transaction.selector';
import { loadTransactions } from 'src/app/store/transaction/transaction.actions';
import { ColumnConfig } from 'src/app/components/molecules/table-molecule/table-molecule.component';
import { User } from 'src/app/models/user';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent {
  currentUser!: User;
  transactions: Transaction[] = [];

  constructor(private store: Store) {
    this.store.select(selectUser).subscribe(user => {
      if (user) this.store.dispatch(loadTransactions({userId: user.id}));
      return this.currentUser = user!;
    });
    this.store.select(selectTransactions).subscribe(transactions => this.transactions = transactions);
  }

  get displayedColumns(): Map<string, ColumnConfig> {
    return new Map<string, ColumnConfig>([
      ['transactionType', {displayName: 'Tipo de acción'}],
      ['fundName', {displayName: 'Nombre del fondo'}],
      ['amount', {displayName: 'Monto invertido', pipe: 'currency'}],
      ['timestamp', {displayName: 'Fecha', pipe: 'date'}],
    ]);
  }
}
