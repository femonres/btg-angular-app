import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { selectTransactions } from '../../store/transaction/transaction.selector';
import { loadTransactions } from 'src/app/store/transaction/transaction.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(selectTransactions);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }

  get displayedColumns(): string[] {
    return ['fundName', 'transactionType', 'amount', 'timestamp'];
  }
}
