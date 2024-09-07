import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.userService.getUser(action.userId).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      mergeMap((action) =>
        this.userService.updateUserProfile(action.userId, action.user).pipe(
          map((user) => UserActions.actionUserSuccess({ message: 'Perfil actualizado exitosamente.' })),
          catchError((error) => of(UserActions.actionUserFailure({ error: error.error.message || 'Error al actualizar el perfil.' })))
        )
      )
    )
  );

  resetBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.resetBalance),
      mergeMap((action) =>
        this.userService.resetBalance(action.userId).pipe(
          map((user) => UserActions.actionUserSuccess({ message: 'Saldo restablecido exitosamente.' })),
          catchError((error) => of(UserActions.actionUserFailure({ error: error.error.message || 'Error al restablecer el saldo.' })))
        )
      )
    )
  );
}
