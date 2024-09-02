import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";
import { Transaction } from "../../models/transaction";

export const loadUser = createAction('[User] Load User', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const updateUserProfile = createAction('[User] Update Profile', props<{ user: User }>());
export const updateUserProfileSuccess = createAction('[User] Update Profile Success', props<{ user: User }>());
export const updateUserProfileFailure = createAction('[User] Update Profile Failure', props<{ error: any }>());

export const resetBalance = createAction('[User] Reset Balance', props<{ userId: number }>());
export const resetBalanceSuccess = createAction('[User] Reset Balance Success', props<{ user: User }>());
export const resetBalanceFailure = createAction('[User] Reset Balance Failure', props<{ error: any }>());

export const unsubscribeFromFund = createAction('[Funds] Unsubscribe From Fund', props<{ fundId: number }>());
export const unsubscribeFromFundSuccess = createAction('[Funds] Unsubscribe From Fund Success', props<{ transaction: Transaction }>());
export const unsubscribeFromFundFailure = createAction('[Funds] Unsubscribe From Fund Failure', props<{ error: any }>());
