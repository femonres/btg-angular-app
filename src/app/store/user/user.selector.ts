import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../app.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser
);

export const selectUserBalance = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser?.balance
);

export const selectUserSubscriptions = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser?.subscriptions
);
