import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";
import { Transaction } from "../../models/transaction";

export const loadUser = createAction('[User] Load User', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const updateUserProfile = createAction('[User] Update Profile', props<{ userId: number, user: User }>());
export const resetBalance = createAction('[User] Reset Balance', props<{ userId: number }>());

export const actionUserSuccess = createAction('[User] Actions User Success', props<{ message: string }>());
export const actionUserFailure = createAction('[User] Actions User Failure', props<{ error: any }>());

//export const unsubscribeFromFund = createAction('[Funds] Unsubscribe From Fund', props<{ fundId: number }>());
//export const unsubscribeFromFundSuccess = createAction('[Funds] Unsubscribe From Fund Success', props<{ transaction: Transaction }>());
//export const unsubscribeFromFundFailure = createAction('[Funds] Unsubscribe From Fund Failure', props<{ error: any }>());
