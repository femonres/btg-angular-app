import { createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  resetBalance,
  updateUserProfile,
} from './user.actions';
import { UserState } from '../app.state';

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, loading: false, currentUser: user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateUserProfile, (state, { user }) => ({ ...state, currentUser: { ...state.currentUser, ...user } })),
  //on(resetBalance, state => ({ ...state, currentUser: { ...state.currentUser, balance: 0 } }))

);