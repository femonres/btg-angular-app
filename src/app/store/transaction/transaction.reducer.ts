import { createReducer, on } from '@ngrx/store';
import { TransactionState } from '../app.state';
import { loadTransactions, loadTransactionsFailure, loadTransactionsSuccess } from './transaction.actions';

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = createReducer(
  initialState,
  on(loadTransactions, state => ({ ...state, loading: true })),
  on(loadTransactionsSuccess, (state, { transactions }) => ({ ...state, loading: false, transactions })),
  on(loadTransactionsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
