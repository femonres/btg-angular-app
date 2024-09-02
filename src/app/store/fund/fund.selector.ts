import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FundsState } from '../app.state';

export const selectFundsState = createFeatureSelector<FundsState>('funds');

export const selectFunds = createSelector(
  selectFundsState,
  (state: FundsState) => state.funds
);

export const selectSelectedFundId = createSelector(
  selectFundsState,
  (state: FundsState) => state.selectedFundId
);

export const selectSelectedFund = createSelector(
  selectFundsState,
  selectSelectedFundId,
  (state: FundsState, selectedFundId) =>
    state.funds.find((fund) => fund.id === selectedFundId) || null
);
