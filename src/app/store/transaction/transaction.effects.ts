import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FundService } from 'src/app/services/fund/fund.service';
import * as TransactionActions from './transaction.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TransactionEffects {
  constructor(private actions$: Actions, private fundService: FundService) {}

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(() =>
        this.fundService
          .getTransactionHistory(1) // Obtener el id de usuario del store
          .pipe(
            map((transactions) =>
              TransactionActions.loadTransactionsSuccess({ transactions })
            ),
            catchError((error) =>
              of(TransactionActions.loadTransactionsFailure({ error }))
            )
          )
      )
    )
  );
}
