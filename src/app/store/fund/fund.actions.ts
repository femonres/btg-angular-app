import { createAction, props } from "@ngrx/store";
import { Fund } from "../../models/fund";
import { Transaction } from "../../models/transaction";

export const loadFunds = createAction('[Funds] Load Funds');
export const loadFundsSuccess = createAction('[Funds] Load Funds Success', props<{ funds: Fund[] }>());
export const loadFundsFailure = createAction('[Funds] Load Funds Failure', props<{ error: string }>());

export const subscribeToFund = createAction('[Funds] Subscribe To Fund', props<{ fundId: number, userId: number, amount: number }>());
export const unsubscribeFromFund = createAction('[Funds] Unsubscribe From Fund', props<{ fundId: number, userId: number }>());
export const actionToFundSuccess = createAction('[Funds] Action To Fund Success', props<{ message: string }>());
export const actionToFundFailure = createAction('[Funds] Action To Fund Failure', props<{ error: any }>());
