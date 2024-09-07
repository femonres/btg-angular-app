import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Fund } from '../../models/fund';
import {
  actionToFundFailure,
  actionToFundSuccess,
  loadFunds,
  subscribeToFund,
  unsubscribeFromFund,
} from '../../store/fund/fund.actions';
import { selectFunds } from '../../store/fund/fund.selector';
import { MatDialog } from '@angular/material/dialog';
import { ModalMoleculeComponent } from 'src/app/components/molecules/modal-molecule/modal-molecule.component';
import { ColumnConfig } from 'src/app/components/molecules/table-molecule/table-molecule.component';
import { User } from 'src/app/models/user';
import { selectUser } from 'src/app/store/user/user.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { loadUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.sass'],
})
export class FundsComponent implements OnInit {
  currentUser!: User;
  funds: Fund[] = [];

  constructor(private store: Store, private dialog: MatDialog, private snackBar: MatSnackBar, private actionsSubject: ActionsSubject) {
    this.store.select(selectUser).subscribe(user => this.currentUser = user!);
    this.store.select(selectFunds).subscribe(funds => this.funds = funds);
  }

  ngOnInit(): void {
    this.store.dispatch(loadFunds());

    // Escuchar las acciones de éxito
    this.actionsSubject.pipe(
      filter((action) => action.type === actionToFundSuccess.type)
    ).subscribe((action: any) => {
      this.snackBar.open(action.message, 'Cerrar', { duration: 5000, panelClass: 'success-snackbar', horizontalPosition: 'end', verticalPosition: 'bottom' });
      this.store.dispatch(loadUser({userId: this.currentUser.id}));
    });

    // Escuchar las acciones de error
    this.actionsSubject.pipe(
      filter((action) => action.type === actionToFundFailure.type)
    ).subscribe((action: any) => {
      this.snackBar.open(action.error, 'Cerrar', { duration: 5000, panelClass: 'error-snackbar', horizontalPosition: 'end', verticalPosition: 'bottom' });
    });
  }

  get displayedColumns(): Map<string, ColumnConfig> {
    return new Map<string, ColumnConfig>([
      ['name', { displayName:'Nombre del fondo' }],
      ['category', { displayName: 'Categoría' }],
      ['minAmount', { displayName: 'Monto mínimo de inversion', pipe: 'currency' }]
    ]);
  }

  get actionButtons() {
    return [
      { id: 1, icon: 'add', action: 'subscribe', tooltip: 'Suscribirse al fondo' },
      { id: 2, icon: 'remove', color: 'warn', action: 'unsubscribe', tooltip: 'Cancelar la suscripción' },
    ];
  }

  onAction(event: { action: string; element: Fund }): void {
    if (event.action === 'subscribe') {
      this.onSubscribe(event.element);
    } else if (event.action === 'unsubscribe') {
      this.onUnsubscribe(event.element);
    }
  } 

  onSubscribe(fund: Fund): void {
    const dialogRef = this.dialog.open(ModalMoleculeComponent, {
      data: { fundName: fund.name, minAmount: fund.minAmount },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(subscribeToFund({ fundId: fund.id, userId: this.currentUser.id, amount: result.amount }));
      }
    });
  }

  onUnsubscribe(fund: Fund): void {
    if (window.confirm("Está seguro de que desea cancelar la suscripcion con el fondo " + fund.name)) {
      this.store.dispatch(unsubscribeFromFund({ fundId: fund.id, userId: this.currentUser.id }));
    }
  }
}
