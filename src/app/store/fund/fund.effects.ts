import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FundService } from '../../services/fund/fund.service';
import * as FundsActions from './fund.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadUser } from '../user/user.actions';

@Injectable()
export class FundsEffects {

  constructor(
    private actions$: Actions,
    private fundService: FundService) {}

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
        this.fundService.subscribeToFund(action.fundId, action.userId, action.amount).pipe(
          map(transaction => {
            console.log('subscribeToFundSuccess = Transaction:', transaction);
            loadUser({ userId: action.userId });
            return FundsActions.actionToFundSuccess({ message: 'Se ha suscrito con exito al fondo.' });
          }),
          catchError(error => {
            console.error('Error al suscribirse al fondo:', error);
            return of(FundsActions.actionToFundFailure({ error: error.message || 'Error al suscribirse al fondo.' }));
          })
        )
      )
    )
  );

  unsubscribeFromFund$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FundsActions.unsubscribeFromFund),
      mergeMap(action =>
        this.fundService.unsubscribeFromFund(action.fundId, action.userId).pipe(
          map(transaction => {
            console.log('unsubscribeFromFundSuccess = Transaction:', transaction);
            return FundsActions.actionToFundSuccess({ message: 'Se ha cancelado la suscripción al fondo.' });
          }),
          catchError(error => {
            console.error('Error al cancelar la suscripción al fondo:', error.error.message);
            return of(FundsActions.actionToFundFailure({ error: error.error.message || 'Error al cancelar la suscripción al fondo.' }));
          })
        )
      )
    )
  );
}
