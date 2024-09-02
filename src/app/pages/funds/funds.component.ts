import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Fund } from '../../models/fund';
import {
  loadFunds,
  subscribeToFund,
  unsubscribeFromFund,
} from '../../store/fund/fund.actions';
import { selectFunds } from '../../store/fund/fund.selector';
import { MatDialog } from '@angular/material/dialog';
import { ModalMoleculeComponent } from 'src/app/components/molecules/modal-molecule/modal-molecule.component';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.sass'],
})
export class FundsComponent implements OnInit {
  funds$!: Observable<Fund[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.funds$ = this.store.select(selectFunds);
  }

  ngOnInit(): void {
    this.store.dispatch(loadFunds());
  }

  get displayedColumns(): string[] {
    return ['name', 'category', 'minAmount', 'actions'];
  }

  onAction(event: { action: string; element: Fund }): void {
    const fund = event.element;

    if (event.action === 'subscribe') {
      this.dialog.open(ModalMoleculeComponent, {
        data: { fundName: fund.name, minAmount: fund.minAmount },
      });
    } else if (event.action === 'unsubscribe') {
      // Lógica para cancelar la suscripción
    }
  } 

  onSubscribe(fund: Fund): void {
    const dialogRef = this.dialog.open(ModalMoleculeComponent, {
      width: '300px',
      data: { fundName: fund.name, minAmount: fund.minAmount },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          subscribeToFund({ fundId: fund.id, amount: result.amount })
        );
      }
    });
  }

  onUnsubscribe(fund: Fund): void {
    console.log('onUnsubscribe', fund);
    if (window.confirm("Está seguro de que desea cancelar la suscripcion con el fondo " + fund.name)) {
      this.store.dispatch(unsubscribeFromFund({ fundId: fund.id }));
      // Cargaar balance del usuario
    }
  }

  get actionButtons() {
    return [
      {
        icon: 'add',
        color: 'primary',
        tooltip: 'Suscribirse al fondo',
        action: 'subscribe',
      },
      {
        icon: 'remove',
        color: 'warn',
        tooltip: 'Cancelar la suscripción',
        action: 'unsubscribe',
      },
    ];
  }
}
