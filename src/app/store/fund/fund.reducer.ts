import { createReducer, on } from '@ngrx/store';
import { FundsState } from '../app.state';
import { loadFunds, loadFundsSuccess, loadFundsFailure, subscribeToFund, unsubscribeFromFund } from './fund.actions';

const initialState: FundsState = {
  funds: [],
  selectedFundId: null,
  loading: false,
  error: null,
};

export const fundReducer = createReducer(
  initialState,
  on(loadFunds, state => ({ ...state, loading: true })),
  on(loadFundsSuccess, (state, { funds }) => ({ ...state, loading: false, funds })),
  on(loadFundsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
