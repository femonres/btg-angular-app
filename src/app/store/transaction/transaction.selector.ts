import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransactionState } from "../app.state";

export const selectTransactionsState = createFeatureSelector<TransactionState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.transactions
);