import { createAction, props } from "@ngrx/store";
import { Fund } from "../../models/fund";
import { Transaction } from "../../models/transaction";

export const loadFunds = createAction('[Funds] Load Funds');
export const loadFundsSuccess = createAction('[Funds] Load Funds Success', props<{ funds: Fund[] }>());
export const loadFundsFailure = createAction('[Funds] Load Funds Failure', props<{ error: string }>());

export const subscribeToFund = createAction('[Funds] Subscribe To Fund', props<{ fundId: number, amount: number }>());
export const subscribeToFundSuccess = createAction('[Funds] Subscribe To Fund Success', props<{ transaction: Transaction }>());
export const subscribeToFundFailure = createAction('[Funds] Subscribe To Fund Failure', props<{ error: any }>());

export const unsubscribeFromFund = createAction('[Funds] Unsubscribe From Fund', props<{ fundId: number }>());
export const unsubscribeFromFundSuccess = createAction('[Funds] Unsubscribe From Fund Success', props<{ transaction: Transaction }>());
export const unsubscribeFromFundFailure = createAction('[Funds] Unsubscribe From Fund Failure', props<{ error: any }>());
