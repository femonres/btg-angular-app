import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FundService } from '../../services/fund/fund.service';
import * as FundsActions from './fund.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FundsEffects {

  constructor(
    private actions$: Actions,
    private fundService: FundService
  ) {}

  loadFunds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FundsActions.loadFunds),
      mergeMap(() =>
        this.fundService.getFunds().pipe(
          map(funds => FundsActions.loadFundsSuccess({ funds })),
          catchError(error => of(FundsActions.loadFundsFailure({ error })))
        )
      )
    )
  );

  subscribeToFund$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FundsActions.subscribeToFund),
      mergeMap(action =>
        this.fundService.subscribeToFund(action.fundId, action.amount).pipe(
          map(transaction => FundsActions.subscribeToFundSuccess({ transaction })),
          catchError(error => of(FundsActions.subscribeToFundFailure({ error })))
        )
      )
    )
  );

  unsubscribeFromFund$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FundsActions.unsubscribeFromFund),
      mergeMap(action =>
        this.fundService.unsubscribeFromFund(action.fundId).pipe(
          map(transaction => FundsActions.unsubscribeFromFundSuccess({ transaction })),
          catchError(error => of(FundsActions.unsubscribeFromFundFailure({ error })))
        )
      )
    )
  );
}
